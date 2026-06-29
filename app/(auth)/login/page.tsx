"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GuestGuard } from "@root/guards";
import { useLoginMutation } from "@services/auth-api";

function BrandPanel() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-900 flex-col items-center justify-center p-10 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white/5" />
      <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-sm w-full">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" fill="#2563eb"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">MegaMart</span>
        </div>
        <p className="text-blue-100 text-lg font-medium leading-relaxed">Your one-stop shop<br />for everything</p>
        <svg viewBox="0 0 280 220" fill="none" className="w-full max-w-xs">
          <rect x="70" y="90" width="140" height="110" rx="10" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
          <path d="M100 90 Q100 60 140 60 Q180 60 180 90" stroke="white" strokeOpacity="0.5" strokeWidth="7" strokeLinecap="round" fill="none"/>
          <rect x="80" y="115" width="60" height="32" rx="7" fill="white" fillOpacity="0.2"/>
          <text x="110" y="136" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">30%</text>
          <text x="160" y="130" textAnchor="middle" fill="white" fillOpacity="0.8" fontSize="10">OFF</text>
          <rect x="84" y="162" width="36" height="28" rx="5" fill="white" fillOpacity="0.15"/>
          <rect x="126" y="162" width="36" height="28" rx="5" fill="white" fillOpacity="0.15"/>
          <rect x="168" y="162" width="30" height="28" rx="5" fill="white" fillOpacity="0.15"/>
          <circle cx="55" cy="75" r="5" fill="white" fillOpacity="0.25"/>
          <circle cx="230" cy="130" r="7" fill="white" fillOpacity="0.2"/>
          <circle cx="48" cy="155" r="3" fill="white" fillOpacity="0.2"/>
          <circle cx="238" cy="80" r="4" fill="white" fillOpacity="0.25"/>
        </svg>
        <div className="flex flex-col gap-3 w-full">
          {[["👥","10M+ Customers"],["📦","50K+ Products"],["🕐","24/7 Support"]].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
              <span className="text-lg">{icon}</span>
              <span className="text-white font-medium text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const [loginMutation] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    try {
      await loginMutation({ email: email.trim(), password }).unwrap();
      toast.success("Welcome back!");
      router.replace("/dashboard");
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white px-6 py-12 sm:px-10">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 md:hidden">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" fill="white"/>
              <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-blue-600">MegaMart</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h1>
        <p className="text-gray-500 mb-8">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-gray-400">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
                </svg>
              </span>
              <input id="email" type="email" autoComplete="email" required value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"/>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Forgot password?</Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-gray-400">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </span>
              <input id="password" type={showPw ? "text" : "password"} autoComplete="current-password" required
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"/>
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-gray-600">
                {showPw
                  ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1">
            {loading
              ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Signing in…</>
              : "Sign In"
            }
          </button>
        </form>
        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-gray-200"/><span className="text-xs text-gray-400 font-medium">or continue with</span><span className="flex-1 h-px bg-gray-200"/>
        </div>
        <button type="button" onClick={() => toast.error("Google sign-in coming soon!")}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm shadow-sm transition">
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        <p className="text-center text-sm text-gray-500 mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <GuestGuard>
      <div className="min-h-screen flex">
        <BrandPanel />
        <LoginForm />
      </div>
    </GuestGuard>
  );
}
