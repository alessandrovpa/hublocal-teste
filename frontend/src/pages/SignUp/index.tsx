import { LoginButton, SignUpContainer } from './styles';
import { TextField, InputAdornment, Button } from '@mui/material';
import { Mail, Key, Login, HowToReg, Badge } from '@mui/icons-material';
import HubLocal from '../../assets/hublocal.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../services/axios';
import { toast } from 'react-toastify';
import { animated, useSpring } from '@react-spring/web';

const signupSchema = z
  .object({
    name: z.string().nonempty({ message: 'Preencha um nome' }),
    email: z
      .string()
      .email({ message: 'Formato de e-mail inválido' })
      .nonempty({ message: 'Preencha um email' }),
    password: z.string().nonempty({ message: 'Preencha uma senha' }),
    confirmPassword: z.string().nonempty({ message: 'Confirme sua senha' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senha de confirmação diferente!',
    path: ['confirmPassword'],
  });

type SignupInputs = z.infer<typeof signupSchema>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
  });

  async function handleSubmitSignup({ name, email, password }: SignupInputs) {
    try {
      await api.post('/user', {
        name,
        email,
        password,
      });
      toast.success('Usuário criado com sucesso!');
      navigate('/');
    } catch (error: any) {
      toast.error(String(error.response.data.message));
    }
  }

  const animation = useSpring({
    from: { transform: 'translate(70px, 0px)', opacity: 0 },
    to: { transform: 'translate(0px, 0px)', opacity: 1 },
  });

  return (
    <SignUpContainer as={animated.div} style={animation}>
      <figure>
        <img src={HubLocal} alt="hublocal logo" />
      </figure>
      <form onSubmit={handleSubmit(handleSubmitSignup)}>
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
                <Badge />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="password"
          label="Senha"
          variant="outlined"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="confirmPassword"
          label="Repetir Senha"
          variant="outlined"
          type="password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Key />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          size="large"
          endIcon={<HowToReg />}
          type="submit"
          disabled={isSubmitting}
        >
          REGISTRAR
        </Button>

        <Link to="/">
          <LoginButton
            variant="contained"
            size="large"
            endIcon={<Login />}
            fullWidth
          >
            LOGAR
          </LoginButton>
        </Link>
      </form>
    </SignUpContainer>
  );
}
