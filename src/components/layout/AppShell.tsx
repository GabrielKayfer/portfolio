import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface AppShellProps {
  brandName: string;
  brandRole: string;
  children: ReactNode;
}

const SkipLink = styled.a`
  position: absolute;
  top: -3rem;
  left: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.layers.overlay};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentContrast};

  &:focus {
    top: ${({ theme }) => theme.spacing.md};
  }
`;

const Shell = styled.div`
  position: relative;
  min-height: 100svh;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.layers.header};
  display: flex;
  justify-content: flex-start;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.85rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.7rem;
  }
`;

const HeaderSurface = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0.5rem 0.78rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.9rem;
  backdrop-filter: blur(18px);
  background: rgba(8, 8, 8, 0.38);
  pointer-events: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 0.55rem;
    padding: 0.44rem 0.68rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.45rem;
    padding: 0.42rem 0.62rem;
    border-radius: 1.45rem;
  }
`;

const BrandLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.35rem;
  }
`;

const BrandName = styled.span`
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 700;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.94rem;
  }
`;

const BrandRole = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const Divider = styled.span`
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const Main = styled.main`
  min-height: 100svh;
`;

export function AppShell({
  brandName,
  brandRole,
  children
}: AppShellProps) {
  return (
    <>
      <SkipLink href="#main-content">Pular para o conteudo</SkipLink>
      <Shell>
        <Header>
          <HeaderSurface>
            <BrandLink to="/">
              <BrandName>{brandName}</BrandName>
              <Divider aria-hidden="true" />
              <BrandRole>{brandRole}</BrandRole>
            </BrandLink>
          </HeaderSurface>
        </Header>

        <Main id="main-content">{children}</Main>
      </Shell>
    </>
  );
}
