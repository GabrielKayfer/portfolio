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
  height: 100%;
  display: grid;
  grid-template-columns: minmax(19rem, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(1rem, 1.4vw, 1.4rem);
  align-items: stretch;

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
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 1rem;
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: auto;
  }
`;

const StoryTitle = styled(SectionOpening)`
  max-width: 10.4ch;
`;

const StoryFlow = styled(StoryScroll)`
  width: 100%;
  overflow: visible;
  padding-right: 0;
  max-height: none;
  max-width: none;
`;

const ContentColumn = styled.section`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.8rem;
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: auto;
  }
`;

const MediaStage = styled.div`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.45rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: auto;
  }
`;

const MediaViewport = styled.div`
  width: 100%;
  min-height: 0;
  height: 100%;
  display: grid;
  align-items: stretch;
  justify-items: stretch;
  justify-self: stretch;
  align-self: stretch;
  overflow: hidden;

  & > figure {
    min-height: 0;
    height: 100%;
    width: 100%;
  }

  & > figure > div {
    max-height: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: clamp(12rem, 28vh, 16rem);
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    min-height: clamp(10rem, 24vh, 13rem);
  }
`;

const ConstructionCard = styled(DetailCard)`
  width: 100%;
  height: auto;
  min-height: auto;
  justify-self: stretch;
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
            <SectionSummary key={`${activePage.id}-paragraph-${index}`}>
              {paragraph}
            </SectionSummary>
          ))}
        </StoryFlow>
      </StoryColumn>

      <ContentColumn>
        <MediaStage>
          <MediaViewport>
            <ResponsiveMedia
              asset={media[mediaIndex] ?? activePage.media}
              fit="cover"
              frameSizing="viewport-fill"
              cornerStyle="card"
              objectPosition="center center"
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
