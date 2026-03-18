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

interface ExperienceSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
  mediaIndex: number;
  onNextImage: () => void;
  onPreviousImage: () => void;
}

const Layout = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(19rem, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(1rem, 1.4vw, 1.4rem);
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: minmax(17rem, 0.74fr) minmax(0, 1.26fr);
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.85rem;
  }
`;

const StoryColumn = styled.section`
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 1rem;
`;

const StoryTitle = styled(StoryTitleBase)`
  max-width: 10.4ch;
  font-size: clamp(1.7rem, 2.7vw, 2.5rem);
`;

const StoryFlow = styled(StoryScroll)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-height: none;
  }
`;

const ContentColumn = styled.section`
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto;
  gap: 0.8rem;
  align-content: start;
`;

const MediaStage = styled.div`
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto;
  gap: 0.45rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

const MediaViewport = styled.div`
  width: min(100%, 46rem);
  height: min(32vh, 19.5rem);
  display: grid;
  align-items: center;
  justify-items: center;
  justify-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: min(26vh, 15rem);
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    height: min(24vh, 13rem);
  }
`;

const ConstructionCard = styled(DetailCard)`
  width: min(100%, 36rem);
  height: auto;
  min-height: auto;
  justify-self: start;
  align-self: start;
  align-content: start;
  grid-auto-rows: max-content;
  gap: 0.24rem;

  ${DetailLabel} {
    display: block;
    margin: 0;
  }

  ${DetailBody} {
    margin: 0;
  }
`;

export function ExperienceSection({
  activePage,
  isActive,
  mediaIndex,
  onNextImage,
  onPreviousImage
}: ExperienceSectionProps) {
  const media = [activePage.media, ...(activePage.gallery ?? [])].slice(0, 3);
  const detail = activePage.details[0] ?? null;

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

      <ContentColumn>
        <MediaStage>
          <MediaViewport>
            <ResponsiveMedia
              asset={media[mediaIndex] ?? activePage.media}
              fit="contain"
              frameSizing="fit-media"
              priority={isActive}
              surfaceVariant="framed"
            />
          </MediaViewport>

          {media.length > 1 ? (
            <MediaSequenceControls
              onNext={onNextImage}
              onPrevious={onPreviousImage}
            />
          ) : null}
        </MediaStage>

        {detail ? (
          <ConstructionCard $compact={false}>
            <DetailLabel>{detail.label}</DetailLabel>
            <DetailBody $compact={false}>{detail.value}</DetailBody>
          </ConstructionCard>
        ) : null}
      </ContentColumn>
    </Layout>
  );
}
