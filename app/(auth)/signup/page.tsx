"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GuestGuard } from "@root/guards";
import { useSignupMutation } from "@services/auth-api";

function passwordStrength(pw: string): { label: string; color: string; width: string } {
  if (pw.length === 0) return { label: "", color: "bg-gray-200", width: "w-0" };
  if (pw.length < 6) return { label: "Weak", color: "bg-red-500", width: "w-1/3" };
  if (pw.length < 10 || !/[A-Z]/.test(pw) || !/[0-9]/.test(pw))
    return { label: "Medium", color: "bg-yellow-500", width: "w-2/3" };
  return { label: "Strong", color: "bg-green-500", width: "w-full" };
}

function BrandPanel() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 flex-col items-center justify-center p-10 relative overflow-hidden order-last">
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5"/>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/5"/>
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
        <p className="text-blue-100 text-lg font-medium leading-relaxed">Join millions of shoppers<br />and start saving today</p>
        <svg viewBox="0 0 280 220" fill="none" className="w-full max-w-xs">
          <circle cx="140" cy="110" r="80" fill="white" fillOpacity="0.08"/>
          <circle cx="140" cy="110" r="55" fill="white" fillOpacity="0.08"/>
          <path d="M100 95 L140 70 L180 95 L180 130 L140 150 L100 130 Z" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.4" strokeWidth="1.5"/>
          <path d="M140 70 L140 150" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
          <path d="M100 95 L180 95" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
          <circle cx="140" cy="110" r="12" fill="white" fillOpacity="0.4"/>
          <path d="M135 110 L138 113 L145 106" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="60" cy="60" r="4" fill="white" fillOpacity="0.3"/>
          <circle cx="220" cy="80" r="6" fill="white" fillOpacity="0.25"/>
          <circle cx="70" cy="170" r="3" fill="white" fillOpacity="0.2"/>
          <circle cx="215" cy="160" r="5" fill="white" fillOpacity="0.2"/>
        </svg>
        <div className="flex flex-col gap-3 w-full">
          {[["🎁","Exclusive member deals"],["🔒","Secure & private"],["⚡","Fast checkout"]].map(([icon, label]) => (
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

function SignupForm() {
  const router = useRouter();
  const [signupMutation] = useSignupMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = passwordStrength(password);
  const mismatch = confirm.length > 0 && confirm !== password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) { toast.error("Please agree to the Terms & Conditions"); return; }
    if (password !== confirm) { toast.error("Passwords do not match"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      await signupMutation({ name: name.trim(), email: email.trim(), password }).unwrap();
      toast.success("Account created! Please sign in.");
      router.replace("/login");
    } catch (err: unknown) {
      const msg = (err as { data?: { message?: string } })?.data?.message || "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white";

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white px-6 py-10 sm:px-10 overflow-y-auto">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6 md:hidden">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" fill="white"/>
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-blue-600">MegaMart</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Create account</h1>
        <p className="text-gray-500 mb-7">Join millions of happy shoppers</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-gray-400"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <input id="name" type="text" autoComplete="name" required value={name}
                onChange={(e) => setName(e.target.value)} placeholder="John Doe" className={inputCls}/>
            </div>
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-gray-400"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
              </span>
              <input id="email" type="email" autoComplete="email" required value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls}/>
            </div>
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              </span>
              <input id="password" type={showPw ? "text" : "password"} required value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters"
                className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"/>
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-gray-600">
                {showPw
                  ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-2">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}/>
                </div>
                <p className={`text-xs mt-1 font-medium ${strength.color.replace("bg-","text-")}`}>{strength.label}</p>
              </div>
            )}
          </div>
          {/* Confirm */}
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              </span>
              <input id="confirm" type="password" required value={confirm}
                onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter password"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:bg-white ${mismatch ? "border-red-400 bg-red-50 focus:ring-red-400" : "border-gray-200 bg-gray-50 focus:ring-blue-500"}`}/>
            </div>
            {mismatch && <p className="text-xs text-red-500 mt-1">Passwords do not match</p>}
          </div>
          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition ${agreed ? "bg-blue-600 border-blue-600" : "border-gray-300 group-hover:border-blue-400"}`}
              onClick={() => setAgreed(v => !v)}>
              {agreed && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 hover:underline font-medium">Terms &amp; Conditions</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link>
            </span>
          </label>
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1">
            {loading
              ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating account…</>
              : "Create Account"
            }
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <GuestGuard>
      <div className="min-h-screen flex">
        <SignupForm />
        <BrandPanel />
      </div>
    </GuestGuard>
  );
}
