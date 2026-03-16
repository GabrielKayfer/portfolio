import styled from 'styled-components';
import { BodyText } from '../../../components/ui/BodyText';

export const PanelStoryHeader = styled.div`
  display: grid;
  gap: 0.45rem;
  max-width: 30rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.35rem;
    max-width: none;
  }
`;

export const PanelChapterIndex = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const PanelStoryTitleBase = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  line-height: 0.98;
  letter-spacing: -0.065em;
`;

export const PanelStoryScroll = styled.div`
  min-height: 0;
  display: grid;
  align-content: start;
  gap: 0.85rem;
  overflow: auto;
  padding-right: 0.15rem;
  max-width: 32rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-height: 30vh;
    max-width: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.7rem;
    max-height: 26vh;
  }
`;

export const PanelMediaHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: start;
  gap: 0.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.55rem;
  }
`;

export const PanelDetailCard = styled.article<{ $compact: boolean }>`
  display: grid;
  gap: ${({ $compact }) => ($compact ? '0.22rem' : '0.35rem')};
  min-height: 100%;
  padding: ${({ $compact }) =>
    $compact ? '0.56rem 0.64rem' : '0.78rem 0.85rem'};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.012);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ $compact }) =>
      $compact ? '0.5rem 0.56rem' : '0.68rem 0.74rem'};
    border-radius: 0.95rem;
  }
`;

export const PanelDetailLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const PanelDetailBody = styled(BodyText)<{ $compact: boolean }>`
  font-size: ${({ $compact }) => ($compact ? '0.81rem' : '0.92rem')};
  line-height: ${({ $compact }) => ($compact ? '1.5' : '1.7')};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ $compact }) => ($compact ? '0.78rem' : '0.88rem')};
    line-height: ${({ $compact }) => ($compact ? '1.45' : '1.62')};
  }
`;
