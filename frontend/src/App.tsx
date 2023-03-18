import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/Routes';
import { GlobalStyle } from './styles/global';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
      <GlobalStyle />
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  );
}
