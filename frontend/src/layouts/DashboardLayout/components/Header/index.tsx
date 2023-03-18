import { HeaderContainer } from './styles';
import { Business } from '@mui/icons-material';
import { Profile } from '../Profile';

export function Header() {
  return (
    <HeaderContainer>
      <div>
        <h2>
          <Business />
          Minhas Empresas
        </h2>
      </div>
      <Profile />
    </HeaderContainer>
  );
}
