import { RegisterButton, SignInContainer } from './styles';
import { TextField, InputAdornment, Button } from '@mui/material';
import { Mail, Key, Login, HowToReg } from '@mui/icons-material';
import HubLocal from '../../assets/hublocal.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { animated, useSpring } from '@react-spring/web';

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Formato de e-mail inválido' })
    .nonempty({ message: 'Preencha um email' }),
  password: z.string().nonempty({ message: 'Preencha uma senha' }),
});

type LoginInputs = z.infer<typeof loginSchema>;

export function SignIn() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  async function handleSubmitLogin({ email, password }: LoginInputs) {
    login({ email, password });
  }

  const animation = useSpring({
    from: { transform: 'translate(100px, 0px)', opacity: 0 },
    to: { transform: 'translate(0px, 0px)', opacity: 1 },
  });

  return (
    <SignInContainer as={animated.div} style={animation}>
      <figure>
        <img src={HubLocal} alt="hublocal logo" />
      </figure>
      <form onSubmit={handleSubmit(handleSubmitLogin)}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          autoFocus
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
          label="Password"
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

        <Button
          variant="contained"
          size="large"
          endIcon={<Login />}
          type="submit"
        >
          LOGAR
        </Button>

        <Link to="/signup">
          <RegisterButton
            variant="contained"
            size="large"
            disabled={isSubmitting}
            endIcon={<HowToReg />}
            fullWidth
          >
            CRIAR CONTA
          </RegisterButton>
        </Link>
      </form>
    </SignInContainer>
  );
}
