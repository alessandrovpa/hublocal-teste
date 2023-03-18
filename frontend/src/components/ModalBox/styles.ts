import { Box } from '@mui/material';
import styled from 'styled-components';

interface ModalBoxContainerProps {
  modalType: 'create' | 'delete';
}

export const ModalBoxContainer = styled(Box)<ModalBoxContainerProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background: white;
  border-radius: 8px;

  header {
    border-radius: 8px 8px 0 0;
    background: ${(props) =>
      props.modalType === 'create' ? '#0385fd' : '#C90808'};
    color: white;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: transparent;
      border: 0;
      color: white;
      font-size: 0;
    }
  }

  form {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    > div {
      display: flex;
      justify-content: space-between;
    }
  }
`;
