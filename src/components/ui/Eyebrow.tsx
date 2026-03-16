import type { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const Root = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export function Eyebrow({ children, ...rest }: EyebrowProps) {
  return <Root {...rest}>{children}</Root>;
}
