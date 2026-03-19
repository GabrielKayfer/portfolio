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

interface LogicSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
}

const Layout = styled.div`
  --logic-scale-width: clamp(0.72, calc(100vw / 1920px), 1);
  --logic-scale-height: clamp(0.62, calc(100svh / 945px), 1);
  --logic-scale: min(var(--logic-scale-width), var(--logic-scale-height));
  --logic-media-card-gap: max(0.5rem, calc(0.62rem * var(--logic-scale)));

  position: relative;
  z-index: 1;
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(13.8rem, 0.58fr) minmax(17rem, 1fr) minmax(14.8rem, 0.86fr);
  gap: max(0.78rem, calc(0.96rem * var(--logic-scale)));
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns:
      minmax(12.8rem, 0.56fr)
      minmax(15.5rem, 1fr)
      minmax(13rem, 0.82fr);
    gap: max(0.68rem, calc(0.84rem * var(--logic-scale)));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

const StoryColumn = styled.section`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: max(0.72rem, calc(0.88rem * var(--logic-scale)));
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    height: auto;
  }
`;

const MediaColumn = styled.section`
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--logic-media-card-gap);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) and (max-height: ${({ theme }) =>
      theme.viewport.heights.compact}) {
    gap: var(--logic-media-card-gap);
  }
`;

const SideColumn = styled.section`
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--logic-media-card-gap);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) and (max-height: ${({ theme }) =>
      theme.viewport.heights.compact}) {
    gap: var(--logic-media-card-gap);
  }
`;

const StoryTitle = styled(SectionOpening)`
  max-width: 9ch;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 12ch;
  }
`;

const StoryFlow = styled(StoryScroll)`
  max-width: clamp(15rem, calc(26rem * var(--logic-scale)), 26rem);
  height: 100%;
  gap: max(0.56rem, calc(0.68rem * var(--logic-scale)));
  overflow: visible;
  padding-right: 0;
  max-height: none;
`;

const PreviewViewport = styled.div`
  flex: 1 1 0;
  width: 100%;
  min-height: 0;
  height: 100%;
  display: grid;
  align-items: stretch;
  justify-items: stretch;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: clamp(10.8rem, 26vh, 14.8rem);
    flex: 0 0 auto;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    min-height: clamp(9.4rem, calc(13rem * var(--logic-scale)), 13rem);
  }
`;

const DetailStack = styled.div`
  width: 100%;
  display: grid;
  gap: max(0.46rem, calc(0.6rem * var(--logic-scale)));
  flex: 0 0 auto;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) and (max-height: ${({ theme }) =>
      theme.viewport.heights.compact}) {
    gap: max(0.34rem, calc(0.44rem * var(--logic-scale)));
  }
`;

const LogicCard = styled(DetailCard)`
  width: 100%;
  justify-self: stretch;
  gap: max(0.14rem, calc(0.18rem * var(--logic-scale)));
  min-height: auto;
  padding:
    max(0.46rem, calc(0.54rem * var(--logic-scale)))
    max(0.52rem, calc(0.62rem * var(--logic-scale)));
  background: rgba(255, 255, 255, 0.008);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.5rem 0.56rem;
  }
`;

const LogicCardBody = styled(DetailBody)``;

const LogicCardLabel = styled(DetailLabel)``;

export function LogicSection({
  activePage,
  isActive
}: LogicSectionProps) {
  const media = [activePage.media, ...(activePage.gallery ?? [])].slice(0, 2);
  const middleColumnDetails = activePage.details.slice(1, 3);
  const sideColumnDetail = activePage.details[0] ?? null;

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

      <MediaColumn>
        {media[0] ? (
          <PreviewViewport>
            <ResponsiveMedia
              asset={media[0]}
              fit="cover"
              frameSizing="viewport-fill"
              cornerStyle="card"
              objectPosition="top center"
              priority={isActive}
              surfaceVariant="plain"
            />
          </PreviewViewport>
        ) : null}

        {middleColumnDetails.length ? (
          <DetailStack>
            {middleColumnDetails.map((item) => (
              <LogicCard key={`${activePage.id}-${item.label}`} $compact>
                <LogicCardLabel>{item.label}</LogicCardLabel>
                <LogicCardBody $compact>{item.value}</LogicCardBody>
              </LogicCard>
            ))}
          </DetailStack>
        ) : null}
      </MediaColumn>

      <SideColumn>
        {media[1] ? (
          <PreviewViewport>
            <ResponsiveMedia
              asset={media[1]}
              fit="cover"
              frameSizing="viewport-fill"
              cornerStyle="card"
              objectPosition="top center"
              priority={false}
              surfaceVariant="plain"
            />
          </PreviewViewport>
        ) : null}

        {sideColumnDetail ? (
          <DetailStack>
            <LogicCard $compact>
              <LogicCardLabel>{sideColumnDetail.label}</LogicCardLabel>
              <LogicCardBody $compact>{sideColumnDetail.value}</LogicCardBody>
            </LogicCard>
          </DetailStack>
        ) : null}
      </SideColumn>
    </Layout>
  );
}
