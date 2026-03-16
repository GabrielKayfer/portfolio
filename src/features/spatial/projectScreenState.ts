import type { DetailItem, MediaAsset, ProjectContent } from '../../types/content';
import type { ProjectDeckPage } from './projectPages';

export interface ProjectScreenState {
  isVorticOverviewPage: boolean;
  isAmoraeOverviewPage: boolean;
  isAmoraeContextPage: boolean;
  isAmoraeExperiencePage: boolean;
  isAmoraeConstructionPage: boolean;
  isSeedbankOverviewPage: boolean;
  isSeedbankAuthenticationPage: boolean;
  isSeedbankProtectedPage: boolean;
  isSeedbankVisionPage: boolean;
  isCompactConceptPage: boolean;
  isVorticLogicPage: boolean;
  isVorticArchitecturePage: boolean;
  usesCondensedDetails: boolean;
  hasStoryContent: boolean;
  conceptClosingText: string | null;
  conceptQuoteText: string | null;
  seedbankVisionLeadText: string | null;
  seedbankOverviewText: string | null;
  seedbankVisionText: string | null;
  seedbankVisionMedia: MediaAsset[];
  seedbankAuthenticationMedia: MediaAsset[];
  seedbankAuthenticationDetails: DetailItem[];
  seedbankProtectedDetails: DetailItem[];
  seedbankProtectedMedia: MediaAsset[];
  logicHighlightMedia: MediaAsset[];
  logicMiddleColumnDetails: DetailItem[];
  logicThirdColumnDetail: DetailItem | null;
  architectureMediaItems: MediaAsset[];
  amoraeExperienceMedia: MediaAsset[];
  amoraeConstructionMedia: MediaAsset[];
  architectureRightDetails: DetailItem[];
}

const isDefined = <T,>(value: T | undefined): value is T => value !== undefined;

const mergePageMedia = (page: ProjectDeckPage, limit?: number) => {
  const media = [page.media, ...(page.gallery ?? [])];
  return typeof limit === 'number' ? media.slice(0, limit) : media;
};

export const getProjectScreenState = (
  project: ProjectContent,
  activePage: ProjectDeckPage
): ProjectScreenState => {
  const isVorticOverviewPage =
    project.slug === 'vortic' && activePage.id === 'overview';
  const isAmoraeOverviewPage =
    project.slug === 'amorae' && activePage.id === 'overview';
  const isAmoraeContextPage =
    project.slug === 'amorae' && activePage.id === 'contexto';
  const isAmoraeExperiencePage =
    project.slug === 'amorae' && activePage.id === 'experiencia';
  const isAmoraeConstructionPage =
    project.slug === 'amorae' && activePage.id === 'construcao';
  const isSeedbankOverviewPage =
    project.slug === 'seedbank' && activePage.id === 'overview';
  const isSeedbankAuthenticationPage =
    project.slug === 'seedbank' && activePage.id === 'autenticacao';
  const isSeedbankProtectedPage =
    project.slug === 'seedbank' && activePage.id === 'area-protegida';
  const isSeedbankVisionPage =
    project.slug === 'seedbank' && activePage.id === 'visao-geral';
  const isCompactConceptPage =
    project.slug === 'vortic' && activePage.id === 'tese';
  const isVorticLogicPage =
    project.slug === 'vortic' && activePage.id === 'logica';
  const isVorticArchitecturePage =
    project.slug === 'vortic' && activePage.id === 'arquitetura';
  const usesCondensedDetails = isCompactConceptPage || isVorticLogicPage;
  const hasStoryContent =
    activePage.body.length > 0 || activePage.highlights.length > 0;

  return {
    isVorticOverviewPage,
    isAmoraeOverviewPage,
    isAmoraeContextPage,
    isAmoraeExperiencePage,
    isAmoraeConstructionPage,
    isSeedbankOverviewPage,
    isSeedbankAuthenticationPage,
    isSeedbankProtectedPage,
    isSeedbankVisionPage,
    isCompactConceptPage,
    isVorticLogicPage,
    isVorticArchitecturePage,
    usesCondensedDetails,
    hasStoryContent,
    conceptClosingText:
      isCompactConceptPage && activePage.details.length
        ? activePage.details[0]?.value
        : null,
    conceptQuoteText:
      isCompactConceptPage && activePage.details.length > 1
        ? activePage.details[1]?.value
        : null,
    seedbankVisionLeadText:
      isSeedbankVisionPage && activePage.body.length ? activePage.body[0] : null,
    seedbankOverviewText:
      isSeedbankOverviewPage && activePage.details.length
        ? activePage.details[0]?.value
        : null,
    seedbankVisionText:
      isSeedbankVisionPage && activePage.details.length
        ? activePage.details[0]?.value
        : null,
    seedbankVisionMedia: isSeedbankVisionPage ? mergePageMedia(activePage, 2) : [],
    seedbankAuthenticationMedia: isSeedbankAuthenticationPage
      ? mergePageMedia(activePage, 2)
      : [],
    seedbankAuthenticationDetails: isSeedbankAuthenticationPage
      ? activePage.details.slice(0, 2)
      : [],
    seedbankProtectedDetails: isSeedbankProtectedPage
      ? activePage.details.slice(0, 2)
      : [],
    seedbankProtectedMedia: isSeedbankProtectedPage
      ? [...(activePage.gallery ?? []).slice(0, 1), activePage.media]
      : [],
    logicHighlightMedia: isVorticLogicPage ? mergePageMedia(activePage, 2) : [],
    logicMiddleColumnDetails: isVorticLogicPage
      ? activePage.details.slice(1, 3)
      : [],
    logicThirdColumnDetail: isVorticLogicPage ? activePage.details[0] ?? null : null,
    architectureMediaItems: isVorticArchitecturePage
      ? mergePageMedia(activePage)
      : [],
    amoraeExperienceMedia: isAmoraeExperiencePage
      ? mergePageMedia(activePage, 3)
      : [],
    amoraeConstructionMedia: isAmoraeConstructionPage
      ? mergePageMedia(activePage, 2)
      : [],
    architectureRightDetails: isVorticArchitecturePage
      ? [activePage.details[3], activePage.details[2]].filter(isDefined)
      : []
  };
};
