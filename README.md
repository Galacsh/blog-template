> [!TIP]
> For more information, read posts:
>
> - **Demo #1 - GitHub Pages** (https://galacsh.github.io/blog-template/posts)
> - **Demo #2 - Vercel** (https://galacsh-blog-template.vercel.app/posts)

# What is this?

This is a **simple blog template** for personal blogs.
This template generates pages from markdown files and builds a **static site**.
So it can be hosted on any static site hosting service, such as Vercel, Netlify, GitHub Pages, etc.

> This template doesn't use [MDX](https://mdxjs.com/) or [@next/mdx](https://www.npmjs.com/package/@next/mdx) directly.
> Instead, it uses [Unified](https://unifiedjs.com/) to parse markdown files and convert them to React components.

Even though this template is built
with the [Next.js - App Router](https://nextjs.org/docs/getting-started/project-structure#app-routing-conventions),
each post (markdown file) doesn't need to follow app routing conventions.
Markdown files placed in `/posts` directory will be automatically converted to pages.
This means the template can also be used with Obsidian vaults with some tweaks.

Theme supports dark mode and responsive design, and is inspired by the [Next.js - Docs](https://nextjs.org/docs)
and the [VitePress - Guide](https://vitepress.dev/guide/what-is-vitepress).

---

# Main Features (Roadmap)

- [x] Static export
- [x] Landing page
- [x] [Dark mode support](https://galacsh.github.io/blog-template/features/dark-mode.md)
- [x] Responsive design
- [x] Markdown file processing
- [x] [Posts filtering](https://galacsh.github.io/blog-template/features/posts-filtering-sorting.md)
- [x] [Posts sorting](https://galacsh.github.io/blog-template/features/posts-filtering-sorting.md)
- [x] [Command Menu](https://galacsh.github.io/blog-template/features/command-menu.md)
- [x] [Copy link to clipboard button](https://galacsh.github.io/blog-template/features/copy-link-to-clipboard.md)
- [x] [Quick scroll button](https://galacsh.github.io/blog-templatefeatures/quick-scroll.md)
- [x] Related posts (Show posts in same directory)
- [x] On this page (Table of contents)
- [x] [Draft](https://galacsh.github.io/blog-templatefeatures/draft.md)
- [x] Error page
- [x] `sitemap.xml`
- [x] `robots.txt`

---

# Main Dependencies

- [Next.js 14](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Unified](https://unifiedjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

# Why didn't I use these?

## @next/mdx

I didn't want to follow app routing conventions for each post.

## next-mdx-remote

I wanted to have more control over the markdown parsing process.

For example:

- Caching the list of posts and their metadata
- Handle slug generation

## ContentLayer

By the time I started this project, it seemed like the project was not actively maintained and unstable.

> [Proposal to become a maintainer for Contentlayer #651](https://github.com/contentlayerdev/contentlayer/issues/651)
