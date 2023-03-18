import { useContext } from 'react';
import { CompanyModalContext } from '../context/CompanyModalContext';

export function useCompanyModal() {
  const companyModalContext = useContext(CompanyModalContext);

  return companyModalContext;
}
