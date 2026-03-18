import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import { BodyText } from '../../../components/ui/BodyText';
import type { ProjectDeckPage } from '../../../features/spatial/projectPages';
import {
  PanelDetailBody as DetailBody,
  PanelDetailCard as DetailCard,
  PanelDetailLabel as DetailLabel,
  PanelStoryHeader as StoryHeader,
  PanelStoryScroll as StoryScroll,
  PanelStoryTitleBase as StoryTitleBase
} from '../../../components/ui/ProjectPagePrimitives';

interface OverviewSectionProps {
  activePage: ProjectDeckPage;
  isActive: boolean;
}

const Layout = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(26rem, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(1rem, 1.4vw, 1.4rem);
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: minmax(21rem, 0.9fr) minmax(0, 1.1fr);
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
  max-width: 12.5ch;
  font-size: clamp(1.3rem, 1.95vw, 1.95rem);
`;

const StoryFlow = styled(StoryScroll)`
  max-height: none;
  overflow: visible;
  padding-right: 0;
`;

const StackLine = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.76rem;
  line-height: 1.62;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ContentColumn = styled.section`
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto;
  gap: 0.85rem;
  align-content: start;
`;

const MediaViewport = styled.div`
  width: 100%;
  min-height: clamp(13rem, 28vh, 16rem);
  display: grid;
  align-items: center;
  padding-top: 0.35rem;
  padding-bottom: 2.5rem;

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    min-height: clamp(10rem, 22vh, 12.5rem);
  }
`;

const Artwork = styled.div`
  width: min(100%, 12.5rem);
  max-height: min(34vh, 14rem);
  display: grid;
  place-items: center;
  justify-self: center;
  transform: translateY(0.35rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: min(100%, 10rem);
    max-height: min(28vh, 10.5rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: min(100%, 8.5rem);
    max-height: min(24vh, 9.5rem);
    transform: translateY(0.2rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: min(100%, 7.5rem);
    max-height: min(18vh, 7rem);
    transform: translateY(0.12rem);
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    width: min(100%, 8.25rem);
    max-height: min(22vh, 8.25rem);
  }
`;

const OverviewCard = styled(DetailCard)`
  width: min(100%, 36rem);
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

export function OverviewSection({
  activePage,
  isActive
}: OverviewSectionProps) {
  return (
    <Layout>
      <StoryColumn>
        <StoryHeader>
          <StoryTitle>{activePage.title}</StoryTitle>
        </StoryHeader>

        <StoryFlow data-spatial-scroll-lock>
          {activePage.body.map((paragraph, index) => (
            <BodyText key={`${activePage.id}-paragraph-${index}`}>{paragraph}</BodyText>
          ))}

          {activePage.highlights.length ? (
            <StackLine>{activePage.highlights.join(' · ')}</StackLine>
          ) : null}
        </StoryFlow>
      </StoryColumn>

      <ContentColumn>
        <MediaViewport>
          <Artwork>
            <ResponsiveMedia
              asset={activePage.media}
              fit="contain"
              frameSizing="fill"
              priority={isActive}
              surfaceVariant="plain"
            />
          </Artwork>
        </MediaViewport>

        {activePage.details[0] ? (
          <OverviewCard $compact={false}>
            <DetailLabel>{activePage.details[0].label}</DetailLabel>
            <DetailBody $compact={false}>{activePage.details[0].value}</DetailBody>
          </OverviewCard>
        ) : null}
      </ContentColumn>
    </Layout>
  );
}
