# Specification

## Summary
**Goal:** Refresh the Collabsy website with an attractive, subtle pastel color theme that applies consistently across the entire frontend in both light and dark modes.

**Planned changes:**
- Update global theme design tokens (CSS variables) to a cohesive pastel palette for light mode and a muted, premium-feeling counterpart for dark mode, ensuring Tailwind/shadcn styles inherit the new colors consistently across all pages.
- Resolve theme-token inconsistencies by aligning/centralizing overlapping variable definitions so `frontend/src/index.css` and `frontend/index.css` do not produce different palettes depending on which stylesheet is loaded.
- Adjust marketing-specific utility classes (CTA sections, CTA buttons, marketing cards, hover/focus states) to match the new pastel theme while staying subtle and accessible, without changing any user-facing text.

**User-visible outcome:** The site (marketing pages, auth pages, dashboards, header/footer) displays a polished, subtle pastel theme with consistent colors and readable contrast in both light and dark modes, without sudden style shifts between routes or environments.
