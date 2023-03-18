import { Button, Modal } from '@mui/material';
import { ModalBox } from '../../../../../components/ModalBox';
import { api } from '../../../../../services/axios';
import { useAuth } from '../../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useAddressModal } from '../../../../../hooks/useAddressModal';
import { FormEvent } from 'react';
import { Cancel, Delete } from '@mui/icons-material';

interface Address {
  id: string;
  name: string;
}

interface ModalDeleteAddressProps {
  addresses: Address[];
  updateAddresses: () => void;
}

export function ModalDeleteAddress({
  addresses,
  updateAddresses,
}: ModalDeleteAddressProps) {
  const { isDeleteModalOpened, closeDeleteModal, addressIndex } =
    useAddressModal();
  const { token } = useAuth();

  async function handleDeleteAddress(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (addresses) {
        await api.delete(`/address/${addresses![addressIndex!].id}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        updateAddresses();
        toast.success('Endereço removido com sucesso!');
      }

      closeDeleteModal();
    } catch (error: any) {
      toast.error(String(error.response.data.message));
    }
  }

  const title =
    addressIndex !== null && addressIndex !== undefined
      ? addresses[addressIndex].name
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
              O local <strong>{title}</strong> será excluído. Tem certeza dessa
              ação?
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
