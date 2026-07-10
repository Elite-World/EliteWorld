---
name: pre-flight-performance-scrub
description: Performs an automated performance audit, scrubs large dependencies, inline CSS optimizations, animates properties using only transform/opacity, and optimizes third-party scripts.
---

# Skill: Pre-Flight Performance Scrub

Execute the following sequence on the current codebase:
1. Audit all `package.json` dependencies and flag any library larger than 50 KiB for removal or dynamic importing.
2. Scan the document `<head>` and inline critical CSS required for initial rendering.
3. Identify any non-composited CSS animations and rewrite them using only `transform` and `opacity` properties.
4. Defer all non-essential third-party scripts (analytics, trackers) using standard Next.js script optimization (`strategy="lazyOnload"`).
5. Output a terminal summary of estimated KiB saved before committing changes.
