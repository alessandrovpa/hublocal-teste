import { Button, InputAdornment, Modal, TextField } from '@mui/material';
import {
  Article,
  Flag,
  MyLocation,
  Pin,
  PostAdd,
  Public,
  Signpost,
  Save,
  Cancel,
} from '@mui/icons-material';
import { ModalBox } from '../../../../../components/ModalBox';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../../../../services/axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useAddressModal } from '../../../../../hooks/useAddressModal';
import { useCallback, useEffect } from 'react';
import formatText from '../../../../../utils/formatText';

const addressSchema = z.object({
  name: z.string().nonempty({ message: 'Preencha um nome' }),
  cep: z
    .string()
    .nonempty({ message: 'Preencha um CEP' })
    .max(10, { message: 'Máximo 10 dígitos' })
    .length(10, 'Preencha um CEP válido'),
  street: z.string().nonempty({ message: 'Preencha uma rua' }),
  number: z.string().nonempty({ message: 'Preencha um número' }),
  neighborhood: z.string().nonempty({ message: 'Preencha um bairro' }),
  city: z.string().nonempty({ message: 'Preencha uma cidade' }),
  state: z
    .string()
    .nonempty({ message: 'Preencha um estado' })
    .length(2, { message: 'Deve conter 2 dígitos' }),
});

type AddressInputs = z.infer<typeof addressSchema>;

interface Address extends AddressInputs {
  id: string;
}

interface ModalFormAddressProps {
  addresses?: Address[];
  updateAddresses: () => void;
}

export function ModalFormCompany({
  addresses,
  updateAddresses,
}: ModalFormAddressProps) {
  const { isModalOpened, closeModal, addressIndex } = useAddressModal();
  const { id } = useParams();
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<AddressInputs>({
    resolver: zodResolver(addressSchema),
  });

  const loadForm = useCallback(() => {
    reset();
    if (addressIndex !== null && addressIndex !== undefined && addresses) {
      reset(addresses[addressIndex]);
    }
  }, [addressIndex, addresses, reset]);

  useEffect(() => {
    reset({});
    loadForm();
  }, [loadForm, reset, isModalOpened]);

  async function handleSubmitAddressForm({
    name,
    cep,
    street,
    number,
    neighborhood,
    city,
    state,
  }: AddressInputs) {
    try {
      if (addressIndex !== null && addressIndex !== undefined && addresses) {
        await api.put(
          `/address/${addresses[addressIndex].id}`,
          {
            name,
            cep,
            street,
            number,
            neighborhood,
            city,
            state,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        toast.success('Endereço alterado!');
      } else {
        await api.post(
          `/company/${id}/address`,
          {
            name,
            cep,
            street,
            number,
            neighborhood,
            city,
            state,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        toast.success('Endereço cadastrado!');
      }

      updateAddresses();
      reset({});
      closeModal();
    } catch (error: any) {
      toast.error(String(error.response.data.message));
    }
  }

  function formatCEP() {
    const item = document.querySelector<HTMLInputElement>('#cep');
    if (item) {
      formatText('##.###-###', item);
    }
  }

  const title =
    addressIndex !== null && addressIndex !== undefined && addresses
      ? `Editar: ${addresses[addressIndex].name}`
      : `add`;

  return (
    <>
      <Modal open={isModalOpened} onClose={closeModal}>
        <ModalBox>
          <header>
            <strong>{title === 'add' ? `Adicionar Local` : title}</strong>
            <button onClick={closeModal}>
              <Cancel />
            </button>
          </header>
          <form onSubmit={handleSubmit(handleSubmitAddressForm)}>
            <TextField
              id="name"
              label="Nome"
              variant="outlined"
              autoFocus
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name && errors.name.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Article />
                  </InputAdornment>
                ),
              }}
            />

            <div>
              <TextField
                id="cep"
                label="CEP"
                variant="outlined"
                {...register('cep')}
                onKeyPress={formatCEP}
                error={!!errors.cep}
                helperText={errors.cep && errors.cep.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Flag />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="street"
                label="Rua"
                variant="outlined"
                {...register('street')}
                error={!!errors.street}
                helperText={errors.street && errors.street.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Signpost />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <TextField
                id="number"
                label="Número"
                variant="outlined"
                {...register('number')}
                error={!!errors.number}
                helperText={errors.number && errors.number.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Pin />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="neighborhood"
                label="Bairro"
                variant="outlined"
                {...register('neighborhood')}
                error={!!errors.neighborhood}
                helperText={errors.neighborhood && errors.neighborhood.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MyLocation />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div>
              <TextField
                id="city"
                label="Cidade"
                variant="outlined"
                {...register('city')}
                error={!!errors.city}
                helperText={errors.city && errors.city.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Public />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="state"
                label="Estado"
                variant="outlined"
                {...register('state')}
                error={!!errors.state}
                helperText={errors.state && errors.state.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Public />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <hr />
            <div>
              <div />
              <Button
                variant="contained"
                size="large"
                disabled={isSubmitting}
                endIcon={title === 'add' ? <PostAdd /> : <Save />}
                type="submit"
              >
                {title === 'add' ? `Adicionar` : `Salvar`}
              </Button>
            </div>
          </form>
        </ModalBox>
      </Modal>
    </>
  );
}
