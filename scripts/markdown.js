import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs'
import { join, parse, relative, sep } from 'path'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import chokidar from 'chokidar'
import 'dotenv/config'

/**
 * This file is used to generate `posts.json`, `tags.json`, and `slugs.json`.
 * It reads markdown files in `process.env.POSTS_PATH` and generates tree structure.
 * It also extracts tags and slugs from the files.
 *
 * Tip: Use `watch` argument to enable watch mode.
 */

// ======================
// == Type Definitions ==
// ======================

/**
 * @typedef {Object} Slug
 * @property {string} full
 * @property {string[]} arr
 */

/**
 * @typedef {Object} Post
 * @property {string} title
 * @property {string} description
 * @property {string | undefined} date
 * @property {string[] | undefined} tags
 * @property {Slug} slug
 * @property {{ title: string, slug: Slug }[]} relatedPosts
 */

/**
 * @typedef {Object} PostTree
 * @property {Post | undefined} post
 * @property {{ [key: string]: PostTree } | undefined} children
 */

// ===============
// == Variables ==
// ===============

/**
 * Root directory of markdown files
 * @type {string}
 */
if (process.env.POSTS_PATH == null) throw new Error("Environment variable 'POSTS_PATH' is not set.")
const postsDir = join(process.cwd(), process.env.POSTS_PATH)

/**
 * Directory to save results
 * @type {string}
 */
const results = join(process.cwd(), 'markdown')

/**
 * Post tree
 * @type {PostTree}
 * */
const postTree = { children: {} }

/**
 * Timeout ID for update
 * @type {number | null}
 */
let timeoutId = null

// ===========================================================

// Watch mode
if (process.argv.includes('watch')) {
  const watcher = chokidar.watch(join(postsDir, '**/*.md'), {
    persistent: true,
    followSymlinks: true,
  })

  watcher.on('add', onChange)
  watcher.on('change', onChange)
  watcher.on('unlink', onDelete)
}
// Normal mode
else {
  walkDir(postsDir, (path) => path.endsWith('.md') && processFile(path))
  update()
}

// ===========================================================

/**
 * On 'add' or 'change' event, process the file and schedule update.
 * @param path {string}
 */
function onChange(path) {
  processFile(path)
  scheduleUpdate()
}

/**
 * On 'unlink' event, delete the file from the tree and schedule update.
 * @param path {string}
 */
function onDelete(path) {
  const slug = pathToSlug(path)
  deleteByArr(postTree, slug)
  scheduleUpdate()
}

/**
 * Process file and update tree.
 * @param path {string}
 */
function processFile(path) {
  const file = loadFile(path)
  // extract frontmatter and slug
  matter(file, { strip: true })

  // do not process if title, description is not set yet
  if (!file.data.matter?.title || !file.data.matter?.description) return
  // do not process draft
  if (file.data.matter?.draft) return

  // set slug
  slug(file)

  insertTree(postTree, file)
}

/**
 * Walk through directory and call `callback` for each file.
 * @param dir {string}
 * @param callback {(path: string) => void}
 */
function walkDir(dir, callback) {
  const items = readdirSync(dir, { encoding: 'utf8', withFileTypes: true })
  items.forEach((item) => {
    const filePath = join(item.parentPath, item.name)
    if (item.isDirectory()) {
      walkDir(filePath, callback)
    } else if (item.isFile()) {
      callback(filePath)
    }
  })
}

/**
 * Schedule update.
 * If already scheduled, clear the timeout and set new timeout.
 */
function scheduleUpdate() {
  if (timeoutId != null) {
    clearTimeout(timeoutId)
  }
  timeoutId = setTimeout(update, 500)
}

/**
 * Update the tree and save results.
 */
function update() {
  // extracted slugs and tags
  const slugs = []
  const tags = new Set()

  visit(postTree, (post, tree) => {
    // unexpected behavior
    if (!tree.children) throw new Error("Given tree doesn't have children.")

    // clean up
    post.relatedPosts = []

    // extract related posts
    Object.values(tree.children).forEach((child) => {
      if (child.post) {
        const { title, slug } = child.post
        post.relatedPosts.push({ title, slug })
      }
    })

    // extract tags
    post.tags?.forEach((tag) => tags.add(tag))

    // extract slug array
    slugs.push(post.slug.arr)
  })

  // save results
  mkdirSync(results, { recursive: true })
  writeFileSync(join(results, 'slugs.json'), JSON.stringify(slugs, null, 2))
  writeFileSync(join(results, 'tags.json'), JSON.stringify(Array.from(tags), null, 2))
  writeFileSync(join(results, 'posts.json'), JSON.stringify(postTree, null, 2))
  timeoutId = null

  console.log(`updated:
    - 'markdown/slugs.json'
    - 'markdown/tags.json'
    - 'markdown/posts.json'`)
}

/**
 * Read file and convert it to VFile
 * @param {string} filePath
 * @returns {VFile}
 */
function loadFile(filePath) {
  const file = new VFile({ path: filePath })
  file.value = readFileSync(filePath, { flag: 'rs', encoding: 'utf8' })

  return file
}

/**
 * Convert file path to slug array
 * @param {string} path
 * @returns {string[]}
 */
function pathToSlug(path) {
  const parsed = parse(path)
  const relativePath = relative(postsDir, join(parsed.dir, parsed.name))
  return relativePath.split(sep).map(encodeURIComponent)
}

/**
 * Set slug array and joined slug to `file.data`.
 * Uses file path to generate slug.
 * File path will be encoded with `encodeURIComponent`.
 *
 * @param {VFile} file
 */
function slug(file) {
  if (!file.dirname || !file.stem) {
    throw new Error(`'dirname' or 'stem' doesn't exist. ('${file.path}')`)
  }

  const arr = pathToSlug(file.path)
  const full = arr.join('/')

  Object.assign(file.data, { slug: { full, arr } })
}

/**
 * Find tree node by slug array.
 * If it doesn't exist, creates node and return it.
 *
 * @param {PostTree} obj
 * @param {string[]} arr
 * @returns {PostTree}
 */
function findByArr(obj, arr) {
  if (arr.length === 0) throw new Error("'arr' is empty.")

  const key = arr[0]
  if (obj.children == null) obj.children = { [key]: {} }
  else if (obj.children[key] == null) obj.children[key] = {}

  if (arr.length === 1) {
    return obj.children[key]
  } else {
    return findByArr(obj.children[key], arr.slice(1))
  }
}

/**
 * Delete tree node by slug array.
 * If doesn't exist, do nothing.
 *
 * @param {PostTree} obj
 * @param {string[]} arr
 */
function deleteByArr(obj, arr) {
  if (arr.length === 0) return

  const key = arr[0]
  if (obj.children == null) return
  else if (obj.children[key] == null) return

  if (arr.length === 1) {
    delete obj.children[key].post
  } else {
    deleteByArr(obj.children[key], arr.slice(1))
  }
}

/**
 * Transform file and insert it into tree.
 * Slug must be set in `file.data`.
 *
 * @param {PostTree} tree
 * @param {VFile} file
 */
function insertTree(tree, file) {
  const { slug } = file.data
  if (!slug) throw new Error('Slug is not set.')

  const node = findByArr(tree, slug.arr)

  node.post = {
    title: file.data.matter?.title,
    description: file.data.matter?.description,
    slug: file.data.slug,
    date: file.data.matter?.date,
    tags: file.data.matter?.tags,
    relatedPosts: [],
  }

  return node
}

/**
 * Visit tree and call `callback` for each leaf node.
 *
 * @param {PostTree} tree
 * @param {(post: Post, parent: PostTree) => void} callback
 * @param {PostTree} parent
 */
function visit(tree, callback, parent = tree) {
  if (tree.post) {
    callback(tree.post, parent)
  }
  if (tree.children) {
    Object.values(tree.children).forEach((child) => visit(child, callback, tree))
  }
  // Unexpected behavior
  if (tree.post == null && tree.children == null) {
    throw new Error('Found empty node.')
  }
}
