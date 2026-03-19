import styled from 'styled-components';
import { BodyText } from './BodyText';

export const PanelStoryHeader = styled.div`
  display: grid;
  gap: 0.45rem;
  max-width: 34rem;

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
  max-width: 34rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-height: 30vh;
    max-width: none;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    max-height: 24vh;
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
  font-size: var(--project-section-card-label-size);
  letter-spacing: var(--project-section-card-label-spacing);
  text-transform: uppercase;
`;

export const PanelDetailBody = styled(BodyText)<{ $compact: boolean }>`
  margin: 0;
  font-size: ${({ $compact }) =>
    $compact
      ? 'var(--project-section-card-body-compact-size)'
      : 'var(--project-section-card-body-size)'};
  line-height: ${({ $compact }) =>
    $compact
      ? 'var(--project-section-card-body-compact-line)'
      : 'var(--project-section-card-body-line)'};
`;

export const ProjectSectionOpening = styled(PanelStoryTitleBase)`
  font-size: var(--project-section-opening-size);
  line-height: var(--project-section-opening-line);
`;

export const ProjectSectionSummary = styled(BodyText)`
  margin: 0;
  max-width: none;
  font-size: var(--project-section-summary-size);
  line-height: var(--project-section-summary-line);
`;

export const ProjectOverviewTitle = styled(PanelStoryTitleBase)`
  font-size: var(--project-opening-size);
`;

export const ProjectSummaryText = styled(BodyText)`
  margin: 0;
  font-size: var(--project-summary-size);
  line-height: var(--project-summary-line);
`;

export const ProjectOverviewCardTitle = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: var(--project-card-title-size);
  line-height: var(--project-card-title-line);
  letter-spacing: -0.03em;
`;

export const ProjectOverviewCardBody = styled(BodyText)`
  margin: 0;
  max-width: none;
  font-size: var(--project-card-body-size);
  line-height: var(--project-card-body-line);
`;

export const ProjectStackLine = styled.p`
  margin: 0;
  max-width: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.625rem;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
