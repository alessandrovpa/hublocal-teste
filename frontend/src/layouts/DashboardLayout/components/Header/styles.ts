import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;

  div {
    padding: 1rem;
    h2 {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }
    @media (max-width: 768px) {
      font-size: 0.7rem;
      padding: 0.5rem;
    }
  }
`;
