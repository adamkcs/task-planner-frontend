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
    <div>
      <nav className="p-4 bg-gray-800 text-white">
        <h1 className="text-xl">TaskPlanner</h1>
        <button onClick={() => signOut({ callbackUrl: "/login" })} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>        
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
}