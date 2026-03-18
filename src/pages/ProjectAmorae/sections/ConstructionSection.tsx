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

interface ConstructionSectionProps {
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

const HighlightMediaGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
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

export function ConstructionSection({
  activePage,
  isActive
}: ConstructionSectionProps) {
  const media = [activePage.media, ...(activePage.gallery ?? [])].slice(0, 2);
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
        <HighlightMediaGrid>
          {media.map((asset, index) => (
            <ResponsiveMedia
              key={`${activePage.id}-${asset.src}-${index}`}
              asset={asset}
              fit="contain"
              frameSizing="fill"
              priority={index === 0 ? isActive : false}
              surfaceVariant="framed"
            />
          ))}
        </HighlightMediaGrid>

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
