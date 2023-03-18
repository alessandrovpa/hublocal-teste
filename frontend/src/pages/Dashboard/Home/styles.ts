import styled, { css } from 'styled-components';

export const DashboardContainer = styled.div`
  width: 70%;
`;

interface DashboardContentProps {
  isFilled?: boolean;
}

export const DashboardContent = styled.main<DashboardContentProps>`
  display: flex;
  gap: 1rem;
  text-align: center;

  ${(props) =>
    props.isFilled
      ? css`
          flex-direction: column;
          align-items: flex-end;
        `
      : css`
          flex-direction: column-reverse;
          align-items: center;
        `}

  > button {
    width: 30%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
