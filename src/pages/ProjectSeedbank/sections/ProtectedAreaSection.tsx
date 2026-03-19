import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import type { ProjectDeckPage } from '../../../features/spatial/projectPages';
import {
  PanelChapterIndex as ChapterIndex,
  PanelDetailBody as DetailBody,
  PanelDetailCard as DetailCard,
  PanelDetailLabel as DetailLabel,
  PanelStoryHeader as StoryHeader,
  PanelStoryScroll as StoryScroll,
  ProjectSectionOpening as SectionOpening,
  ProjectSectionSummary as SectionSummary
} from '../../../components/ui/ProjectPagePrimitives';

interface ProtectedAreaSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
}

const Layout = styled.div`
  --protected-scale-width: clamp(0.74, calc(100vw / 1920px), 1);
  --protected-scale-height: clamp(0.6, calc(100svh / 945px), 1);
  --protected-scale: min(var(--protected-scale-width), var(--protected-scale-height));
  --protected-media-card-gap: 0.55rem;

  position: relative;
  z-index: 1;
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(16rem, 0.72fr) minmax(18rem, 1fr) minmax(18rem, 1fr);
  gap: max(0.82rem, calc(1rem * var(--protected-scale)));
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns:
      minmax(14rem, 0.66fr)
      minmax(16rem, 1fr)
      minmax(16rem, 1fr);
    gap: max(0.72rem, calc(0.9rem * var(--protected-scale)));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

const StoryColumn = styled.section`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: max(0.72rem, calc(0.92rem * var(--protected-scale)));
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    height: auto;
  }
`;

const StoryTitle = styled(SectionOpening)`
  max-width: 12.4ch;
`;

const StoryFlow = styled(StoryScroll)`
  max-width: clamp(16rem, calc(28rem * var(--protected-scale)), 28rem);
  height: 100%;
  gap: max(0.56rem, calc(0.7rem * var(--protected-scale)));
  overflow: visible;
  padding-right: 0;
  max-height: none;
`;

const ImageColumn = styled.section`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: var(--protected-media-card-gap);
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: var(--protected-media-card-gap);
    height: auto;
  }
`;

const MediaViewport = styled.div<{ $compact: boolean }>`
  width: 100%;
  min-height: 0;
  height: 100%;
  display: grid;
  align-items: stretch;
  justify-items: stretch;
  justify-self: stretch;
  overflow: hidden;

  & > figure {
    min-height: 0;
    height: 100%;
    width: 100%;
  }

  & > figure > div {
    max-height: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: ${({ $compact }) =>
      $compact ? 'min(26vh, 15.5rem)' : 'min(30vh, 18rem)'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: ${({ $compact }) =>
      $compact ? 'min(23vh, 13rem)' : 'min(26vh, 15rem)'};
  }
`;

const ProtectedCard = styled(DetailCard)`
  width: 100%;
  justify-self: stretch;
  min-height: auto;
  gap: max(0.18rem, calc(0.22rem * var(--protected-scale)));
  padding:
    max(0.54rem, calc(0.62rem * var(--protected-scale)))
    max(0.6rem, calc(0.7rem * var(--protected-scale)));

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.6rem 0.66rem;
  }
`;

export function ProtectedAreaSection({
  activePage,
  isActive
}: ProtectedAreaSectionProps) {
  const media = [...(activePage.gallery ?? []).slice(0, 1), activePage.media];
  const details = activePage.details.slice(0, 2);

  return (
    <Layout>
      <StoryColumn>
        <StoryHeader>
          <ChapterIndex>{activePage.eyebrow}</ChapterIndex>
          <StoryTitle>{activePage.title}</StoryTitle>
        </StoryHeader>

        <StoryFlow data-spatial-scroll-lock>
          {activePage.body.map((paragraph, index) => (
            <SectionSummary key={`${activePage.id}-paragraph-${index}`}>
              {paragraph}
            </SectionSummary>
          ))}
        </StoryFlow>
      </StoryColumn>

      {media.map((asset, index) => (
        <ImageColumn key={`${activePage.id}-${asset.src}-${index}`}>
          <MediaViewport $compact={index === 1}>
            <ResponsiveMedia
              asset={asset}
              fit="cover"
              frameSizing="viewport-fill"
              cornerStyle="card"
              objectPosition="top center"
              priority={index === 0 ? isActive : false}
              surfaceVariant="framed"
            />
          </MediaViewport>

          {details[index] ? (
            <ProtectedCard $compact>
              <DetailLabel>{details[index].label}</DetailLabel>
              <DetailBody $compact>{details[index].value}</DetailBody>
            </ProtectedCard>
          ) : null}
        </ImageColumn>
      ))}
    </Layout>
  );
}
