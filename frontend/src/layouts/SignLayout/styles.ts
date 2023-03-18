import styled from 'styled-components';

export const SignContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const DescriptionContent = styled.div`
  background: #0485ff;
  height: 100vh;

  figure {
    height: 75%;
    img {
      height: 100%;
      width: 100%;
    }
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 25%;
    padding: 1rem;
    background: #00cc99;
    color: white;
    text-align: center;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const OutletContent = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
