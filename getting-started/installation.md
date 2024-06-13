---
title: 01. Installation
description: Ways to install this blog template and manage content.
date: 2024-06-12
tags:
  - installation
  - repository
draft: false
---

There are several ways to manage your content.
In this post, I will introduce three ways to install this blog template and manage your content.

# In One Repository

Following approaches are for public repositories.

## Using Project Itself

First, fork and clone this repository.

Then, install dependencies.

```bash
npm install
```

Remove `/posts` directory and `/public/assets` directory from `.gitignore`.

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

Now, you can save your markdown files in `/posts` directory and save your images in `/public/assets` directory.

[Read this](/getting-started/run-build-deploy.md) to run, build, and deploy your blog.

## Using Orphan Branch

This approach is useful when you want to keep your content in a separate branch.

First, fork and clone this repository.

Then, install dependencies.

```bash
npm install
```

Create an orphan branch.

```bash
git checkout --orphan content

# Unstage all files
git rm --cached -r .

# Use .gitignore of this repository for convenience
git add .gitignore
git commit -m "initial commit"

# Remove all files except for .gitignore
git clean -fd

# Push
git push -u origin content
```

Come back to the main branch and add the orphan branch as a worktree.

```bash
git checkout main

# Add worktree as '/posts' of branch 'content'.
git worktree add posts content
```

Create symbolic link.

```bash
mkdir -p public
ln -s "<repository-path>/assets" "public/assets"
```

[Read this](/getting-started/run-build-deploy.md) to run, build, and deploy your blog.

---

# In Two Repositories (Submodule)

This approach uses two repositories: one for the blog template and the other for your content.
This is useful when you want to keep your content private in a private repository.

Assume you have a repository for your content: `https://github.com/<username>/private-repo.git`.

First, fork and clone this repository.

Then, install dependencies.

```bash
npm install
```

Remove `/posts` directory from `.gitignore`.

```diff
...

# Posts
- /posts
/markdown
/public/assets
```

```bash
git add .gitignore
git commit -m "chore: use /posts"
git push
```

Add your content repository as a submodule.

```bash
git submodule add https://github.com/<username>/private-repo.git posts 
```

Link your assets.

```bash
mkdir -p public
ln -s "$(pwd)/posts/assets" "public/assets"
```

[Read this](/getting-started/run-build-deploy.md) to run, build, and deploy your blog.
