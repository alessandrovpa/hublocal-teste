import { Route, Routes } from 'react-router-dom';
import { AddressModalContextProvider } from '../context/AddressModalContext';
import { CompanyModalContextProvider } from '../context/CompanyModalContext';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { SignLayout } from '../layouts/SignLayout';
import { Company } from '../pages/Dashboard/Address';
import { DashboardHome } from '../pages/Dashboard/Home';
import { SignIn } from '../pages/SignIn/index';
import { SignUp } from '../pages/SignUp';
import { RequireAuth } from './RequireAuth';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route
          path="/dashboard"
          element={
            <CompanyModalContextProvider>
              <DashboardHome />
            </CompanyModalContextProvider>
          }
        />
        <Route
          path="/dashboard/company/:id"
          element={
            <AddressModalContextProvider>
              <Company />
            </AddressModalContextProvider>
          }
        />
      </Route>
    </Routes>
  );
}
