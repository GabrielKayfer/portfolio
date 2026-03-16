import type { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { Container } from './Container';

type SectionTone = 'default' | 'elevated';
type ContainerWidth = 'content' | 'wide' | 'narrow';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  width?: ContainerWidth;
  tone?: SectionTone;
}

const Root = styled.section<{ $tone: SectionTone }>`
  padding-block: ${({ theme }) => theme.spacing.section};
  scroll-margin-top: 6rem;
  background: ${({ $tone }) =>
    $tone === 'elevated'
      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0))'
      : 'transparent'};
`;

export function Section({
  children,
  width = 'content',
  tone = 'default',
  ...rest
}: SectionProps) {
  return (
    <Root $tone={tone} {...rest}>
      <Container width={width}>{children}</Container>
    </Root>
  );
}
