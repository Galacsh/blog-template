---
title: Features - Copy Link to Clipboard Button
description: About 'Copy Link to Clipboard' feature.
date: 2024-06-10
tags:
  - features
  - copy-link-to-clipboard
draft: false
---

You can copy the link of post by clicking the bottom right "Copy" button.

![Bottom Right Buttons](assets/bottom-right-buttons.png)

---

# Development Note

- `navigator.clipboard` is not accessible if server URL is insecure.
    - (X) HTTP & not localhost: `http://for-example.com/...`
    - (O) localhost: `http://localhost:3000/...`
    - (O) HTTPS: `https://for-example.com/...`
