import { useMemo } from 'react';
import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import { BodyText } from '../../../components/ui/BodyText';
import { MediaSequenceControls } from '../../../components/ui/MediaSequenceControls';
import type { ProjectDeckPage } from '../../../features/spatial/projectPages';
import {
  PanelChapterIndex as ChapterIndex,
  PanelDetailBody as DetailBody,
  PanelDetailCard as DetailCard,
  PanelDetailLabel as DetailLabel,
  PanelStoryHeader as StoryHeader,
  PanelStoryScroll as StoryScroll,
  PanelStoryTitleBase as StoryTitleBase
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

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: auto;
  }
`;

const StoryTitle = styled(StoryTitleBase)`
  max-width: 9.1ch;
  font-size: clamp(1.35rem, calc(2.05rem * var(--architecture-scale)), 2.05rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 11.5ch;
    font-size: clamp(1.28rem, 6.4vw, 1.82rem);
  }
`;

const StoryFlow = styled(StoryScroll)`
  max-width: clamp(16rem, calc(28rem * var(--architecture-scale)), 28rem);
  height: 100%;
  gap: max(0.56rem, calc(0.7rem * var(--architecture-scale)));
  overflow: auto;
  padding-right: 0.1rem;
  max-height: none;
`;

const PreviewViewport = styled.div`
  width: min(100%, clamp(23rem, calc(39rem * var(--architecture-scale)), 39rem));
  height: min(100%, clamp(12rem, calc(21rem * var(--architecture-scale)), 21rem));
  min-height: 0;
  display: grid;
  align-items: center;
  justify-items: center;
  justify-self: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    height: clamp(12rem, 30vh, 18rem);
    max-width: 40rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    height: min(100%, clamp(10rem, calc(16rem * var(--architecture-scale)), 16rem));
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

  ${DetailLabel} {
    font-size: max(0.56rem, calc(0.64rem * var(--architecture-scale)));
    letter-spacing: 0.1em;
  }

  ${DetailBody} {
    font-size: max(0.74rem, calc(0.8rem * var(--architecture-scale)));
    line-height: 1.46;
  }

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
            <BodyText key={`${activePage.id}-paragraph-${index}`}>{paragraph}</BodyText>
          ))}
        </StoryFlow>
      </StoryColumn>

      <VisualColumn>
        <PreviewViewport>
          <ResponsiveMedia
            asset={mediaItems[mediaIndex] ?? activePage.media}
            fit="contain"
            frameSizing="fit-media"
            priority={isActive}
            surfaceVariant="framed"
          />
        </PreviewViewport>

        {mediaItems.length > 1 ? (
          <MediaSequenceControls
            onNext={onNextImage}
            onPrevious={onPreviousImage}
          />
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
