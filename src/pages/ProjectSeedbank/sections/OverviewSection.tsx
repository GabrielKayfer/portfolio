import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import type { ProjectDeckPage } from '../../../features/spatial/projectPages';
import {
  PanelDetailCard as DetailCard,
  PanelStoryHeader as StoryHeader,
  PanelStoryScroll as StoryScroll,
  ProjectOverviewCardBody,
  ProjectStackLine,
  ProjectOverviewTitle,
  ProjectSummaryText
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

const StoryTitle = styled(ProjectOverviewTitle)`
  max-width: 12.5ch;
`;

const StoryFlow = styled(StoryScroll)`
  max-height: none;
  overflow: visible;
  padding-right: 0;
`;

const StackLine = styled(ProjectStackLine)``;

const ContentColumn = styled.section`
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto;
  gap: 0.85rem;
  height: 100%;
  align-content: center;
  justify-items: center;
`;

const MediaViewport = styled.div`
  min-height: 0;
  display: grid;
  align-items: center;
  justify-items: center;
  max-height: min(46vh, 25rem);
`;

const CardShelf = styled.div`
  width: min(100%, 28rem);
  padding-top: 0.78rem;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  justify-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    padding-top: 0.68rem;
  }
`;

const DetailCardBody = styled(DetailCard)`
  width: min(100%, 28rem);
  min-height: auto;
  justify-self: center;

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
            <ProjectSummaryText key={`${activePage.id}-paragraph-${index}`}>
              {paragraph}
            </ProjectSummaryText>
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
          <CardShelf>
            <DetailCardBody $compact={false}>
              <ProjectOverviewCardBody>
                {activePage.details[0].value}
              </ProjectOverviewCardBody>
            </DetailCardBody>
          </CardShelf>
        ) : null}
      </ContentColumn>
    </Layout>
  );
}
