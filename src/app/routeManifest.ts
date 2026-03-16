import { projectsBySlug } from '../content/projects';
import { siteContent } from '../content/site';
import type { ProjectSlug } from '../types/content';
import type { RouteMeta } from '../types/router';
import { resolveSpatialNode } from '../features/spatial/config';

export const routeManifest: RouteMeta[] = [
  {
    path: '/',
    title: siteContent.metadata.defaultTitle,
    description: siteContent.metadata.defaultDescription,
    themeKey: 'default'
  },
  ...Object.values(projectsBySlug).map((project) => ({
    path: `/projetos/${project.slug}`,
    title: project.seo.title,
    description: project.seo.description,
    themeKey: project.slug
  })),
  {
    path: '*',
    title: `404 | ${siteContent.metadata.siteName}`,
    description: 'Pagina nao encontrada.',
    themeKey: 'default'
  }
];

export const getProjectPath = (slug: ProjectSlug) => `/projetos/${slug}`;

export const resolveRouteMeta = (pathname: string): RouteMeta => {
  const matched = routeManifest.find((route) => route.path === pathname);

  if (matched) {
    return matched;
  }

  const spatialNode = resolveSpatialNode(pathname);

  if (spatialNode?.projectSlug) {
    const project = projectsBySlug[spatialNode.projectSlug];

    if (project) {
      return {
        path: getProjectPath(project.slug),
        title: project.seo.title,
        description: project.seo.description,
        themeKey: project.slug
      };
    }
  }

  return routeManifest[routeManifest.length - 1];
};
