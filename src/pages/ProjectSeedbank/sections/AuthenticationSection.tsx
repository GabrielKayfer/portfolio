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

interface AuthenticationSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
}

const Layout = styled.div`
  --auth-media-card-gap: 0.55rem;

  position: relative;
  z-index: 1;
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(18rem, 0.86fr) minmax(17rem, 1fr) minmax(17rem, 1fr);
  gap: 1rem;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns:
      minmax(15rem, 0.82fr)
      minmax(15rem, 1fr)
      minmax(15rem, 1fr);
    gap: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const TextColumn = styled.section`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 0.9rem;
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
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

const MediaColumn = styled.div`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: var(--auth-media-card-gap);
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: var(--auth-media-card-gap);
  }
`;

const MediaViewport = styled.div`
  min-height: 0;
  height: 100%;
  min-height: min(38vh, 24rem);
  display: grid;
  align-items: center;
  justify-items: stretch;
  width: 100%;
  max-width: 100%;
  justify-self: stretch;
  overflow: hidden;

  & > figure {
    min-height: 0;
    height: 100%;
    max-width: 100%;
  }

  & > figure > div {
    max-height: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: min(34vh, 20rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: min(28vh, 16rem);
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    min-height: min(28vh, 16.5rem);
  }
`;

const MediaCard = styled(DetailCard)`
  min-height: auto;
  padding: 0.72rem 0.82rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.66rem 0.72rem;
  }
`;

export function AuthenticationSection({
  activePage,
  isActive
}: AuthenticationSectionProps) {
  const media = [activePage.media, ...(activePage.gallery ?? [])].slice(0, 2);
  const details = activePage.details.slice(0, 2);

  return (
    <Layout>
      <TextColumn>
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
      </TextColumn>

      {media.map((asset, index) => (
        <MediaColumn key={`${activePage.id}-${asset.src}-${index}`}>
          <MediaViewport>
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
            <MediaCard $compact={false}>
              <DetailLabel>{details[index].label}</DetailLabel>
              <DetailBody $compact={false}>{details[index].value}</DetailBody>
            </MediaCard>
          ) : null}
        </MediaColumn>
      ))}
    </Layout>
  );
}
