import type { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface BodyTextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

const Root = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: clamp(0.96rem, 1.2vw, 1.02rem);
  line-height: 1.68;
  max-width: 66ch;
`;

export function BodyText({ children, ...rest }: BodyTextProps) {
  return <Root {...rest}>{children}</Root>;
}
