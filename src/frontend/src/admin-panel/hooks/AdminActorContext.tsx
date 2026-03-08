/**
 * AdminActorContext
 *
 * Creates a single anonymous backend actor for the entire admin panel and
 * shares it via React context. This prevents duplicate connection attempts
 * and race conditions from each admin page independently initialising the actor.
 */
import type { backendInterface } from "@/backend";
import { createActorWithConfig } from "@/config";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface AdminActorContextValue {
  actor: backendInterface | null;
  actorError: boolean;
  retryActor: () => void;
}

const AdminActorContext = createContext<AdminActorContextValue>({
  actor: null,
  actorError: false,
  retryActor: () => {},
});

const MAX_RETRIES = 6;
const BASE_DELAY_MS = 1000;

export function AdminActorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [actor, setActor] = useState<backendInterface | null>(null);
  const [actorError, setActorError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const attemptsRef = useRef(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: retryKey is intentional retry trigger
  useEffect(() => {
    let cancelled = false;
    attemptsRef.current = 0;
    setActor(null);
    setActorError(false);

    const tryCreate = async () => {
      try {
        const a = await createActorWithConfig();
        if (!cancelled) {
          setActor(a);
          setActorError(false);
        }
      } catch {
        if (cancelled) return;
        attemptsRef.current += 1;
        if (attemptsRef.current < MAX_RETRIES) {
          const delay = BASE_DELAY_MS * attemptsRef.current;
          setTimeout(tryCreate, delay);
        } else {
          if (!cancelled) setActorError(true);
        }
      }
    };

    tryCreate();

    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  const retryActor = () => {
    setRetryKey((k) => k + 1);
  };

  return (
    <AdminActorContext.Provider value={{ actor, actorError, retryActor }}>
      {children}
    </AdminActorContext.Provider>
  );
}

export function useAdminActorContext() {
  return useContext(AdminActorContext);
}
