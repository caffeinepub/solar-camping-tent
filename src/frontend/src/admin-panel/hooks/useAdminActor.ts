/**
 * useAdminActor
 *
 * Thin wrapper that reads the shared admin backend actor from AdminActorContext.
 * All admin pages use this hook -- the actor is initialised once in AdminActorProvider
 * and shared across all pages, preventing duplicate connections and race conditions.
 */
export { useAdminActorContext as useAdminActor } from "./AdminActorContext";
