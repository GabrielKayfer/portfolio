import styled from 'styled-components';
import { ResponsiveMedia } from '../../../components/media/ResponsiveMedia';
import { BodyText } from '../../../components/ui/BodyText';
import type { DetailItem, MediaAsset } from '../../../types/content';
import type { ProjectDeckPage } from '../projectPages';
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

interface BasePanelProps {
  activePage: ProjectDeckPage;
  nodeId: string;
  isActive: boolean;
  hasStoryContent: boolean;
}

interface VorticLogicPanelProps extends BasePanelProps {
  logicHighlightMedia: MediaAsset[];
  logicMiddleColumnDetails: DetailItem[];
  logicThirdColumnDetail: DetailItem | null;
}

interface VorticArchitecturePanelProps extends BasePanelProps {
  architectureMediaItems: MediaAsset[];
  architectureMediaIndex: number;
  architectureRightDetails: DetailItem[];
  onPreviousImage: () => void;
  onNextImage: () => void;
}

interface SeedbankProtectedPanelProps extends BasePanelProps {
  seedbankProtectedMedia: MediaAsset[];
  seedbankProtectedDetails: DetailItem[];
}

interface SeedbankAuthenticationPanelProps extends BasePanelProps {
  seedbankAuthenticationMedia: MediaAsset[];
  seedbankAuthenticationDetails: DetailItem[];
}

interface SeedbankVisionPanelProps {
  activePage: ProjectDeckPage;
  nodeId: string;
  isActive: boolean;
  seedbankVisionMedia: MediaAsset[];
  seedbankVisionLeadText: string | null;
  seedbankVisionText: string | null;
}

const LogicGrid = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(17rem, 0.82fr) minmax(18rem, 0.98fr) minmax(14rem, 0.72fr);
  gap: 1.1rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

const ArchitectureGrid = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(17rem, 0.8fr) minmax(18rem, 1fr) minmax(18rem, 1fr);
  gap: 1.15rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

const ArchitectureTextColumn = styled.section`
  min-height: 0;
  display: grid;
  gap: 0.95rem;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
  }
`;

const ArchitectureVisualColumn = styled.section`
  grid-column: 2 / 4;
  min-height: 0;
  display: grid;
  gap: 0.8rem;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: auto;
  }
`;

const SeedbankProtectedImageColumn = styled.section`
  min-height: 0;
  display: grid;
  gap: 0.8rem;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.65rem;
  }
`;

const LogicTextColumn = styled.section`
  min-height: 0;
  display: grid;
  gap: 0.9rem;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
  }
`;

const LogicMediaColumn = styled.section`
  min-height: 0;
  display: grid;
  gap: 0.8rem;
  align-content: start;
`;

const LogicSideColumn = styled.section`
  min-height: 0;
  display: grid;
  gap: 0.85rem;
  align-content: start;
`;

const StoryTitle = styled(StoryTitleBase)`
  max-width: 10.4ch;
  font-size: clamp(1.7rem, 2.7vw, 2.5rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 12ch;
    font-size: clamp(1.45rem, 8vw, 2rem);
  }
`;

const LogicTitle = styled(StoryTitle)`
  max-width: 9.4ch;
  font-size: clamp(1.45rem, 2.25vw, 2.05rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 12ch;
    font-size: clamp(1.35rem, 7vw, 1.8rem);
  }
`;

const LogicStoryScroll = styled(StoryScroll)`
  max-width: 29rem;
  gap: 0.7rem;
  overflow: visible;
  padding-right: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-height: none;
  }
`;

const ArchitectureStoryScroll = styled(StoryScroll)`
  max-width: 28rem;
  gap: 0.7rem;
  overflow: visible;
  padding-right: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-height: none;
  }
`;

const ArchitecturePreviewViewport = styled.div`
  width: min(100%, 600px);
  aspect-ratio: 1427 / 993;
  display: grid;
  align-items: center;
  justify-items: center;
  justify-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    max-width: 40rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const SeedbankProtectedMediaViewport = styled.div`
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

const SeedbankVisionGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SeedbankVisionLayout = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(18rem, 0.82fr) minmax(16rem, 1fr) minmax(16rem, 1fr);
  gap: 1rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SeedbankVisionTextColumn = styled.section`
  min-height: 0;
  display: grid;
  align-content: start;
  padding-top: 0.15rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
  }
`;

const SeedbankVisionHeader = styled(StoryHeader)`
  gap: 0;
  max-width: 21rem;
  margin-top: -0.3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0;
  }
`;

const SeedbankVisionTitle = styled(StoryTitle)`
  max-width: 11.2ch;
  font-size: clamp(1.45rem, 2.15vw, 2.2rem);
  line-height: 1.02;
`;

const SeedbankProtectedTitle = styled(StoryTitle)`
  max-width: 12.4ch;
  font-size: clamp(1.45rem, 2.2vw, 2.08rem);
  line-height: 1;
`;

const SeedbankVisionMediaSection = styled.section`
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

const SeedbankAuthenticationLayout = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(17rem, 0.86fr) minmax(16rem, 1fr) minmax(16rem, 1fr);
  gap: 1rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SeedbankAuthenticationTextColumn = styled.section`
  min-height: 0;
  display: grid;
  gap: 0.9rem;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
  }
`;

const SeedbankAuthenticationStoryScroll = styled(StoryScroll)`
  max-width: 28rem;
  overflow: visible;
  padding-right: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-height: none;
  }
`;

const SeedbankVisionColumn = styled.div`
  display: grid;
  gap: 0.7rem;
  align-content: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.6rem;
  }
`;

const LogicPreviewViewport = styled.div`
  width: 100%;
  display: grid;
  align-items: start;
`;

const VerticalDetailStack = styled.div`
  display: grid;
  gap: 0.65rem;
  align-content: start;
`;

const ArchitectureDetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SeedbankVisionCard = styled(DetailCard)`
  min-height: auto;
  padding: 0.72rem 0.82rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.66rem 0.72rem;
  }
`;

const LogicStackCard = styled(DetailCard)`
  gap: 0.18rem;
  min-height: auto;
  padding: 0.54rem 0.62rem;
  background: rgba(255, 255, 255, 0.008);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.5rem 0.56rem;
  }
`;

const ArchitectureCard = styled(DetailCard)`
  min-height: auto;
  padding: 0.66rem 0.74rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.6rem 0.66rem;
  }
`;

const LogicStackBody = styled(BodyText)`
  font-size: 0.78rem;
  line-height: 1.48;
`;

const LogicStackLabel = styled(DetailLabel)`
  font-size: 0.64rem;
  letter-spacing: 0.11em;
`;

const renderParagraphs = (activePage: ProjectDeckPage, nodeId: string) =>
  activePage.body.map((paragraph, index) => (
    <BodyText key={`${nodeId}-paragraph-${index}`}>{paragraph}</BodyText>
  ));

export function VorticLogicPanel({
  activePage,
  nodeId,
  isActive,
  hasStoryContent,
  logicHighlightMedia,
  logicMiddleColumnDetails,
  logicThirdColumnDetail
}: VorticLogicPanelProps) {
  return (
    <LogicGrid>
      <LogicTextColumn>
        <StoryHeader>
          <ChapterIndex>{activePage.eyebrow}</ChapterIndex>
          <LogicTitle>{activePage.title}</LogicTitle>
        </StoryHeader>

        {hasStoryContent ? (
          <LogicStoryScroll data-spatial-scroll-lock>
            {renderParagraphs(activePage, nodeId)}
          </LogicStoryScroll>
        ) : null}
      </LogicTextColumn>

      <LogicMediaColumn>
        {logicHighlightMedia[0] ? (
          <LogicPreviewViewport>
            <ResponsiveMedia
              asset={logicHighlightMedia[0]}
              fit="contain"
              frameSizing="fill"
              priority={isActive}
              surfaceVariant="plain"
            />
          </LogicPreviewViewport>
        ) : null}

        {logicMiddleColumnDetails.length ? (
          <VerticalDetailStack>
            {logicMiddleColumnDetails.map((item) => (
              <LogicStackCard key={`${nodeId}-${item.label}`} $compact>
                <LogicStackLabel>{item.label}</LogicStackLabel>
                <LogicStackBody>{item.value}</LogicStackBody>
              </LogicStackCard>
            ))}
          </VerticalDetailStack>
        ) : null}
      </LogicMediaColumn>

      <LogicSideColumn>
        {logicHighlightMedia[1] ? (
          <LogicPreviewViewport>
            <ResponsiveMedia
              asset={logicHighlightMedia[1]}
              fit="contain"
              frameSizing="fill"
              priority={false}
              surfaceVariant="plain"
            />
          </LogicPreviewViewport>
        ) : null}

        {logicThirdColumnDetail ? (
          <VerticalDetailStack>
            <LogicStackCard key={`${nodeId}-${logicThirdColumnDetail.label}`} $compact>
              <LogicStackLabel>{logicThirdColumnDetail.label}</LogicStackLabel>
              <LogicStackBody>{logicThirdColumnDetail.value}</LogicStackBody>
            </LogicStackCard>
          </VerticalDetailStack>
        ) : null}
      </LogicSideColumn>
    </LogicGrid>
  );
}

export function VorticArchitecturePanel({
  activePage,
  nodeId,
  isActive,
  hasStoryContent,
  architectureMediaItems,
  architectureMediaIndex,
  architectureRightDetails,
  onPreviousImage,
  onNextImage
}: VorticArchitecturePanelProps) {
  return (
    <ArchitectureGrid>
      <ArchitectureTextColumn>
        <StoryHeader>
          <ChapterIndex>{activePage.eyebrow}</ChapterIndex>
          <StoryTitle>{activePage.title}</StoryTitle>
        </StoryHeader>

        {hasStoryContent ? (
          <ArchitectureStoryScroll data-spatial-scroll-lock>
            {renderParagraphs(activePage, nodeId)}
          </ArchitectureStoryScroll>
        ) : null}
      </ArchitectureTextColumn>

      <ArchitectureVisualColumn>
        <ArchitecturePreviewViewport>
          <ResponsiveMedia
            asset={architectureMediaItems[architectureMediaIndex] ?? activePage.media}
            fit="contain"
            frameSizing="fit-media"
            priority={isActive}
            surfaceVariant="framed"
          />
        </ArchitecturePreviewViewport>

        {architectureMediaItems.length > 1 ? (
          <MediaSequenceControls
            onNext={onNextImage}
            onPrevious={onPreviousImage}
          />
        ) : null}

        {architectureRightDetails.length ? (
          <ArchitectureDetailGrid>
            {architectureRightDetails.map((item) => (
              <ArchitectureCard key={`${nodeId}-${item.label}`} $compact>
                <DetailLabel>{item.label}</DetailLabel>
                <DetailBody $compact>{item.value}</DetailBody>
              </ArchitectureCard>
            ))}
          </ArchitectureDetailGrid>
        ) : null}
      </ArchitectureVisualColumn>
    </ArchitectureGrid>
  );
}

export function SeedbankProtectedPanel({
  activePage,
  nodeId,
  isActive,
  hasStoryContent,
  seedbankProtectedMedia,
  seedbankProtectedDetails
}: SeedbankProtectedPanelProps) {
  return (
    <ArchitectureGrid>
      <ArchitectureTextColumn>
        <StoryHeader>
          <ChapterIndex>{activePage.eyebrow}</ChapterIndex>
          <SeedbankProtectedTitle>{activePage.title}</SeedbankProtectedTitle>
        </StoryHeader>

        {hasStoryContent ? (
          <ArchitectureStoryScroll data-spatial-scroll-lock>
            {renderParagraphs(activePage, nodeId)}
          </ArchitectureStoryScroll>
        ) : null}
      </ArchitectureTextColumn>

      {seedbankProtectedMedia.map((asset, index) => (
        <SeedbankProtectedImageColumn key={`${nodeId}-${asset.src}-${index}`}>
          <SeedbankProtectedMediaViewport>
            <ResponsiveMedia
              asset={asset}
              fit="contain"
              frameSizing="fit-media"
              priority={index === 0 ? isActive : false}
              surfaceVariant="framed"
            />
          </SeedbankProtectedMediaViewport>

          {seedbankProtectedDetails[index] ? (
            <ArchitectureCard
              key={`${nodeId}-${seedbankProtectedDetails[index].label}`}
              $compact
            >
              <DetailLabel>{seedbankProtectedDetails[index].label}</DetailLabel>
              <DetailBody $compact>{seedbankProtectedDetails[index].value}</DetailBody>
            </ArchitectureCard>
          ) : null}
        </SeedbankProtectedImageColumn>
      ))}
    </ArchitectureGrid>
  );
}

export function SeedbankAuthenticationPanel({
  activePage,
  nodeId,
  isActive,
  hasStoryContent,
  seedbankAuthenticationMedia,
  seedbankAuthenticationDetails
}: SeedbankAuthenticationPanelProps) {
  return (
    <SeedbankAuthenticationLayout>
      <SeedbankAuthenticationTextColumn>
        <StoryHeader>
          <ChapterIndex>{activePage.eyebrow}</ChapterIndex>
          <StoryTitle>{activePage.title}</StoryTitle>
        </StoryHeader>

        {hasStoryContent ? (
          <SeedbankAuthenticationStoryScroll data-spatial-scroll-lock>
            {renderParagraphs(activePage, nodeId)}
          </SeedbankAuthenticationStoryScroll>
        ) : null}
      </SeedbankAuthenticationTextColumn>

      {seedbankAuthenticationMedia.map((asset, index) => (
        <SeedbankVisionColumn key={`${nodeId}-${asset.src}-${index}`}>
          <ResponsiveMedia
            asset={asset}
            fit="contain"
            frameSizing="fill"
            priority={index === 0 ? isActive : false}
            surfaceVariant="framed"
          />

          {seedbankAuthenticationDetails[index] ? (
            <SeedbankVisionCard $compact={false}>
              <DetailLabel>{seedbankAuthenticationDetails[index].label}</DetailLabel>
              <DetailBody $compact={false}>
                {seedbankAuthenticationDetails[index].value}
              </DetailBody>
            </SeedbankVisionCard>
          ) : null}
        </SeedbankVisionColumn>
      ))}
    </SeedbankAuthenticationLayout>
  );
}

export function SeedbankVisionPanel({
  activePage,
  nodeId,
  isActive,
  seedbankVisionMedia,
  seedbankVisionLeadText,
  seedbankVisionText
}: SeedbankVisionPanelProps) {
  return (
    <SeedbankVisionLayout>
      <SeedbankVisionTextColumn>
        <SeedbankVisionHeader>
          <ChapterIndex>{activePage.eyebrow}</ChapterIndex>
          <SeedbankVisionTitle>{activePage.title}</SeedbankVisionTitle>
        </SeedbankVisionHeader>
      </SeedbankVisionTextColumn>

      <SeedbankVisionMediaSection>
        <SeedbankVisionGrid>
          {seedbankVisionMedia.map((asset, index) => (
            <SeedbankVisionColumn key={`${nodeId}-${asset.src}-${index}`}>
              <ResponsiveMedia
                asset={asset}
                fit="contain"
                frameSizing="fill"
                priority={index === 0 ? isActive : false}
                surfaceVariant="framed"
              />

              {index === 0 && seedbankVisionLeadText ? (
                <SeedbankVisionCard $compact={false}>
                  <DetailBody $compact={false}>{seedbankVisionLeadText}</DetailBody>
                </SeedbankVisionCard>
              ) : null}

              {index === 1 && seedbankVisionText ? (
                <SeedbankVisionCard $compact={false}>
                  <DetailBody $compact={false}>{seedbankVisionText}</DetailBody>
                </SeedbankVisionCard>
              ) : null}
            </SeedbankVisionColumn>
          ))}
        </SeedbankVisionGrid>
      </SeedbankVisionMediaSection>
    </SeedbankVisionLayout>
  );
}
