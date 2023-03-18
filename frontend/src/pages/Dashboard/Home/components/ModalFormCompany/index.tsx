import { Button, InputAdornment, Modal, TextField } from '@mui/material';
import {
  Article,
  PostAdd,
  Save,
  Cancel,
  Language,
  Business,
} from '@mui/icons-material';
import { ModalBox } from '../../../../../components/ModalBox';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../../../../services/axios';
import { useAuth } from '../../../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useCallback, useEffect } from 'react';
import { useCompanyModal } from '../../../../../hooks/useCompanyModal';
import formatText from '../../../../../utils/formatText';

const companySchema = z.object({
  name: z.string().nonempty({ message: 'Preencha um nome' }),
  website: z.string().nonempty({ message: 'Preencha um website' }),
  cnpj: z
    .string()
    .nonempty({ message: 'Preencha um CNPJ' })
    .max(18, { message: 'Máximo 18 dígitos' })
    .length(18, { message: 'Preencha o CNPJ completo' }),
});

type CompanyInputs = z.infer<typeof companySchema>;

interface Company extends CompanyInputs {
  id: string;
}

interface ModalFormCompanyProps {
  companies?: Company[];
  updateCompanies: () => void;
}

export function ModalFormCompany({
  companies,
  updateCompanies,
}: ModalFormCompanyProps) {
  const { isModalOpened, closeModal, companyIndex } = useCompanyModal();
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CompanyInputs>({
    resolver: zodResolver(companySchema),
  });

  const loadForm = useCallback(() => {
    reset();
    if (companyIndex !== null && companyIndex !== undefined && companies) {
      reset(companies[companyIndex]);
    }
  }, [companyIndex, companies, reset]);

  useEffect(() => {
    reset({});
    loadForm();
  }, [loadForm, reset, isModalOpened]);

  async function handleSubmitAddressForm({
    name,
    website,
    cnpj,
  }: CompanyInputs) {
    try {
      if (companyIndex !== null && companyIndex !== undefined && companies) {
        await api.put(
          `/company/${companies[companyIndex].id}`,
          {
            name,
            website,
            cnpj,
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
          `/company`,
          {
            name,
            website,
            cnpj,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        toast.success('Empresa cadastrado!');
      }

      updateCompanies();
      reset({});
      closeModal();
    } catch (error: any) {
      toast.error(String(error.response.data.message));
    }
  }

  function formatCNPJ() {
    const item = document.querySelector<HTMLInputElement>('#cnpj');
    if (item) {
      formatText('##.###.###/####-##', item);
    }
  }

  const title =
    companyIndex !== null && companyIndex !== undefined && companies
      ? `Editar: ${companies[companyIndex].name}`
      : `add`;

  return (
    <>
      <Modal open={isModalOpened} onClose={closeModal}>
        <ModalBox>
          <header>
            <strong>{title === 'add' ? `Adicionar Empresa` : title}</strong>
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
                id="website"
                label="Website"
                variant="outlined"
                {...register('website')}
                error={!!errors.website}
                helperText={errors.website && errors.website.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Language />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="cnpj"
                label="CNPJ"
                onKeyPress={formatCNPJ}
                variant="outlined"
                {...register('cnpj')}
                error={!!errors.cnpj}
                helperText={errors.cnpj && errors.cnpj.message}
                InputProps={{
                  inputProps: { maxLength: 18 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business />
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
