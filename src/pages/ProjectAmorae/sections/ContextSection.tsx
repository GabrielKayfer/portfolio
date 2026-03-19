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

interface ContextSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
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
  width: 100%;
  justify-self: stretch;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 1rem;
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
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
  align-self: start;
  overflow: hidden;

  & > figure {
    width: 100%;
    height: 100%;
    min-height: 0;
  }

  & > figure > div {
    max-height: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const HorizontalCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
  width: 100%;
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
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
            <SectionSummary key={`${activePage.id}-paragraph-${index}`}>
              {paragraph}
            </SectionSummary>
          ))}
        </StoryFlow>
      </StoryColumn>

      <ContentColumn>
        <MediaViewport>
          <ResponsiveMedia
            asset={activePage.media}
            fit="cover"
            frameSizing="viewport-fill"
            cornerStyle="card"
            objectPosition="center center"
            priority={isActive}
            surfaceVariant="framed"
          />
        </MediaViewport>

        {activePage.details.length ? (
          <HorizontalCards>
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
