import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 38px;
  text-align: center;
  margin-bottom: 25px;
  font-weight: lighter;
`;
