# SolTrek Admin Portal Fix

## Current State
The admin portal (`/admin-login` → `/admin-dashboard`, `/admin-orders`, `/admin-customers`, `/admin-products`, `/admin-analytics`) exists as a separate module under `src/frontend/src/admin-panel/`. It uses a custom `useAdminActor` hook that calls `createActorWithConfig()` with retry logic to connect to the backend. The checkout page (`CheckoutPage.tsx`) correctly calls `actor.placeOrder()` after payment.

Known issues:
1. `useAdminActor` has no fallback for when `createActorWithConfig()` succeeds but returns an actor that is not yet "ready" (race conditions on page load)
2. All admin pages individually manage their own `actor`/`actorError` state leading to multiple independent connection attempts that can fail
3. Backend product inventory data shows old prices (5999, 8999, 12999) not matching current live prices (9999, 12999, 14999)
4. No shared actor context means each admin page re-creates the actor connection on every mount/navigate

## Requested Changes (Diff)

### Add
- Shared `AdminActorContext` provider that creates the backend actor once and shares it across all admin pages
- Loading state shown in `AdminLayout` while actor is initializing (prevents pages rendering before actor is ready)

### Modify
- `useAdminActor.ts` → rewrite to use React context pattern (read from `AdminActorContext`)
- `AdminLayout.tsx` → wrap children in `AdminActorProvider`; show a spinner while the actor is connecting
- All admin page components → remove their own actor error/loading state tied to actorError; rely on shared context
- Backend product inventory prices updated to match live site: Solo ₹9,999, Duo ₹12,999, Pro ₹14,999

### Remove
- Redundant per-page actor initialization retry logic (consolidated into single context)

## Implementation Plan
1. Create `AdminActorContext.tsx` with `AdminActorProvider` component that initializes actor once with retries
2. Rewrite `useAdminActor.ts` to consume the context
3. Update `AdminLayout.tsx` to wrap children with `AdminActorProvider` and show centered spinner while `actor === null && !actorError`
4. Update backend `main.mo` product inventory prices to match current live prices
5. Validate and deploy
