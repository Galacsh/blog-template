import _posts from '@/markdown/posts.json'
import slugs from '@/markdown/slugs.json'

import { readFileSync } from 'fs'
import { join } from 'path'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { visit } from 'unist-util-visit'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import components from '@/components/markdown'

import type { JSX } from 'react'
import type { Node } from 'unist'
import type { Post, PostInfo, PostTree, OnThisPage } from '@/lib/types'

type RehypeNode = Node & {
  tagName?: string
  properties?: {
    id?: string
  }
  children?: RehypeNode[]
  value?: string
}

// ===========================================================

/*
 * See: https://github.com/remarkjs/react-markdown/blob/main/lib/index.js
 */

// ===========================================================

/**
 * Directory for markdown files
 */
if (process.env.POSTS_PATH == null) throw new Error("Environment variable 'POSTS_PATH' is not set.")
const postsDir = join(process.cwd(), process.env.POSTS_PATH)

/**
 * Processor for markdown files
 */
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeHighlight, { detect: true })
  .use(rehypeSlug)

const posts = _posts as unknown as PostTree

/**
 * Get all slugs.
 */
export function getSlugs() {
  return slugs
}

/**
 * Get post info by slug
 *
 * @param slug
 */
export function getInfo(slug: string[]) {
  const postInfo = find(posts, slug)
  if (!postInfo) throw new Error('Post not found.')

  return postInfo
}

/**
 * Get all posts
 */
export function getPosts() {
  return posts
}

/**
 * Get post by slug
 *
 * @param slug - The slug of the post.
 */
export function getPost(slug: string[]) {
  const postInfo = getInfo(slug)

  const file = getFile(slug)
  processFile(file)

  return transform(postInfo, file)
}

/**
 * Transform post info and file to post
 *
 * @param info
 * @param file
 */
function transform(info: PostInfo, file: VFile): Post {
  return {
    ...info,
    toc: file.data.toc as OnThisPage[],
    content: file.result as JSX.Element,
  }
}

/**
 * Find post by slug
 *
 * @param tree
 * @param slug
 */
function find(tree: PostTree, slug: string[]): PostInfo | undefined {
  let cur: PostTree = tree
  for (const s of slug) {
    if (cur == null || cur.children == null) return undefined
    cur = cur.children[s]
  }

  return cur.post
}

/**
 * Get file by slug
 *
 * @param slug
 */
function getFile(slug: string[]): VFile {
  const filePath = join(postsDir, ...slug.map(decodeURIComponent)) + '.md'
  const file = new VFile({ path: filePath })
  file.value = readFileSync(filePath, { flag: 'rs', encoding: 'utf8' })

  return file
}

/**
 * Process file:
 * - Remove frontmatter from raw content
 * - Extract table of contents
 * - Convert markdown to jsx
 *
 * @param file
 */
function processFile(file: VFile) {
  matter(file, { strip: true })

  const mdast = processor.parse(file)
  const hast = processor.runSync(mdast)

  file.data.toc = getToC(hast, { hide: 4 })

  file.result = toJsxRuntime(hast, {
    Fragment,
    components,
    ignoreInvalidStyle: true,
    // @ts-expect-error: types are not ready
    jsx,
    // @ts-expect-error: types are not ready
    jsxs,
    passKeys: true,
    passNode: true,
  })
}

/**
 * Get table of contents
 *
 * @param tree
 * @param hide - Hide lower than this depth
 */
function getToC(tree: Node, { hide }: { hide: number }) {
  function hideLower(toc: OnThisPage[], depth: number) {
    return toc.filter((t) => t.depth < depth)
  }

  function headings(node: RehypeNode) {
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    return node.tagName != null && tags.includes(node.tagName)
  }

  const toc: OnThisPage[] = []

  visit(tree, headings, (node: RehypeNode) => {
    toc.push({
      id: node.properties?.id as string,
      depth: Number(node.tagName?.charAt(1)),
      text: node.children?.map((c) => c.value).join(' ') || 'Empty heading',
    })
  })

  return hideLower(toc, hide)
}
