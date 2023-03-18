import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../services/axios';

interface LoginProps {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  login: (data: LoginProps) => void;
  logout: () => void;
  user: User;
  token: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as User);
  const [token, setToken] = useState<string | null>(null);

  function updateUser(user: User) {
    setUser(user);
    const userJSON = JSON.stringify(user);
    localStorage.setItem('@hublocal-teste:user', userJSON);
  }

  function updateToken(token: string) {
    setToken(token);
    const tokenJSON = JSON.stringify(token);
    localStorage.setItem('@hublocal-teste:token', tokenJSON);
  }

  async function login({ email, password }: LoginProps) {
    try {
      const response = await api.post('/auth', {
        email,
        password,
      });
      updateUser(response.data.user);
      updateToken(response.data.token);
      toast.success(`Seja bem vindo(a) ${response.data.user.name}`);
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(String(error.response.data.message));
    }
  }

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('@hublocal-teste:token');
    localStorage.removeItem('@hublocal-teste:user');
    toast.info('Até a próxima!');
    navigate('/');
  }, [navigate]);

  const verifyTokenAlreadyStored = useCallback(async () => {
    if (!user || !token) {
      const storedToken = localStorage.getItem('@hublocal-teste:token');
      const storedUser = localStorage.getItem('@hublocal-teste:user');

      if (storedToken && storedUser) {
        try {
          await api.get(`/auth?token=${JSON.parse(storedToken)}`);
        } catch (error) {
          logout();
        }
        setToken(JSON.parse(storedToken));
        setUser(JSON.parse(storedUser));
      }
    }
  }, [logout, user, token]);

  useEffect(() => {
    verifyTokenAlreadyStored();
  }, [verifyTokenAlreadyStored]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
