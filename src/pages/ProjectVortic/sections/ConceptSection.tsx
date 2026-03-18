import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import { BodyText } from '../../../components/ui/BodyText';
import type { ProjectDeckPage } from '../../../features/spatial/projectPages';
import {
  PanelChapterIndex as ChapterIndex,
  PanelDetailBody as DetailBody,
  PanelDetailCard as DetailCard,
  PanelStoryHeader as StoryHeader,
  PanelStoryScroll as StoryScroll,
  PanelStoryTitleBase as StoryTitleBase
} from '../../../components/ui/ProjectPagePrimitives';

interface ConceptSectionProps {
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
  gap: 0.8rem;
  align-content: start;

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: 0.7rem;
  }
`;

const MediaViewport = styled.div`
  min-height: 0;
  display: grid;
  align-items: center;
  justify-items: center;
  height: min(34vh, 20rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: min(28vh, 16rem);
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    height: min(24vh, 13rem);
  }
`;

const NoteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1.5rem;
  row-gap: 0.9rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const NoteCard = styled(DetailCard)`
  min-height: auto;
`;

const QuoteCard = styled(NoteCard)`
  grid-column: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1;
  }
`;

export function ConceptSection({
  activePage,
  isActive
}: ConceptSectionProps) {
  const conceptClosingText = activePage.details[0]?.value ?? null;
  const conceptQuoteText = activePage.details[1]?.value ?? null;

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
            surfaceVariant="plain"
          />
        </MediaViewport>

        {(conceptClosingText || conceptQuoteText) ? (
          <NoteGrid>
            {conceptClosingText ? (
              <NoteCard $compact={false}>
                <DetailBody $compact={false}>{conceptClosingText}</DetailBody>
              </NoteCard>
            ) : null}

            {conceptQuoteText ? (
              <QuoteCard $compact={false}>
                <DetailBody $compact={false}>{conceptQuoteText}</DetailBody>
              </QuoteCard>
            ) : null}
          </NoteGrid>
        ) : null}
      </ContentColumn>
    </Layout>
  );
}
