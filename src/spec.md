# Specification

## Summary
**Goal:** Update the Home page greeting microcopy to say “Welcome to your growth space” while still showing the user’s anonymous username.

**Planned changes:**
- Update the Home page heading in `frontend/src/pages/Home.tsx` to replace “Welcome back” with the exact phrase “Welcome to your growth space”, keeping the username in the greeting when available.
- Ensure no other screens’ user-facing copy is changed.

**User-visible outcome:** On the Home page, users see the updated greeting “Welcome to your growth space, {username}” (or equivalent with username when available) instead of “Welcome back”.
