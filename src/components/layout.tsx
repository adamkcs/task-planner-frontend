import { ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav  className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-wide">TaskPlanner</h1>
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          Logout
        </button>        
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}