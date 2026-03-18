import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import { BodyText } from '../../../components/ui/BodyText';
import type { ProjectDeckPage } from '../../../features/spatial/projectPages';
import {
  PanelDetailBody as DetailBody,
  PanelDetailCard as DetailCard,
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
  min-height: 0;
  display: grid;
  align-items: center;
  justify-items: center;
  max-height: min(46vh, 25rem);
`;

const DetailCardBody = styled(DetailCard)`
  width: min(100%, 28rem);
  min-height: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
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
          <ResponsiveMedia
            asset={activePage.media}
            fit="contain"
            frameSizing="fit-media"
            priority={isActive}
            surfaceVariant="plain"
          />
        </MediaViewport>

        {activePage.details[0] ? (
          <DetailCardBody $compact={false}>
            <DetailBody $compact={false}>{activePage.details[0].value}</DetailBody>
          </DetailCardBody>
        ) : null}
      </ContentColumn>
    </Layout>
  );
}
