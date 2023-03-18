import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext;
}
