export const dynamic = "force-dynamic";

import { GuestGuard } from "@root/guards";

export default function LoginPage() {
  return (
    <GuestGuard>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sign in to Magamart</h1>
          <p className="text-gray-500 text-sm">Login form goes here.</p>
        </div>
      </div>
    </GuestGuard>
  );
}
