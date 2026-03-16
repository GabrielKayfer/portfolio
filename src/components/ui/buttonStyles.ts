import { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary';

export const buttonStyles = css<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 2.65rem;
  padding-inline: 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'primary' ? theme.colors.accentStrong : theme.colors.border};
  background: ${({ $variant }) =>
    $variant === 'primary'
      ? 'rgba(245, 242, 238, 0.95)'
      : 'rgba(255, 255, 255, 0.02)'};
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.accentContrast : theme.colors.text};
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  letter-spacing: -0.01em;
  box-shadow: ${({ theme, $variant }) =>
    $variant === 'primary' ? `0 10px 24px ${theme.colors.shadow}` : 'none'};
  transition:
    transform ${({ theme }) => theme.motion.duration.fast}s ease,
    border-color ${({ theme }) => theme.motion.duration.fast}s ease,
    background ${({ theme }) => theme.motion.duration.fast}s ease,
    color ${({ theme }) => theme.motion.duration.fast}s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.accentStrong};
    background: ${({ $variant }) =>
      $variant === 'primary'
        ? '#ffffff'
        : 'rgba(255, 255, 255, 0.06)'};
  }
`;
