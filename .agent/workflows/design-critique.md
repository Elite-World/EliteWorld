---
description: Check the current component design against strict "Premium Aesthetic" guidelines and provide specific improvement suggestions.
---

1.  **Read the Component**:
    - Use `view_file` to read the component source code provided by the user or identified from context.

2.  **Analyze against "Premium Aesthetic" Rubric**:
    - **Visual Hierarchy**: Is the most important action clearly dominant? Are standard text sizes (sm/base/lg) used effectively to create depth?
    - **Spacing & Layout**: Is whitespace generous (`p-6`, `gap-6` instead of `p-2`)? Does it feel cramped?
    - **Color Palette**:
      - Are colors semantic (Teal/Gray) or generic (Blue/Red)?
      - Are gradients used for "Hero" elements?
      - Is `text-gray-500/600` used for secondary text instead of `text-gray-900`?
    - **Interaction**: Are `hover:scale`, `hover:shadow-lg`, or `transition-all` present on interactive elements?
    - **Depth**: Are shadows (`shadow-sm`, `shadow-xl`) used to differentiate layers?
    - **Glassmorphism**: Is `backdrop-blur-md` or `bg-white/80` used for overlays/sticky headers?

3.  **Generate Report**:
    - **Rating**: Give a score out of 10.
    - **Critique**: Briefly list 1-2 major weaknesses.
    - **Actionable Fixes**: Provide 3 specific Tailwind class changes.
      - _Example:_ "Change `bg-blue-500` to `bg-gradient-to-r from-teal-500 to-emerald-500`."
      - _Example:_ "Add `hover:-translate-y-1 transition-transform` to the card container."

4.  **Confirm**:
    - Ask the user if they want to apply these changes automatically.
