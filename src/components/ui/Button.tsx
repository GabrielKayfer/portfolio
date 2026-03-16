import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { buttonStyles } from './buttonStyles';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const Root = styled.button<{ $variant: ButtonVariant }>`
  ${buttonStyles}
`;

export function Button({ children, variant = 'primary', ...rest }: ButtonProps) {
  return (
    <Root $variant={variant} {...rest}>
      {children}
    </Root>
  );
}
