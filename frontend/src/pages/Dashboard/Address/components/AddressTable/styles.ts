import styled from 'styled-components';
import { Paper } from '@mui/material';

export const StyledPaper = styled(Paper)`
  th,
  p,
  div {
    font-weight: bold;
  }

  button {
    background: transparent;
    border: 0;
  }

  tbody tr {
    &:hover {
      background: #eaeaea;
    }
  }
`;
