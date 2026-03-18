import { ProjectAmoraePage } from '../../../pages/ProjectAmorae';
import { ProjectSeedbankPage } from '../../../pages/ProjectSeedbank';
import { ProjectVorticPage } from '../../../pages/ProjectVortic';
import type { ProjectContent } from '../../../types/content';
import { type SpatialNode } from '../config';
import { buildProjectDeckPages } from '../projectPages';

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
  const pages = buildProjectDeckPages(project);
  const hubPage = pages[0];
  const activePage =
    pages.find((page) => page.id === (node.pageId ?? hubPage.id)) ?? hubPage;

  switch (project.slug) {
    case 'amorae':
      return (
        <ProjectAmoraePage
          activePage={activePage}
          isActive={isActive}
          project={project}
        />
      );
    case 'seedbank':
      return (
        <ProjectSeedbankPage
          activePage={activePage}
          isActive={isActive}
          project={project}
        />
      );
    case 'vortic':
      return (
        <ProjectVorticPage
          activePage={activePage}
          isActive={isActive}
          project={project}
        />
      );
  }
}
