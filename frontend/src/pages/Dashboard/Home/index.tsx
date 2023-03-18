import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/axios';
import { CompanyTable } from './components/CompanyTable';
import { DashboardContainer, DashboardContent } from './styles';
import { Button, Skeleton } from '@mui/material';
import { useCompanyModal } from '../../../hooks/useCompanyModal';
import { ModalFormCompany } from './components/ModalFormCompany';
import { ModalDeleteCompany } from './components/ModalDeleteCompany';

interface Company {
  id: string;
  name: string;
  cnpj: string;
  website: string;
  addressesCount: number;
}

export function DashboardHome() {
  const { token } = useAuth();
  const { openModal } = useCompanyModal();
  const [companies, setCompanies] = useState<Company[] | null>(null);

  const getCompanies = useCallback(async () => {
    const response = await api.get('/company', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    setCompanies(response.data.companies);
  }, [token]);

  function handleOpenModal() {
    openModal();
  }

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  return (
    <DashboardContainer>
      <DashboardContent isFilled={!!companies && companies.length > 0}>
        <Button
          variant="contained"
          size="large"
          type="submit"
          onClick={handleOpenModal}
        >
          Adicionar Empresa
        </Button>
        {!companies ? (
          <div>
            <Skeleton variant="text" width={700} height={50} />
            <Skeleton variant="text" width={700} height={50} />
            <Skeleton variant="text" width={700} height={50} />
            <Skeleton variant="text" width={700} height={50} />
          </div>
        ) : companies.length > 0 ? (
          <CompanyTable companies={companies} />
        ) : (
          <h1>Nenhuma empresa cadastrada!</h1>
        )}
      </DashboardContent>

      <ModalFormCompany
        companies={companies || undefined}
        updateCompanies={getCompanies}
      />
      <ModalDeleteCompany
        companies={companies!}
        updateCompanies={getCompanies}
      />
    </DashboardContainer>
  );
}
