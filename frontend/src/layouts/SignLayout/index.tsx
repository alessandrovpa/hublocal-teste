import { Outlet } from 'react-router-dom';
import { DescriptionContent, OutletContent, SignContainer } from './styles';
import BackgroundImage from '../../assets/background-signin.png';

export function SignLayout() {
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
