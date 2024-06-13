---
title: "05. Run, Build, and Deploy"
description: "How to run, build, and deploy your blog."
date: 2024-06-12
tags:
  - run
  - build
  - deploy
draft: false
---

# Run

To run your blog locally, you need to install dependencies first.

```bash
npm install
```

> `/posts` and `/public/assets` directories should be set up before running the blog.  
> [Read this](/getting-started/installation.md) to set up `/posts` and `/public/assets` directories.

Then, run the development server.

```bash
npm start

# or
npm run dev
```

Your blog will be available at [http://localhost:3000](http://localhost:3000).

---

# Build

To build your blog, run the following command.

```bash
npm run build
```

This command will generate a static site in the `out` directory.

> You'll need to create `.env.production.local` file to set up environment variables for production build.
> [Read this](/customization/environment-variables.md) to set up environment variables.

---

# Deploy

To deploy your blog, you can use any static site hosting service, such as Vercel, GitHub Pages, etc.

After setting up [environment variables](/customization/environment-variables.md), you can deploy your blog by running
the following commands.

- **GitHub Pages**
    - `npm run deploy`
    - or `npm run deploy:gh-pages`
    - Notice that this will deploy your blog to the `pages` branch.
- **Vercel**
    - `npm run deploy:vercel`