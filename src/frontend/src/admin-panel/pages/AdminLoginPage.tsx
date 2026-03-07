import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { isAuthenticated, login } from "../hooks/useAdminAuth";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate({ to: "/admin-dashboard" });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attempts >= 5) {
      setError("Too many failed attempts. Please try again later.");
      return;
    }
    setError("");
    setIsLoading(true);

    // Simulate a small async delay for security feel
    await new Promise((r) => setTimeout(r, 600));

    const success = login(email.trim(), password);
    setIsLoading(false);

    if (success) {
      navigate({ to: "/admin-dashboard" });
    } else {
      setAttempts((prev) => prev + 1);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 40%)",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700/60 shadow-2xl shadow-black/40 p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="/assets/generated/soltrek-logo-transparent.dim_400x200.png"
              alt="SolTrek"
              className="h-12 w-auto object-contain brightness-0 invert opacity-90 mb-4"
            />
            <div className="flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-2">
              <ShieldCheck
                className="text-indigo-400"
                style={{ width: "14px", height: "14px" }}
              />
              <span className="text-indigo-300 text-xs font-bold tracking-wide uppercase">
                Admin Login
              </span>
            </div>
            <p className="text-slate-400 text-sm text-center">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5"
              >
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@soltrek.com"
                required
                autoComplete="email"
                data-ocid="admin.login.input"
                className="w-full bg-slate-700/60 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  data-ocid="admin.login.password.input"
                  className="w-full bg-slate-700/60 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: "16px", height: "16px" }} />
                  ) : (
                    <Eye style={{ width: "16px", height: "16px" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                data-ocid="admin.login.error_state"
                className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
              >
                <span className="text-red-400 text-xs font-medium">
                  {error}
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || attempts >= 5}
              data-ocid="admin.login.submit_button"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-all duration-150 active:scale-[0.98] mt-2 shadow-lg shadow-indigo-600/25"
            >
              {isLoading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    style={{ width: "16px", height: "16px" }}
                  />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer hint */}
          <p className="mt-6 text-center text-slate-600 text-xs">
            Protected admin area · Unauthorized access is prohibited
          </p>
        </div>
      </div>
    </div>
  );
}
