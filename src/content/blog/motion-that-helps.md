---
title: "Motion that helps, not motion that shows off"
description: "One test for every animation: would a visitor lose information without it?"
tag: "Design"
date: 2026-09-30
readingTime: "5 min"
author: "Theo Laurent"
cover: "../../assets/images/b-3.webp"
coverAlt: ""
featured: false
---

Every animation on a website costs something: attention, battery and time. The good ones pay that back by explaining what just happened.

We use one test before any motion goes into a project: if we removed it, would a visitor lose information? A menu that slides in from where you tapped teaches you where it lives. A logo that spins for three seconds teaches you nothing.

## Three jobs motion can do

- Show where something came from and where it went.
- Confirm that an action worked.
- Set a pace, so long pages feel like chapters.

> If you can't say what an animation is for in one sentence, it's decoration.

Decoration isn't banned. It just has a budget, and the budget is small: one signature moment per page, and everything else quiet.

## Respect the people who turn it off

Around one in four of our visitors on some projects have reduced motion turned on. For them the page should be complete and calm, not broken.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```

That's a blunt start. In practice we design the reduced version first, then add motion on top.
