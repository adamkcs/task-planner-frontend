"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LogoutButton from "@/components/logout";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📌 Your Tasks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example Task Card */}
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold">Build React UI</h3>
          <p className="text-gray-600">Finish the dashboard layout.</p>
          <span className="text-sm text-blue-600">Due: Tomorrow</span>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold">Fix Backend API</h3>
          <p className="text-gray-600">Resolve 500 errors in Task API.</p>
          <span className="text-sm text-green-600">Due: Friday</span>
        </div>
      </div>
    </div>
  );
}