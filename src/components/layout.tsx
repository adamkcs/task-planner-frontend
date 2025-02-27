import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      {session && <Navbar />} {/* Show Navbar only when logged in */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}