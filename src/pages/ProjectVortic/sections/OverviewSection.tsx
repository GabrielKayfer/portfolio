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
  --vortic-overview-scale-width: clamp(0.68, calc(100vw / 1920px), 1);
  --vortic-overview-scale-height: clamp(0.62, calc(100svh / 945px), 1);
  --vortic-overview-scale: min(
    var(--vortic-overview-scale-width),
    var(--vortic-overview-scale-height)
  );

  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(18rem, 0.78fr) minmax(0, 1.22fr);
  gap: max(0.82rem, calc(1.18rem * var(--vortic-overview-scale)));
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: minmax(15.5rem, 0.72fr) minmax(0, 1.28fr);
    gap: max(0.72rem, calc(0.96rem * var(--vortic-overview-scale)));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: max(0.7rem, calc(0.86rem * var(--vortic-overview-scale)));
  }
`;

const StoryColumn = styled.section`
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: max(0.72rem, calc(0.9rem * var(--vortic-overview-scale)));
  width: min(100%, clamp(18.5rem, calc(31rem * var(--vortic-overview-scale)), 31rem));
`;

const StoryTitle = styled(StoryTitleBase)`
  max-width: 12.5ch;
  font-size: clamp(
    1.18rem,
    calc(1.95rem * var(--vortic-overview-scale)),
    1.95rem
  );
`;

const StoryFlow = styled(StoryScroll)`
  gap: max(0.62rem, calc(0.82rem * var(--vortic-overview-scale)));
  max-width: clamp(18.5rem, calc(31rem * var(--vortic-overview-scale)), 31rem);
  overflow: visible;
  max-height: none;
  padding-right: 0;

  & > p {
    font-size: max(0.84rem, calc(0.98rem * var(--vortic-overview-scale)));
    line-height: 1.58;
  }
`;

const StackLine = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: max(0.62rem, calc(0.76rem * var(--vortic-overview-scale)));
  line-height: 1.62;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ContentColumn = styled.section`
  min-height: 0;
  height: auto;
  display: grid;
  width: min(100%, clamp(30rem, calc(52rem * var(--vortic-overview-scale)), 52rem));
  justify-self: end;
  align-self: start;
  grid-template-rows: auto auto;
  gap: max(0.78rem, calc(1.08rem * var(--vortic-overview-scale)));
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: min(100%, clamp(30rem, calc(48rem * var(--vortic-overview-scale)), 48rem));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

const MediaStage = styled.div`
  min-height: 0;
  display: grid;
  gap: max(0.85rem, calc(1.24rem * var(--vortic-overview-scale)));
  padding-bottom: max(1rem, calc(1.5rem * var(--vortic-overview-scale)));
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.45rem;
    padding-bottom: 0.75rem;
  }
`;

const MediaViewport = styled.div`
  width: 100%;
  min-height: clamp(10rem, calc(18rem * var(--vortic-overview-scale)), 18rem);
  display: grid;
  align-items: start;
  padding-top: max(0.15rem, calc(0.28rem * var(--vortic-overview-scale)));
  padding-bottom: max(0.3rem, calc(0.55rem * var(--vortic-overview-scale)));

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    min-height: clamp(9rem, calc(14rem * var(--vortic-overview-scale)), 14rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: clamp(9rem, 24vh, 13rem);
  }
`;

const Artwork = styled.div`
  width: min(100%, clamp(10rem, calc(18rem * var(--vortic-overview-scale)), 18rem));
  max-height: min(
    54vh,
    clamp(12rem, calc(24rem * var(--vortic-overview-scale)), 24rem)
  );
  display: grid;
  place-items: center;
  justify-self: center;
  align-self: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: min(100%, clamp(9rem, calc(15.5rem * var(--vortic-overview-scale)), 15.5rem));
    max-height: min(
      46vh,
      clamp(11rem, calc(20rem * var(--vortic-overview-scale)), 20rem)
    );
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: min(100%, 13rem);
    max-height: min(34vh, 16rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: min(100%, 12rem);
    max-height: min(28vh, 11rem);
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    width: min(100%, 13rem);
    max-height: min(36vh, 16rem);
  }
`;

const DetailGrid = styled.div`
  width: 100%;
  padding-top: max(0.74rem, calc(0.98rem * var(--vortic-overview-scale)));
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: max(0.5rem, calc(0.72rem * var(--vortic-overview-scale)));
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    gap: 0.58rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const OverviewCard = styled(DetailCard)`
  padding:
    max(0.56rem, calc(0.76rem * var(--vortic-overview-scale)))
    max(0.6rem, calc(0.82rem * var(--vortic-overview-scale)));
  gap: max(0.18rem, calc(0.24rem * var(--vortic-overview-scale)));

  ${DetailLabel} {
    font-size: max(0.54rem, calc(0.62rem * var(--vortic-overview-scale)));
    letter-spacing: 0.09em;
  }

  ${DetailBody} {
    font-size: max(0.72rem, calc(0.82rem * var(--vortic-overview-scale)));
    line-height: 1.48;
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
        <MediaStage>
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
        </MediaStage>

        {activePage.details.length ? (
          <DetailGrid>
            {activePage.details.map((item) => (
              <OverviewCard key={`${activePage.id}-${item.label}`} $compact={false}>
                <DetailLabel>{item.label}</DetailLabel>
                <DetailBody $compact={false}>{item.value}</DetailBody>
              </OverviewCard>
            ))}
          </DetailGrid>
        ) : null}
      </ContentColumn>
    </Layout>
  );
}
