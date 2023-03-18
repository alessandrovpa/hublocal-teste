import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/axios';
import {
  BackContainer,
  CompanyContainer,
  CompanyContent,
  HeaderTable,
} from './styles';
import { Button, Skeleton } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { AddressTable } from './components/AddressTable';
import { ArrowBack } from '@mui/icons-material';
import { ModalFormCompany } from './components/ModalFormAddress';
import { useAddressModal } from '../../../hooks/useAddressModal';
import { ModalDeleteAddress } from './components/ModalDeleteAddress';

interface Address {
  id: string;
  name: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface FullCompany {
  id: string;
  name: string;
  addresses: Address[];
}

export function Company() {
  const { openModal } = useAddressModal();

  const { id } = useParams();
  const { token } = useAuth();
  const [company, setCompany] = useState<FullCompany | null>();

  const getFullCompany = useCallback(async () => {
    const response = await api.get(`/company/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    console.log('opa');
    console.log(response.data.company.addresses);
    setCompany(response.data.company);
  }, [token, id]);

  useEffect(() => {
    getFullCompany();
  }, [getFullCompany]);

  function handleOpenModal() {
    openModal();
  }

  return (
    <CompanyContainer>
      <BackContainer>
        <Link to="/dashboard">
          <ArrowBack />
          Voltar
        </Link>
      </BackContainer>

      {!company && (
        <CompanyContent>
          <Skeleton variant="text" width={700} height={50} />
          <Skeleton variant="text" width={700} height={50} />
          <Skeleton variant="text" width={700} height={50} />
        </CompanyContent>
      )}
      {company && (
        <CompanyContent isFilled={!!company && company.addresses.length > 0}>
          <HeaderTable>
            {company.addresses.length > 0 && <h2>{company.name}</h2>}
            <Button
              variant="contained"
              size="large"
              type="submit"
              onClick={handleOpenModal}
            >
              Adicionar Local
            </Button>
          </HeaderTable>

          {company.addresses.length > 0 ? (
            <AddressTable addresses={company.addresses} />
          ) : (
            <h1>Nenhum local cadastrado!</h1>
          )}
        </CompanyContent>
      )}

      <ModalFormCompany
        addresses={company ? company.addresses : undefined}
        updateAddresses={getFullCompany}
      />
      {company && company.addresses && (
        <ModalDeleteAddress
          addresses={company.addresses}
          updateAddresses={getFullCompany}
        />
      )}
      {company && company.addresses && (
        <ModalDeleteAddress
          addresses={company && company.addresses}
          updateAddresses={getFullCompany}
        />
      )}
    </CompanyContainer>
  );
}
