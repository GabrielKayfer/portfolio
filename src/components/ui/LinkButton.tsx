import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { buttonStyles } from './buttonStyles';

type ButtonVariant = 'primary' | 'secondary';

interface LinkButtonProps {
  children: ReactNode;
  href: string;
  external?: boolean;
  variant?: ButtonVariant;
}

const InternalLink = styled(Link)<{ $variant: ButtonVariant }>`
  ${buttonStyles}
`;

const ExternalLink = styled.a<{ $variant: ButtonVariant }>`
  ${buttonStyles}
`;

export function LinkButton({
  children,
  href,
  external,
  variant = 'primary'
}: LinkButtonProps) {
  if (href.startsWith('#')) {
    return (
      <ExternalLink $variant={variant} href={href}>
        {children}
      </ExternalLink>
    );
  }

  if (external) {
    return (
      <ExternalLink
        $variant={variant}
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </ExternalLink>
    );
  }

  return (
    <InternalLink $variant={variant} to={href}>
      {children}
    </InternalLink>
  );
}
