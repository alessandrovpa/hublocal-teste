import { Outlet, useNavigate } from 'react-router-dom';
import { DescriptionContent, OutletContent, SignContainer } from './styles';
import BackgroundImage from '../../assets/background-signin.png';
import { useEffect } from 'react';

export function SignLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@hublocal-teste:token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  return (
    <SignContainer>
      <DescriptionContent>
        <figure>
          <img src={BackgroundImage} alt="hublocal image" />
        </figure>
        <div>
          <h1>Junte-se a vários clientes satisfeitos.</h1>
          <p>
            Cliente HubLocal ganha mais relevância, autoridade e visibilidade.
            Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!
          </p>
        </div>
      </DescriptionContent>
      <OutletContent>
        <Outlet />
      </OutletContent>
    </SignContainer>
  );
}
