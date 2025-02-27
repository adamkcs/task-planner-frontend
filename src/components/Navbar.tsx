import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Brand */}
        <Link href="/dashboard" className="text-xl font-bold">
          Task Planner
        </Link>

        {/* Right side: Auth Controls */}
        <div>
          {session ? (
            <LogoutButton />
          ) : (
            <Link
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}