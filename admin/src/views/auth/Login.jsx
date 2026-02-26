import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { adminLogin, messageClear } from "../../store/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  // Check if there's an expired session query parameter
  const queryParams = new URLSearchParams(location.search);
  const sessionExpired = queryParams.get("expired") === "true";

  useEffect(() => {
    // Show a message if the session has expired
    if (sessionExpired) {
      toast.error("Your session has expired. Please log in again.");
    }
  }, [sessionExpired]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(state));
  };

  useEffect(() => {
    if (isError) {
      dispatch(messageClear());
    }
    if (isSuccess) {
      toast.success("Successful login");
      dispatch(messageClear());
      navigate("/admin");
    }
  }, [isError, isSuccess, message, dispatch, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-16 h-72 w-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-80 w-80 bg-teal-500/25 rounded-full blur-3xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-900/90 border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden backdrop-blur">
          <div className="hidden md:flex flex-col justify-between p-8 xl:p-10 bg-gradient-to-b from-red-500/20 to-cyan-500/10 border-r border-slate-700/60">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blue-200/80">
                Vital Fit
              </p>
              <h1 className="mt-4 text-3xl xl:text-4xl font-bold text-white leading-tight">
                control center
              </h1>
              <p className="mt-4 text-sm text-slate-200/80 max-w-sm">
                Securely manage system-wide settings, announcements, users and
                more from a focused, high-clarity workspace.
              </p>
            </div>
            <div className="mt-10 space-y-3 text-xs text-slate-200/70">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-900/60 border border-slate-700/80 text-blue-300 text-xs font-semibold">
                  1
                </span>
                <div>
                  <p className="font-semibold text-slate-50">
                    Enterprise-grade security
                  </p>
                  <p>
                    Protected routes, short-lived sessions and role-based
                    access.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-900/60 border border-slate-700/80 text-teal-300 text-xs font-semibold">
                  2
                </span>
                <div>
                  <p className="font-semibold text-slate-50">
                    Operational clarity
                  </p>
                  <p>
                    Instant access to dashboards, analytics and system health.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-8 sm:px-10 sm:py-10 flex flex-col justify-center">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Admin login
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Sign in with your admin credentials to continue.
                </p>
              </div>
              {sessionExpired && (
                <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  Your session has expired. Please log in again.
                </div>
              )}
              <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Email address
                  </label>
                  <input
                    onChange={inputHandle}
                    value={state.email}
                    className="block w-full rounded-xl border border-slate-600/80 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder-slate-400 shadow-sm focus:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/30"
                    type="text"
                    name="email"
                    placeholder="you@example.com"
                    id="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>
                  <input
                    onChange={inputHandle}
                    value={state.password}
                    className="block w-full rounded-xl border border-slate-600/80 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder-slate-400 shadow-sm focus:border-yellow-300 focus:ring-offset-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-500/30"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    id="password"
                    required
                  />
                </div>
                <button
                  disabled={isLoading}
                  className="relative mt-2 inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-red-500 via-gray-500 to-yellow-700 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-yellow-500/30 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 transition-opacity group-hover:opacity-40" />
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
                <p className="mt-4 text-xs text-center text-slate-400">
                  Access is restricted to authorized administrators. Activity
                  may be monitored for security and compliance.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
