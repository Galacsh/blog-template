---
title: 03. Why Ignore /posts and /public/assets?
description: Explains why /posts and /public/assets are ignored by default.
date: 2024-06-12
tags:
  - posts
  - assets
draft: false
---

I wanted to keep my markdown files in a private repository because some of them were drafts, or my private notes.
So, I decided to make `/posts` and `/public/assets` git ignored by default.

By making those directories git ignored, it is now able to keep my Obsidian vault in a private repository and host my
blog with GitHub Pages.

If you want to include `/posts` and `/public/assets` in your repository, you can remove them from `.gitignore` file.

```diff
...

# Posts
- /posts
/markdown
- /public/assets
```

```bash
git add .gitignore
git commit -m "chore: use /posts and /public/assets"
```
