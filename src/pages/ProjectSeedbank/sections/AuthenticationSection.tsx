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

interface AuthenticationSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
}

const Layout = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(18rem, 0.86fr) minmax(17rem, 1fr) minmax(17rem, 1fr);
  gap: 1rem;
  align-items: start;

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
  display: grid;
  gap: 0.9rem;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
  }
`;

const StoryTitle = styled(StoryTitleBase)`
  max-width: 10.4ch;
  font-size: clamp(1.7rem, 2.7vw, 2.5rem);
`;

const StoryFlow = styled(StoryScroll)`
  max-width: 28rem;
  overflow: visible;
  padding-right: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-height: none;
  }
`;

const MediaColumn = styled.div`
  display: grid;
  gap: 0.7rem;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.6rem;
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
            <BodyText key={`${activePage.id}-paragraph-${index}`}>{paragraph}</BodyText>
          ))}
        </StoryFlow>
      </TextColumn>

      {media.map((asset, index) => (
        <MediaColumn key={`${activePage.id}-${asset.src}-${index}`}>
          <ResponsiveMedia
            asset={asset}
            fit="contain"
            frameSizing="fill"
            priority={index === 0 ? isActive : false}
            surfaceVariant="framed"
          />

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
