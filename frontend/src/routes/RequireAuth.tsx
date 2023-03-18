import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function RequireAuth({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/" />;
  return children;
}
