// components/AuthGuard.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Define the props for the AuthGuard component
interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Define public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register'];

  useEffect(() => {
    // If the user is not authenticated and the route is not public, redirect to login
    if (!isAuthenticated && !publicRoutes.includes(router.pathname)) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router.pathname]);

  // If authenticated or on a public route, render the children
  return <>{children}</>;
};

export default AuthGuard;