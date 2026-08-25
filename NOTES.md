# NOTES.md

## Two challenges

**1. The intercepting route for the task modal fought with client-side navigation.**
Getting `app/@modal/(.)tasks/[taskId]/page.js` to open correctly from a `Link` was the easy part. The harder part was everything *around* it: navigating from the modal to `/tasks/[taskId]/edit` and back needed to land on the same modal state, not a stale one or a duplicate. The fix that actually held up was using `router.back()` for every "close/cancel" action instead of `router.push()` to a fixed URL — pushing forward re-triggers interception and can stack a new render on top of the one still mounted underneath; going back restores the exact prior router state instead.

**2. React Hook Form's `reset()` fighting a live TanStack Query refetch.**
The edit form loaded its initial values via `useEffect` + `reset(initialData)`. That looked correct, but the task query refetches in the background (on mount, on focus), and every refetch produced a new object reference for `initialData`, re-firing the effect and silently overwriting whatever the user had already typed. The real fix wasn't a better dependency array — it was removing the effect entirely: since the parent already waits for the task to finish loading before rendering the form, the form's default values can just be computed once, directly, when it's created, with nothing left that can fire again later.

## Two technical decisions

**1. Route Handlers + a JSON file on disk, instead of MSW or json-server.**
The assignment allows any of the three. Route Handlers backed by `fs/promises` reading/writing `src/data/tasks.json` meant real, working create/edit/delete during local development with no extra dependency or separate mock server process to run alongside `next dev` — closer to how the real API layer would eventually look than an in-browser service-worker mock would be.

**2. Zustand for preferences, nothing else.**
Task and project data is server state and belongs in TanStack Query, not in a global store. The only state that's genuinely shared across unrelated parts of the tree — theme and dashboard view mode — goes in Zustand with the `persist` middleware for localStorage. Everything else (search text, filter/sort selection, form state) stays local to the component that owns it, on purpose, rather than centralizing state that nothing else needs.
