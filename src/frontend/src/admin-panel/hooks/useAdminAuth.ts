const ADMIN_SESSION_KEY = "admin_session";

const ADMIN_CREDENTIALS = {
  email: "admin@soltrek.com",
  password: "Admin@2024",
};

export function login(email: string, password: string): boolean {
  if (
    email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    sessionStorage.setItem(
      ADMIN_SESSION_KEY,
      JSON.stringify({ email, loggedInAt: Date.now() }),
    );
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export function isAuthenticated(): boolean {
  const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
  if (!session) return false;
  try {
    const parsed = JSON.parse(session);
    // Session timeout: 8 hours
    const eightHours = 8 * 60 * 60 * 1000;
    if (Date.now() - parsed.loggedInAt > eightHours) {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function useAdminAuth() {
  return {
    isAuthenticated: isAuthenticated(),
    login,
    logout,
  };
}
