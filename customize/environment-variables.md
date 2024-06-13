---
title: "Customize - Environment Variables"
description: "How to set up environment variables for your blog."
date: 2024-06-11
tags:
  - environment-variables
draft: false
---

# For Development

For development, you can set up environment variables in the `.env.development.local` file.
See [available variables](#available-variables) to customize your blog.

Create a `.env.development.local` file in the root of the project and set up the environment variables.
Then, add the variables you want to override.

For example:

```bash
NEXT_PUBLIC_APP_NAME="My Blog"
```

> Don't forget to restart the development server after changing the environment variables.

---

# For Production

For production, you can set up environment variables in the `.env.production.local` file.
See [available variables](#available-variables) to customize your blog.

Create a `.env.production.local` file in the root of the project and set up the environment variables.
Then, add the variables you want to override.

For example:

```bash
# URL of the website (e.g. https://galacsh.github.io)
NEXT_PUBLIC_BASE_URL="https://example.github.io"
```

> Don't forget to rebuild the blog after changing the environment variables.

---

# Available Variables

These are all the environment variables you can use to customize your blog.

```bash
# Name of the website
NEXT_PUBLIC_APP_NAME="Galacsh's Blog Template"
# Short name of the website
NEXT_PUBLIC_APP_SHORT_NAME="Galacsh"
# Description of the website
NEXT_PUBLIC_APP_DESCRIPTION="A blog template for developers."
# URL of the website (e.g. https://galacsh.github.io)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
# Base path from the URL (e.g. /blog-template), leave empty if not needed
NEXT_PUBLIC_BASE_PATH=""
# Author name
NEXT_PUBLIC_AUTHOR="Galacsh"
# About the author
NEXT_PUBLIC_ABOUT="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
# Author contact information
NEXT_PUBLIC_CONTACT="galacsh.dev@gmail.com"
# Keywords to describe the author
NEXT_PUBLIC_KEYWORDS="Software Engineer"
# Author's GitHub link
NEXT_PUBLIC_GITHUB="https://github.com/Galacsh"
# Author's LinkedIn link
NEXT_PUBLIC_LINKEDIN="https://www.linkedin.com/in/galacsh/"
# Copyright range (e.g. 2023-2024 or 2024)
NEXT_PUBLIC_COPYRIGHT_RANGE="2024"
# Path from the root of the project
POSTS_PATH="posts"
```