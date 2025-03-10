import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ReactNode } from "react";

interface AuthGuardProps {
    children: ReactNode;
  }

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
    } else {
      router.push("/auth/login");
    }
  }, [isAuthenticated]);

  if (loading) return <p>Loading...</p>; // Prevent flickering
  return children;
}