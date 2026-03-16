import { useEffect, useState } from 'react';
import type { ProjectContent } from '../../../types/content';
import { type SpatialNode } from '../config';
import { ProjectScreenChrome } from '../components/ProjectScreenChrome';
import { ProjectStandardPanel } from '../components/ProjectStandardPanel';
import {
  SeedbankAuthenticationPanel,
  SeedbankProtectedPanel,
  SeedbankVisionPanel,
  VorticArchitecturePanel,
  VorticLogicPanel
} from '../components/SpecialProjectPanels';
import { buildProjectDeckPages } from '../projectPages';
import { getProjectScreenState } from '../projectScreenState';

interface ProjectSpatialScreenProps {
  project: ProjectContent;
  node: SpatialNode;
  isActive: boolean;
}

export function ProjectSpatialScreen({
  project,
  node,
  isActive
}: ProjectSpatialScreenProps) {
  const [architectureMediaIndex, setArchitectureMediaIndex] = useState(0);
  const [amoraeExperienceMediaIndex, setAmoraeExperienceMediaIndex] = useState(0);
  const pages = buildProjectDeckPages(project);
  const hubPage = pages[0];
  const activePage =
    pages.find((page) => page.id === (node.pageId ?? hubPage.id)) ?? hubPage;
  const isHub = node.kind === 'hub';
  const screenState = getProjectScreenState(project, activePage);
  const {
    architectureMediaItems,
    architectureRightDetails,
    hasStoryContent,
    isSeedbankAuthenticationPage,
    isSeedbankProtectedPage,
    isSeedbankVisionPage,
    isVorticArchitecturePage,
    isVorticLogicPage,
    isVorticOverviewPage,
    logicHighlightMedia,
    logicMiddleColumnDetails,
    logicThirdColumnDetail,
    seedbankAuthenticationDetails,
    seedbankAuthenticationMedia,
    seedbankProtectedDetails,
    seedbankProtectedMedia,
    seedbankVisionLeadText,
    seedbankVisionMedia,
    seedbankVisionText
  } = screenState;

  useEffect(() => {
    setArchitectureMediaIndex(0);
  }, [activePage.id, node.id, project.slug]);

  useEffect(() => {
    setAmoraeExperienceMediaIndex(0);
  }, [activePage.id, node.id, project.slug]);

  const handleNextArchitectureImage = () => {
    setArchitectureMediaIndex((current) =>
      current === architectureMediaItems.length - 1 ? 0 : current + 1
    );
  };

  const handlePreviousArchitectureImage = () => {
    setArchitectureMediaIndex((current) =>
      current === 0 ? architectureMediaItems.length - 1 : current - 1
    );
  };

  const handleNextAmoraeExperienceImage = () => {
    setAmoraeExperienceMediaIndex((current) =>
      current === screenState.amoraeExperienceMedia.length - 1 ? 0 : current + 1
    );
  };

  const handlePreviousAmoraeExperienceImage = () => {
    setAmoraeExperienceMediaIndex((current) =>
      current === 0 ? screenState.amoraeExperienceMedia.length - 1 : current - 1
    );
  };

  return (
    <>
      <ProjectScreenChrome
        projectLinks={project.links}
        projectSlug={project.slug}
        projectTagline={project.tagline}
        projectTitle={project.title}
        showProjectTag={isHub}
        showSmallOrb={!isVorticOverviewPage && !isVorticArchitecturePage}
        showTagline={isHub && !screenState.isCompactConceptPage}
      >
        {isVorticLogicPage ? (
          <VorticLogicPanel
            activePage={activePage}
            hasStoryContent={hasStoryContent}
            isActive={isActive}
            logicHighlightMedia={logicHighlightMedia}
            logicMiddleColumnDetails={logicMiddleColumnDetails}
            logicThirdColumnDetail={logicThirdColumnDetail}
            nodeId={node.id}
          />
        ) : isVorticArchitecturePage ? (
          <VorticArchitecturePanel
            activePage={activePage}
            architectureMediaIndex={architectureMediaIndex}
            architectureMediaItems={architectureMediaItems}
            architectureRightDetails={architectureRightDetails}
            hasStoryContent={hasStoryContent}
            isActive={isActive}
            nodeId={node.id}
            onNextImage={handleNextArchitectureImage}
            onPreviousImage={handlePreviousArchitectureImage}
          />
        ) : isSeedbankProtectedPage ? (
          <SeedbankProtectedPanel
            activePage={activePage}
            hasStoryContent={hasStoryContent}
            isActive={isActive}
            nodeId={node.id}
            seedbankProtectedDetails={seedbankProtectedDetails}
            seedbankProtectedMedia={seedbankProtectedMedia}
          />
        ) : isSeedbankAuthenticationPage ? (
          <SeedbankAuthenticationPanel
            activePage={activePage}
            hasStoryContent={hasStoryContent}
            isActive={isActive}
            nodeId={node.id}
            seedbankAuthenticationDetails={seedbankAuthenticationDetails}
            seedbankAuthenticationMedia={seedbankAuthenticationMedia}
          />
        ) : isSeedbankVisionPage ? (
          <SeedbankVisionPanel
            activePage={activePage}
            isActive={isActive}
            nodeId={node.id}
            seedbankVisionLeadText={seedbankVisionLeadText}
            seedbankVisionMedia={seedbankVisionMedia}
            seedbankVisionText={seedbankVisionText}
          />
        ) : (
          <ProjectStandardPanel
            activePage={activePage}
            amoraeExperienceMediaIndex={amoraeExperienceMediaIndex}
            isActive={isActive}
            isHub={isHub}
            nodeId={node.id}
            onNextAmoraeExperienceImage={handleNextAmoraeExperienceImage}
            onPreviousAmoraeExperienceImage={handlePreviousAmoraeExperienceImage}
            screenState={screenState}
          />
        )}
      </ProjectScreenChrome>
    </>
  );
}
