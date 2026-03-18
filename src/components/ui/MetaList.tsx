import styled from 'styled-components';

interface MetaListProps {
  items: string[];
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: 0.34rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.35rem;
  }
`;

const Item = styled.li`
  padding: 0.38rem 0.72rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.02);
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;
  letter-spacing: -0.01em;

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    padding: 0.3rem 0.56rem;
    font-size: 0.68rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.34rem 0.6rem;
    font-size: 0.7rem;
  }
`;

export function MetaList({ items }: MetaListProps) {
  return (
    <List>
      {items.map((item) => (
        <Item key={item}>{item}</Item>
      ))}
    </List>
  );
}
