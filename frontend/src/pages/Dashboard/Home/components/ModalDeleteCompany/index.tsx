import { Button, Modal } from '@mui/material';
import { ModalBox } from '../../../../../components/ModalBox';
import { api } from '../../../../../services/axios';
import { useAuth } from '../../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { FormEvent } from 'react';
import { Cancel, Delete } from '@mui/icons-material';
import { useCompanyModal } from '../../../../../hooks/useCompanyModal';

interface Company {
  id: string;
  name: string;
}

interface ModalDeleteCompanyProps {
  companies: Company[];
  updateCompanies: () => void;
}

export function ModalDeleteCompany({
  companies,
  updateCompanies,
}: ModalDeleteCompanyProps) {
  const { isDeleteModalOpened, closeDeleteModal, companyIndex } =
    useCompanyModal();
  const { token } = useAuth();

  async function handleDeleteAddress(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (companies) {
        await api.delete(`/company/${companies![companyIndex!].id}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        updateCompanies();
        toast.success('Empresa removida com sucesso!');
      }

      closeDeleteModal();
    } catch (error: any) {
      toast.error(String(error.response.data.message));
    }
  }

  const title =
    companyIndex !== null && companyIndex !== undefined
      ? companies[companyIndex].name
      : `Eror`;

  return (
    <>
      <Modal open={isDeleteModalOpened} onClose={closeDeleteModal}>
        <ModalBox type="delete">
          <header>
            <strong>Confirmação de exclusão</strong>
            <button onClick={closeDeleteModal}>
              <Cancel />
            </button>
          </header>

          <form onSubmit={(e) => handleDeleteAddress(e)}>
            <p>
              A empresa <strong>{title}</strong> será excluído. Tem certeza
              dessa ação?
            </p>
            <div>
              <div></div>

              <Button
                variant="contained"
                type="submit"
                color={'error'}
                endIcon={<Delete />}
              >
                Excluir
              </Button>
            </div>
          </form>
        </ModalBox>
      </Modal>
    </>
  );
}
