import { useMemo } from 'react';
import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import { MediaSequenceControls } from '../../../components/ui/MediaSequenceControls';
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

interface ArchitectureSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
  mediaIndex: number;
  onNextImage: () => void;
  onPreviousImage: () => void;
}

const isDefined = <T,>(value: T | undefined): value is T => value !== undefined;

const Layout = styled.div`
  --architecture-scale-width: clamp(0.74, calc(100vw / 1920px), 1);
  --architecture-scale-height: clamp(0.6, calc(100svh / 945px), 1);
  --architecture-scale: min(
    var(--architecture-scale-width),
    var(--architecture-scale-height)
  );

  position: relative;
  z-index: 1;
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(16rem, 0.72fr) minmax(18rem, 1fr) minmax(18rem, 1fr);
  gap: max(0.82rem, calc(1rem * var(--architecture-scale)));
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns:
      minmax(14rem, 0.66fr)
      minmax(16rem, 1fr)
      minmax(16rem, 1fr);
    gap: max(0.72rem, calc(0.9rem * var(--architecture-scale)));
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
  gap: max(0.72rem, calc(0.92rem * var(--architecture-scale)));
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    height: auto;
  }
`;

const VisualColumn = styled.section`
  grid-column: 2 / 4;
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto auto;
  gap: max(0.62rem, calc(0.82rem * var(--architecture-scale)));
  align-content: stretch;
  justify-items: end;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    height: auto;
    justify-items: stretch;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: auto;
  }
`;

const StoryTitle = styled(SectionOpening)`
  max-width: 9.1ch;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 11.5ch;
  }
`;

const StoryFlow = styled(StoryScroll)`
  max-width: clamp(16rem, calc(28rem * var(--architecture-scale)), 28rem);
  height: 100%;
  gap: max(0.56rem, calc(0.7rem * var(--architecture-scale)));
  overflow: visible;
  padding-right: 0;
  max-height: none;
`;

const PreviewViewport = styled.div`
  width: 100%;
  min-height: 0;
  height: 100%;
  display: grid;
  align-items: stretch;
  justify-items: stretch;
  justify-self: stretch;
  align-self: stretch;
  padding-right: max(0.82rem, calc(1.1rem * var(--architecture-scale)));
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
    width: 100%;
    height: clamp(12rem, 30vh, 18rem);
    max-width: 40rem;
    padding-right: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    min-height: clamp(10rem, calc(16rem * var(--architecture-scale)), 16rem);
  }
`;

const ControlRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: max(0.82rem, calc(1.1rem * var(--architecture-scale)));

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-right: 0;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: max(0.5rem, calc(0.62rem * var(--architecture-scale)));
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ArchitectureCard = styled(DetailCard)`
  min-height: auto;
  gap: max(0.18rem, calc(0.22rem * var(--architecture-scale)));
  padding:
    max(0.54rem, calc(0.62rem * var(--architecture-scale)))
    max(0.6rem, calc(0.7rem * var(--architecture-scale)));

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.6rem 0.66rem;
  }
`;

export function ArchitectureSection({
  activePage,
  isActive,
  mediaIndex,
  onNextImage,
  onPreviousImage
}: ArchitectureSectionProps) {
  const mediaItems = useMemo(
    () => [activePage.media, ...(activePage.gallery ?? [])],
    [activePage.gallery, activePage.media]
  );
  const rightDetails = useMemo(
    () => [activePage.details[3], activePage.details[2]].filter(isDefined),
    [activePage.details]
  );

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

      <VisualColumn>
        <PreviewViewport>
          <ResponsiveMedia
            asset={mediaItems[mediaIndex] ?? activePage.media}
            fit="cover"
            frameSizing="viewport-fill"
            cornerStyle="card"
            objectPosition="top right"
            priority={isActive}
            surfaceVariant="framed"
          />
        </PreviewViewport>

        {mediaItems.length > 1 ? (
          <ControlRow>
            <MediaSequenceControls
              onNext={onNextImage}
              onPrevious={onPreviousImage}
            />
          </ControlRow>
        ) : null}

        {rightDetails.length ? (
          <DetailGrid>
            {rightDetails.map((item) => (
              <ArchitectureCard key={`${activePage.id}-${item.label}`} $compact>
                <DetailLabel>{item.label}</DetailLabel>
                <DetailBody $compact>{item.value}</DetailBody>
              </ArchitectureCard>
            ))}
          </DetailGrid>
        ) : null}
      </VisualColumn>
    </Layout>
  );
}
