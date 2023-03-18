import styled from 'styled-components';
import { Button } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';

export const SignInContainer = styled.div`
  width: 70%;

  figure {
    text-align: center;
    padding: 1rem;
    img {
      max-width: 100%;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const RegisterButton = muiStyled(Button)(() => ({
  backgroundColor: '#00cc99',
  '&:hover': {
    backgroundColor: '#00A37A',
  },
}));
