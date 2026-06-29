export const dynamic = "force-dynamic";

import { AuthGuard } from "@root/guards";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome to Magamart.</p>
      </div>
    </AuthGuard>
  );
}
