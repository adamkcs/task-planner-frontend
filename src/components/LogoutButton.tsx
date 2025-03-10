import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Clear authentication state
    router.push('/auth/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;