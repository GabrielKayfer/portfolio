import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import type { ProjectDeckPage } from '../../../features/spatial/projectPages';
import {
  PanelChapterIndex as ChapterIndex,
  PanelDetailBody as DetailBody,
  PanelDetailCard as DetailCard,
  PanelStoryHeader as StoryHeader,
  PanelStoryTitleBase as StoryTitleBase
} from '../../../components/ui/ProjectPagePrimitives';

interface VisionSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
}

const Layout = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(19rem, 0.84fr) minmax(17rem, 1fr) minmax(17rem, 1fr);
  gap: 1rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns:
      minmax(15rem, 0.8fr)
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
  align-content: start;
  padding-top: 0.15rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
  }
`;

const VisionHeader = styled(StoryHeader)`
  gap: 0;
  max-width: 21rem;
  margin-top: -0.3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0;
  }
`;

const VisionTitle = styled(StoryTitleBase)`
  max-width: 11.2ch;
  font-size: clamp(1.45rem, 2.15vw, 2.2rem);
  line-height: 1.02;
`;

const MediaSection = styled.section`
  grid-column: 2 / 4;
  min-height: 0;
  display: grid;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: auto;
  }
`;

const MediaGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
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

const VisionCard = styled(DetailCard)`
  min-height: auto;
  padding: 0.72rem 0.82rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.66rem 0.72rem;
  }
`;

export function VisionSection({
  activePage,
  isActive
}: VisionSectionProps) {
  const media = [activePage.media, ...(activePage.gallery ?? [])].slice(0, 2);
  const leadText = activePage.body[0] ?? null;
  const supportText = activePage.details[0]?.value ?? null;

  return (
    <Layout>
      <TextColumn>
        <VisionHeader>
          <ChapterIndex>{activePage.eyebrow}</ChapterIndex>
          <VisionTitle>{activePage.title}</VisionTitle>
        </VisionHeader>
      </TextColumn>

      <MediaSection>
        <MediaGrid>
          {media.map((asset, index) => (
            <MediaColumn key={`${activePage.id}-${asset.src}-${index}`}>
              <ResponsiveMedia
                asset={asset}
                fit="contain"
                frameSizing="fill"
                priority={index === 0 ? isActive : false}
                surfaceVariant="framed"
              />

              {index === 0 && leadText ? (
                <VisionCard $compact={false}>
                  <DetailBody $compact={false}>{leadText}</DetailBody>
                </VisionCard>
              ) : null}

              {index === 1 && supportText ? (
                <VisionCard $compact={false}>
                  <DetailBody $compact={false}>{supportText}</DetailBody>
                </VisionCard>
              ) : null}
            </MediaColumn>
          ))}
        </MediaGrid>
      </MediaSection>
    </Layout>
  );
}
