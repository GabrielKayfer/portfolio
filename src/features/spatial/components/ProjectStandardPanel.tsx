import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import { BodyText } from '../../../components/ui/BodyText';
import { MetaList } from '../../../components/ui/MetaList';
import type { ProjectDeckPage } from '../projectPages';
import type { ProjectScreenState } from '../projectScreenState';
import { MediaSequenceControls } from './MediaSequenceControls';
import {
  PanelChapterIndex as ChapterIndex,
  PanelDetailBody as DetailBody,
  PanelDetailCard as DetailCard,
  PanelDetailLabel as DetailLabel,
  PanelStoryHeader as StoryHeader,
  PanelStoryScroll as StoryScroll,
  PanelStoryTitleBase as StoryTitleBase
} from './ProjectPanelPrimitives';

interface ProjectStandardPanelProps {
  activePage: ProjectDeckPage;
  amoraeExperienceMediaIndex: number;
  isActive: boolean;
  isHub: boolean;
  nodeId: string;
  onNextAmoraeExperienceImage: () => void;
  onPreviousAmoraeExperienceImage: () => void;
  screenState: ProjectScreenState;
}

const BodyGrid = styled.div<{ $hub: boolean }>`
  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: ${({ $hub }) =>
    $hub
      ? 'minmax(24rem, 0.96fr) minmax(0, 1.04fr)'
      : 'minmax(18rem, 0.66fr) minmax(0, 1.34fr)'};
  gap: 1.5rem;
  align-items: start;

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

const StoryTitle = styled(StoryTitleBase)<{ $hub: boolean }>`
  max-width: ${({ $hub }) => ($hub ? '12.5ch' : '10.4ch')};
  font-size: ${({ $hub }) =>
    $hub ? 'clamp(1.3rem, 1.95vw, 1.95rem)' : 'clamp(1.7rem, 2.7vw, 2.5rem)'};
`;

const ContentColumn = styled.section<{
  $compact: boolean;
  $overview?: boolean;
  $carousel?: boolean;
}>`
  min-height: 0;
  height: ${({ $overview }) => ($overview ? '100%' : 'auto')};
  display: grid;
  width: ${({ $overview }) => ($overview ? 'min(100%, 46rem)' : 'auto')};
  align-self: ${({ $overview }) => ($overview ? 'stretch' : 'auto')};
  justify-self: ${({ $overview }) => ($overview ? 'start' : 'stretch')};
  grid-template-rows: ${({ $compact, $overview, $carousel }) =>
    $overview
      ? 'minmax(0, 1fr) auto'
      : $carousel
        ? 'auto auto'
        : $compact
          ? 'minmax(0, 0.9fr) minmax(0, 0.6fr)'
          : 'minmax(0, 0.84fr) auto'};
  gap: ${({ $compact, $overview }) => ($overview ? '0' : $compact ? '0.8rem' : '1rem')};
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

const MediaStage = styled.div<{
  $compact: boolean;
  $overview?: boolean;
  $carousel?: boolean;
}>`
  min-height: 0;
  display: grid;
  grid-template-rows: ${({ $compact, $carousel }) =>
    $carousel ? 'auto auto' : $compact ? 'auto auto' : 'auto minmax(0, 1fr)'};
  align-content: ${({ $overview }) => ($overview ? 'stretch' : 'start')};
  gap: ${({ $compact }) => ($compact ? '0.45rem' : '0.6rem')};
  padding-bottom: ${({ $compact, $overview }) =>
    $overview ? '0' : $compact ? '0.6rem' : '1rem'};
  border-bottom: ${({ $overview, theme }) =>
    $overview ? 'none' : `1px solid ${theme.colors.divider}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.45rem;
    padding-bottom: 0.75rem;
  }
`;

const MediaViewport = styled.div<{ $compact: boolean }>`
  min-height: 0;
  display: grid;
  align-items: start;
  justify-items: center;
  max-height: ${({ $compact }) => ($compact ? 'min(46vh, 25rem)' : 'none')};
`;

const CenteredArtwork = styled.div<{ $overview?: boolean }>`
  width: min(100%, 18rem);
  max-height: min(60vh, 30rem);
  display: grid;
  place-items: center;
  justify-self: center;
  align-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: min(100%, 14rem);
    max-height: min(42vh, 20rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: min(100%, 12rem);
    max-height: min(28vh, 11rem);
  }
`;

const OverviewMediaViewport = styled(MediaViewport)`
  width: 100%;
  min-height: clamp(18rem, 42vh, 23rem);
  height: 100%;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: clamp(12rem, 28vh, 15rem);
  }
`;

const AmoraeOverviewMediaViewport = styled(MediaViewport)`
  width: 100%;
  min-height: clamp(12rem, 28vh, 15rem);
  align-items: center;
  padding-top: 0.35rem;
  padding-bottom: 40px;
`;

const AmoraeExperiencePreviewViewport = styled.div`
  width: min(100%, 42rem);
  height: min(30vh, 18.5rem);
  display: grid;
  align-items: center;
  justify-items: center;
  justify-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: min(26vh, 15rem);
  }
`;

const AmoraeContextPreviewViewport = styled.div`
  width: min(100%, 46rem);
  height: min(34vh, 20.5rem);
  display: grid;
  align-items: center;
  justify-items: center;
  justify-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: min(28vh, 16rem);
  }
`;

const AmoraeOverviewArtwork = styled(CenteredArtwork)`
  width: min(100%, 11rem);
  max-height: min(34vh, 13rem);
  transform: translateY(0.35rem);

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
`;

const HighlightMediaGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Bands = styled.div<{ $compact: boolean; $overview?: boolean }>`
  min-height: 0;
  display: grid;
  gap: ${({ $compact }) => ($compact ? '0.65rem' : '0.85rem')};
  align-content: start;
  align-self: ${({ $overview }) => ($overview ? 'end' : 'auto')};
  overflow: ${({ $overview }) => ($overview ? 'visible' : 'auto')};
  padding-right: ${({ $overview }) => ($overview ? '0' : '0.15rem')};
`;

const Band = styled.section`
  display: grid;
  gap: 0.55rem;
`;

const PlainNote = styled.div`
  grid-column: 1;
  max-width: none;
`;

const ConceptNoteStack = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1.5rem;
  row-gap: 0.9rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ConceptQuote = styled.div`
  grid-column: 2;
  max-width: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1;
  }
`;

const HorizontalCards = styled.div<{ $compact: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${({ $compact }) =>
    $compact ? 'minmax(12rem, 1fr)' : 'minmax(14rem, 1fr)'};
  gap: ${({ $compact }) => ($compact ? '0.45rem' : '0.6rem')};
  overflow-x: auto;
  padding-bottom: 0.15rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-auto-columns: minmax(18rem, 60vw);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-auto-columns: minmax(14.5rem, 80vw);
  }
`;

const OverviewDetailGrid = styled.div`
  width: 100%;
  padding-top: 1.1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const OverviewDetailCard = styled(DetailCard)`
  padding: 0.92rem 1rem;
`;

const AmoraeContextCard = styled(DetailCard)`
  gap: 0.2rem;
  height: auto;
  min-height: auto;
  align-self: start;
  align-content: start;
  grid-auto-rows: max-content;

  ${DetailLabel} {
    display: block;
    margin: 0;
  }

  ${DetailBody} {
    margin: 0;
  }
`;

const AmoraeConstructionCard = styled(DetailCard)`
  width: min(100%, 32rem);
  height: auto;
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

const StackLine = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontMono};
  font-size: 0.76rem;
  line-height: 1.7;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export function ProjectStandardPanel({
  activePage,
  amoraeExperienceMediaIndex,
  isActive,
  isHub,
  nodeId,
  onNextAmoraeExperienceImage,
  onPreviousAmoraeExperienceImage,
  screenState
}: ProjectStandardPanelProps) {
  const {
    amoraeConstructionMedia,
    amoraeExperienceMedia,
    conceptClosingText,
    conceptQuoteText,
    hasStoryContent,
    isAmoraeConstructionPage,
    isAmoraeContextPage,
    isAmoraeExperiencePage,
    isAmoraeOverviewPage,
    isCompactConceptPage,
    isSeedbankOverviewPage,
    isVorticOverviewPage,
    seedbankOverviewText,
    usesCondensedDetails
  } = screenState;

  return (
    <BodyGrid $hub={isHub}>
      <StoryColumn>
        <StoryHeader>
          {!isHub ? <ChapterIndex>{activePage.eyebrow}</ChapterIndex> : null}
          <StoryTitle $hub={isHub}>{activePage.title}</StoryTitle>
        </StoryHeader>

        {hasStoryContent ? (
          <StoryScroll data-spatial-scroll-lock>
            {activePage.body.map((paragraph, index) => (
              <BodyText key={`${nodeId}-paragraph-${index}`}>{paragraph}</BodyText>
            ))}

            {isHub && activePage.highlights.length ? (
              <StackLine>{activePage.highlights.join(' · ')}</StackLine>
            ) : null}

            {!isHub && activePage.highlights.length ? (
              <MetaList items={activePage.highlights} />
            ) : null}
          </StoryScroll>
        ) : null}
      </StoryColumn>

      <ContentColumn
        $compact={isCompactConceptPage}
        $overview={isVorticOverviewPage}
        $carousel={
          isAmoraeExperiencePage || isAmoraeContextPage || isAmoraeConstructionPage
        }
      >
        <MediaStage
          $compact={isCompactConceptPage}
        $overview={isVorticOverviewPage}
        $carousel={
          isAmoraeExperiencePage || isAmoraeContextPage || isAmoraeConstructionPage
        }
      >
        {isVorticOverviewPage ? (
          <OverviewMediaViewport $compact={isCompactConceptPage}>
            <CenteredArtwork $overview>
              <ResponsiveMedia
                asset={activePage.media}
                fit="contain"
                frameSizing="fill"
                priority={isActive}
                surfaceVariant="plain"
              />
              </CenteredArtwork>
            </OverviewMediaViewport>
          ) : isAmoraeOverviewPage ? (
            <AmoraeOverviewMediaViewport $compact={isCompactConceptPage}>
              <AmoraeOverviewArtwork>
                <ResponsiveMedia
                  asset={activePage.media}
                  fit="contain"
                  frameSizing="fill"
                  priority={isActive}
                  surfaceVariant="plain"
                />
              </AmoraeOverviewArtwork>
            </AmoraeOverviewMediaViewport>
          ) : (
            <MediaViewport $compact={isCompactConceptPage}>
              {isAmoraeConstructionPage ? (
                <HighlightMediaGrid>
                  {amoraeConstructionMedia.map((asset, index) => (
                    <ResponsiveMedia
                      key={`${nodeId}-${asset.src}-${index}`}
                      asset={asset}
                      fit="contain"
                      frameSizing="fill"
                      priority={index === 0 ? isActive : false}
                      surfaceVariant="framed"
                    />
                  ))}
                </HighlightMediaGrid>
              ) : isAmoraeExperiencePage ? (
                <AmoraeExperiencePreviewViewport>
                  <ResponsiveMedia
                    asset={amoraeExperienceMedia[amoraeExperienceMediaIndex] ?? activePage.media}
                    fit="contain"
                    frameSizing="fit-media"
                    priority={isActive}
                    surfaceVariant="framed"
                  />
                </AmoraeExperiencePreviewViewport>
              ) : isAmoraeContextPage ? (
                <AmoraeContextPreviewViewport>
                  <ResponsiveMedia
                    asset={activePage.media}
                    fit="contain"
                    frameSizing="fit-media"
                    priority={isActive}
                    surfaceVariant="framed"
                  />
                </AmoraeContextPreviewViewport>
              ) : (
                <ResponsiveMedia
                  asset={activePage.media}
                  fit="contain"
                  frameSizing="fit-media"
                  priority={isActive}
                  surfaceVariant={
                    isCompactConceptPage || isSeedbankOverviewPage ? 'plain' : 'framed'
                  }
                />
              )}
            </MediaViewport>
          )}

          {isAmoraeExperiencePage ? (
            amoraeExperienceMedia.length > 1 ? (
              <MediaSequenceControls
                onNext={onNextAmoraeExperienceImage}
                onPrevious={onPreviousAmoraeExperienceImage}
              />
            ) : null
          ) : null}
        </MediaStage>

        <Bands
          $compact={isCompactConceptPage}
          $overview={isVorticOverviewPage}
          data-spatial-scroll-lock
        >
          {isCompactConceptPage && (conceptClosingText || conceptQuoteText) ? (
            <Band>
              <ConceptNoteStack>
                {conceptClosingText ? (
                  <PlainNote>
                    <OverviewDetailCard $compact={false}>
                      <DetailBody $compact={false}>{conceptClosingText}</DetailBody>
                    </OverviewDetailCard>
                  </PlainNote>
                ) : null}

                {conceptQuoteText ? (
                  <ConceptQuote>
                    <OverviewDetailCard $compact={false}>
                      <DetailBody $compact={false}>{conceptQuoteText}</DetailBody>
                    </OverviewDetailCard>
                  </ConceptQuote>
                ) : null}
              </ConceptNoteStack>
            </Band>
          ) : isAmoraeOverviewPage ? (
            activePage.details[0] ? (
              <Band>
                <AmoraeConstructionCard
                  key={`${nodeId}-${activePage.details[0].label}`}
                  $compact={false}
                >
                  <DetailLabel>{activePage.details[0].label}</DetailLabel>
                  <DetailBody $compact={false}>{activePage.details[0].value}</DetailBody>
                </AmoraeConstructionCard>
              </Band>
            ) : null
          ) : isSeedbankOverviewPage && seedbankOverviewText ? (
            <Band>
              <OverviewDetailCard $compact={false}>
                <DetailBody $compact={false}>{seedbankOverviewText}</DetailBody>
              </OverviewDetailCard>
            </Band>
          ) : activePage.details.length ? (
            <Band>
              {isVorticOverviewPage ? (
                <OverviewDetailGrid>
                  {activePage.details.map((item) => (
                    <OverviewDetailCard key={`${nodeId}-${item.label}`} $compact={false}>
                      <DetailLabel>{item.label}</DetailLabel>
                      <DetailBody $compact={false}>{item.value}</DetailBody>
                    </OverviewDetailCard>
                  ))}
                </OverviewDetailGrid>
              ) : isAmoraeContextPage ? (
                <HorizontalCards $compact={usesCondensedDetails} data-spatial-scroll-lock>
                  {activePage.details.map((item) => (
                    <AmoraeContextCard
                      key={`${nodeId}-${item.label}`}
                      $compact={usesCondensedDetails}
                    >
                      <DetailLabel>{item.label}</DetailLabel>
                      <DetailBody $compact={usesCondensedDetails}>{item.value}</DetailBody>
                    </AmoraeContextCard>
                  ))}
                </HorizontalCards>
              ) : isAmoraeExperiencePage || isAmoraeConstructionPage ? (
                activePage.details[0] ? (
                  <AmoraeConstructionCard
                    key={`${nodeId}-${activePage.details[0].label}`}
                    $compact={usesCondensedDetails}
                  >
                    <DetailLabel>{activePage.details[0].label}</DetailLabel>
                    <DetailBody $compact={usesCondensedDetails}>
                      {activePage.details[0].value}
                    </DetailBody>
                  </AmoraeConstructionCard>
                ) : null
              ) : (
                <HorizontalCards $compact={usesCondensedDetails} data-spatial-scroll-lock>
                  {activePage.details.map((item) => (
                    <DetailCard key={`${nodeId}-${item.label}`} $compact={usesCondensedDetails}>
                      <DetailLabel>{item.label}</DetailLabel>
                      <DetailBody $compact={usesCondensedDetails}>{item.value}</DetailBody>
                    </DetailCard>
                  ))}
                </HorizontalCards>
              )}
            </Band>
          ) : null}

        </Bands>
      </ContentColumn>
    </BodyGrid>
  );
}
