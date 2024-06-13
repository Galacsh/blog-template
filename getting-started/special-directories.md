---
title: 02. Special Directories
description: Explains about /posts, /public/assets, and /markdown.
date: 2024-06-12
tags:
  - posts
  - assets
draft: false
---

There are three special directories in this blog template.

- `/posts`
- `/public/assets`
- `/markdown`

> They are all git ignored. For more information, [read this](/getting-started/why-ignore-these.md).

---

# /posts

Keep your markdown files here.

**Slug**  
File name without extension will be your post's slug.  
For example:

- `/posts/hello.md` → `<server>/posts/hello`
- `/posts/hello/world.md` → `<server>/posts/hello/world`

**Internal link to markdown file**  
You can skip either prefix (`/posts`), file extension (`.md`) or both.
Don't forget to add leading slash (`/`).

- e.g. `/posts/hello.md`:
    - `[Hello](/hello)`
    - `[Hello](/hello.md)`
    - `[Hello](/posts/hello)`
    - `[Hello](/posts/hello.md)`

---

# /public/assets

Keep your assets here.

**Internal link to assets**  
You must skip prefix (`/public`).

- e.g. `/public/assets/rocket.png`:
    - `![Rocket](assets/rocket.png)`
    - `![Rocket](/assets/rocket.png)`

---

# /markdown

This directory is not for you.
It is used for the blog template to generate the blog.

This directory contains:

- `posts.json`: List of posts and their metadata.
- `tags.json`: List of tags.
- `slugs.json`: List of slug lists.
