import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { DashboardContainer, DashboardContent } from './styles';

export function DashboardLayout() {
  return (
    <DashboardContainer>
      <Header />
      <DashboardContent>
        <Outlet />
      </DashboardContent>
    </DashboardContainer>
  );
}
