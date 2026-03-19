import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import type { ProjectDeckPage } from '../../../features/spatial/projectPages';
import {
  PanelChapterIndex as ChapterIndex,
  PanelDetailBody as DetailBody,
  PanelDetailCard as DetailCard,
  PanelStoryHeader as StoryHeader,
  ProjectSectionOpening as SectionOpening
} from '../../../components/ui/ProjectPagePrimitives';

interface VisionSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
}

const Layout = styled.div`
  --vision-media-card-gap: 0.55rem;

  position: relative;
  z-index: 1;
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(19rem, 0.84fr) minmax(17rem, 1fr) minmax(17rem, 1fr);
  gap: 1rem;
  align-items: stretch;

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
  height: 100%;
  display: grid;
  align-content: start;
  padding-top: 0.15rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    height: auto;
  }
`;

const VisionHeader = styled(StoryHeader)`
  gap: 0.45rem;
  max-width: 21rem;
`;

const VisionTitle = styled(SectionOpening)`
  max-width: 11.2ch;
`;

const MediaSection = styled.section`
  grid-column: 2 / 4;
  min-height: 0;
  height: 100%;
  display: grid;
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: auto;
  }
`;

const MediaGrid = styled.div`
  min-height: 0;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  align-items: stretch;
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const MediaColumn = styled.div`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: var(--vision-media-card-gap);
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: var(--vision-media-card-gap);
  }
`;

const MediaViewport = styled.div`
  min-height: 0;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: stretch;
  overflow: hidden;
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
