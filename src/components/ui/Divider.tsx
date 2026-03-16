import styled from 'styled-components';

export const Divider = styled.hr`
  height: 1px;
  margin: 0;
  border: 0;
  background: ${({ theme }) => theme.colors.divider};
`;
