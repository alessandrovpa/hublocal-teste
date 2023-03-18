import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const token = localStorage.getItem('@hublocal-teste:token');
  if (!token) return <Navigate to="/" />;
  return <>{children}</>;
}
