import styled from 'styled-components';

export const ProfileContainer = styled.div`
  background: #eaeaea;
  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  svg {
    transform: scale(1.5);
  }

  &:hover {
    cursor: pointer;
    background: #f5f5f5;
  }
`;
