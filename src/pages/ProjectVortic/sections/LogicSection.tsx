import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import { BodyText } from '../../../components/ui/BodyText';
import type { ProjectDeckPage } from '../../../features/spatial/projectPages';
import {
  PanelChapterIndex as ChapterIndex,
  PanelDetailCard as DetailCard,
  PanelDetailLabel as DetailLabel,
  PanelStoryHeader as StoryHeader,
  PanelStoryScroll as StoryScroll,
  PanelStoryTitleBase as StoryTitleBase
} from '../../../components/ui/ProjectPagePrimitives';

interface LogicSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
}

const Layout = styled.div`
  --logic-scale-width: clamp(0.72, calc(100vw / 1920px), 1);
  --logic-scale-height: clamp(0.62, calc(100svh / 945px), 1);
  --logic-scale: min(var(--logic-scale-width), var(--logic-scale-height));

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
  display: grid;
  grid-template-rows: minmax(0, 1.08fr) auto;
  gap: max(0.58rem, calc(0.78rem * var(--logic-scale)));
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) and (max-height: ${({ theme }) =>
      theme.viewport.heights.compact}) {
    grid-template-rows: auto auto;
    gap: max(0.4rem, calc(0.5rem * var(--logic-scale)));
    align-content: start;
  }
`;

const SideColumn = styled.section`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1.02fr) auto;
  gap: max(0.58rem, calc(0.78rem * var(--logic-scale)));
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) and (max-height: ${({ theme }) =>
      theme.viewport.heights.compact}) {
    grid-template-rows: auto auto;
    gap: max(0.4rem, calc(0.5rem * var(--logic-scale)));
    align-content: start;
  }
`;

const StoryTitle = styled(StoryTitleBase)`
  max-width: 9ch;
  font-size: clamp(1.28rem, calc(1.95rem * var(--logic-scale)), 1.95rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 12ch;
    font-size: clamp(1.35rem, 7vw, 1.8rem);
  }
`;

const StoryFlow = styled(StoryScroll)`
  max-width: clamp(15rem, calc(26rem * var(--logic-scale)), 26rem);
  height: 100%;
  gap: max(0.56rem, calc(0.68rem * var(--logic-scale)));
  overflow: auto;
  padding-right: 0.1rem;
  max-height: none;

  & > p {
    font-size: max(0.84rem, calc(0.94rem * var(--logic-scale)));
    line-height: 1.58;
  }
`;

const PreviewViewport = styled.div`
  width: 100%;
  height: min(100%, clamp(11rem, calc(17.2rem * var(--logic-scale)), 17.2rem));
  min-height: 0;
  display: grid;
  align-items: center;
  justify-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: clamp(11.5rem, 29vh, 16.2rem);
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    height: min(100%, clamp(10rem, calc(14.4rem * var(--logic-scale)), 14.4rem));
  }
`;

const DetailStack = styled.div`
  display: grid;
  gap: max(0.46rem, calc(0.6rem * var(--logic-scale)));
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) and (max-height: ${({ theme }) =>
      theme.viewport.heights.compact}) {
    gap: max(0.34rem, calc(0.44rem * var(--logic-scale)));
  }
`;

const LogicCard = styled(DetailCard)`
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

const LogicCardBody = styled(BodyText)`
  font-size: max(0.7rem, calc(0.76rem * var(--logic-scale)));
  line-height: 1.42;
`;

const LogicCardLabel = styled(DetailLabel)`
  font-size: max(0.56rem, calc(0.62rem * var(--logic-scale)));
  letter-spacing: 0.1em;
`;

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
            <BodyText key={`${activePage.id}-paragraph-${index}`}>{paragraph}</BodyText>
          ))}
        </StoryFlow>
      </StoryColumn>

      <MediaColumn>
        {media[0] ? (
          <PreviewViewport>
            <ResponsiveMedia
              asset={media[0]}
              fit="contain"
              frameSizing="fit-media"
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
                <LogicCardBody>{item.value}</LogicCardBody>
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
              fit="contain"
              frameSizing="fit-media"
              priority={false}
              surfaceVariant="plain"
            />
          </PreviewViewport>
        ) : null}

        {sideColumnDetail ? (
          <DetailStack>
            <LogicCard $compact>
              <LogicCardLabel>{sideColumnDetail.label}</LogicCardLabel>
              <LogicCardBody>{sideColumnDetail.value}</LogicCardBody>
            </LogicCard>
          </DetailStack>
        ) : null}
      </SideColumn>
    </Layout>
  );
}
