import type { ReactNode } from 'react';
import styled from 'styled-components';

interface TagProps {
  children: ReactNode;
  className?: string;
}

const Root = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding-inline: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.02);
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export function Tag({ children, className }: TagProps) {
  return <Root className={className}>{children}</Root>;
}
