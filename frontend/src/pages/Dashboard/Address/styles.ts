import styled, { css } from 'styled-components';

export const CompanyContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const BackContainer = styled.div`
  width: 100%;
  a {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
`;

interface CompanyContentProps {
  isFilled?: boolean;
}

export const CompanyContent = styled.div<CompanyContentProps>`
  gap: 1rem;
  display: flex;
  justify-content: center;
  width: 70%;
  height: 100%;

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

  > div {
    ${(props) =>
      props.isFilled
        ? css`
            justify-content: space-between;
          `
        : css`
            justify-content: center;
          `}
  }
`;

export const HeaderTable = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;
