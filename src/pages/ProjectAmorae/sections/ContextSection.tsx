import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import { BodyText } from '../../../components/ui/BodyText';
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

interface ContextSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
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
  gap: 1rem;
  align-content: start;
`;

const MediaViewport = styled.div`
  width: min(100%, 50rem);
  height: min(35vh, 22rem);
  display: grid;
  align-items: center;
  justify-items: center;
  justify-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: min(28vh, 16rem);
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    height: min(26vh, 14rem);
  }
`;

const HorizontalCards = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(14rem, 1fr);
  gap: 0.6rem;
  overflow-x: auto;
  padding-bottom: 0.15rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-auto-columns: minmax(18rem, 60vw);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-auto-columns: minmax(14.5rem, 80vw);
  }
`;

const ContextCard = styled(DetailCard)`
  gap: 0.2rem;
  height: auto;
  min-height: auto;
  align-self: start;
  align-content: start;
  grid-auto-rows: max-content;

  ${DetailLabel} {
    display: block;
    margin: 0;
  }

  ${DetailBody} {
    margin: 0;
  }
`;

export function ContextSection({
  activePage,
  isActive
}: ContextSectionProps) {
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
        <MediaViewport>
          <ResponsiveMedia
            asset={activePage.media}
            fit="contain"
            frameSizing="fit-media"
            priority={isActive}
            surfaceVariant="framed"
          />
        </MediaViewport>

        {activePage.details.length ? (
          <HorizontalCards data-spatial-scroll-lock>
            {activePage.details.map((item) => (
              <ContextCard key={`${activePage.id}-${item.label}`} $compact={false}>
                <DetailLabel>{item.label}</DetailLabel>
                <DetailBody $compact={false}>{item.value}</DetailBody>
              </ContextCard>
            ))}
          </HorizontalCards>
        ) : null}
      </ContentColumn>
    </Layout>
  );
}
