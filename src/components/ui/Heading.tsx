import type { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'hero' | 'xl' | 'lg';
}

const sizeMap = {
  hero: 'hero',
  xl: 'xl',
  lg: 'lg'
} as const;

const Root = styled.h2<{ $size: keyof typeof sizeMap }>`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: ${({ theme, $size }) => theme.typography.sizes[sizeMap[$size]]};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  letter-spacing: -0.04em;
`;

export function Heading({ children, as = 'h2', size = 'xl', ...rest }: HeadingProps) {
  return (
    <Root as={as} $size={size} {...rest}>
      {children}
    </Root>
  );
}
