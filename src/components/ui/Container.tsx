import type { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

type ContainerWidth = 'content' | 'wide' | 'narrow';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  width?: ContainerWidth;
}

const Root = styled.div<{ $width: ContainerWidth }>`
  width: ${({ theme, $width }) => theme.width[$width]};
  margin-inline: auto;
`;

export function Container({ children, width = 'content', ...rest }: ContainerProps) {
  return (
    <Root $width={width} {...rest}>
      {children}
    </Root>
  );
}
