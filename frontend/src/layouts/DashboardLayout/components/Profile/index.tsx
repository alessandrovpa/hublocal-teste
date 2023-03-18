import { ProfileContainer } from './styles';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useAuth } from '../../../../hooks/useAuth';

export function Profile() {
  const { user, logout } = useAuth();
  return (
    <ProfileContainer onClick={logout}>
      <AccountCircle />
      <h2>{user.name}</h2>
      <Logout />
    </ProfileContainer>
  );
}
