---
description: Check the current component design against strict "Premium Aesthetic" guidelines and provide specific improvement suggestions.
---

1.  **Read the Component**:
    - Use `view_file` to read the component source code provided by the user or identified from context.

2.  **Analyze against "Premium Aesthetic" Rubric**:
    - **Typography**:
      - Is `font-black uppercase tracking-tighter` used for Headings?
      - Are subheadings `text-[10px]` with `tracking-[0.2em]`?
    - **Visual Hierarchy**:
      - Is whitespace deep (`py-24`, `gap-8`)?
      - Do cards use large radii (`rounded-[2.5rem]`)?
    - **Color & Atmosphere**:
      - Is `bg-[#0a0a0a]` used for dark mode?
      - Are trust badges (`bg-blue-600/10`) present instead of plain text tags?
    - **Interaction**:
      - Are transitions `duration-500` or slower?
      - Do hover effects include glows or blur layers?
    - **Terminology**:
      - Does it say "Team" (Standard) or "Faculty" (Elite)?
      - Does it say "Contact" (Standard) or "Secure Channel" (Elite)?

3.  **Generate Report**:
    - **Rating**: Give a score out of 10.
    - **Critique**: Briefly list 1-2 weaknessess relative to the "Institutional" standard.
    - **Actionable Fixes**: Provide 3 specific Tailwind class changes.
      - _Example:_ "Change `duration-300` to `duration-700` for a more luxurious feel."
      - _Example:_ "Replace `rounded-lg` with `rounded-[2rem]`."

4.  **Confirm**:
    - Ask the user if they want to apply these changes automatically.
