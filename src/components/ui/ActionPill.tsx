import styled, { css } from 'styled-components';

const actionPillStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  max-width: 100%;
  cursor: pointer;
  min-height: 2.25rem;
  padding: 0.45rem 0.72rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(8, 8, 8, 0.54);
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(14px);
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
  transition:
    border-color 180ms ease,
    background 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease,
    opacity 180ms ease,
    transform 180ms ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.34);
    background: rgba(8, 8, 8, 0.72);
    color: ${({ theme }) => theme.colors.text};
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.2);
    opacity: 0.9;
    transform: translateY(-0.08rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 2.1rem;
    padding: 0.42rem 0.66rem;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    min-height: 2rem;
    padding: 0.38rem 0.6rem;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 2rem;
    padding: 0.38rem 0.58rem;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
  }
`;

export const ActionPillLink = styled.a`
  ${actionPillStyles}
`;

export const ActionPillButton = styled.button`
  ${actionPillStyles}
`;
