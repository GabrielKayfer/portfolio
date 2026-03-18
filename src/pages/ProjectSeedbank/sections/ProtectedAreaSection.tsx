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

interface ProtectedAreaSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
}

const Layout = styled.div`
  --protected-scale-width: clamp(0.74, calc(100vw / 1920px), 1);
  --protected-scale-height: clamp(0.6, calc(100svh / 945px), 1);
  --protected-scale: min(var(--protected-scale-width), var(--protected-scale-height));

  position: relative;
  z-index: 1;
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(16rem, 0.72fr) minmax(18rem, 1fr) minmax(18rem, 1fr);
  gap: max(0.82rem, calc(1rem * var(--protected-scale)));
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns:
      minmax(14rem, 0.66fr)
      minmax(16rem, 1fr)
      minmax(16rem, 1fr);
    gap: max(0.72rem, calc(0.9rem * var(--protected-scale)));
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
  gap: max(0.72rem, calc(0.92rem * var(--protected-scale)));
  align-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    height: auto;
  }
`;

const StoryTitle = styled(StoryTitleBase)`
  max-width: 12.4ch;
  font-size: clamp(1.45rem, 2.2vw, 2.08rem);
  line-height: 1;
`;

const StoryFlow = styled(StoryScroll)`
  max-width: clamp(16rem, calc(28rem * var(--protected-scale)), 28rem);
  height: 100%;
  gap: max(0.56rem, calc(0.7rem * var(--protected-scale)));
  overflow: auto;
  padding-right: 0.1rem;
  max-height: none;
`;

const ImageColumn = styled.section`
  min-height: 0;
  display: grid;
  gap: 0.8rem;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.65rem;
  }
`;

const MediaViewport = styled.div`
  width: 100%;
  height: min(34vh, 21rem);
  display: grid;
  justify-self: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: min(30vh, 18rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: min(26vh, 15rem);
  }
`;

const ProtectedCard = styled(DetailCard)`
  min-height: auto;
  gap: max(0.18rem, calc(0.22rem * var(--protected-scale)));
  padding:
    max(0.54rem, calc(0.62rem * var(--protected-scale)))
    max(0.6rem, calc(0.7rem * var(--protected-scale)));

  ${DetailLabel} {
    font-size: max(0.56rem, calc(0.64rem * var(--protected-scale)));
    letter-spacing: 0.1em;
  }

  ${DetailBody} {
    font-size: max(0.74rem, calc(0.8rem * var(--protected-scale)));
    line-height: 1.46;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.6rem 0.66rem;
  }
`;

export function ProtectedAreaSection({
  activePage,
  isActive
}: ProtectedAreaSectionProps) {
  const media = [...(activePage.gallery ?? []).slice(0, 1), activePage.media];
  const details = activePage.details.slice(0, 2);

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

      {media.map((asset, index) => (
        <ImageColumn key={`${activePage.id}-${asset.src}-${index}`}>
          <MediaViewport>
            <ResponsiveMedia
              asset={asset}
              fit="contain"
              frameSizing="fit-media"
              priority={index === 0 ? isActive : false}
              surfaceVariant="framed"
            />
          </MediaViewport>

          {details[index] ? (
            <ProtectedCard $compact>
              <DetailLabel>{details[index].label}</DetailLabel>
              <DetailBody $compact>{details[index].value}</DetailBody>
            </ProtectedCard>
          ) : null}
        </ImageColumn>
      ))}
    </Layout>
  );
}
