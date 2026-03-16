import { projectsBySlug } from '../../content/projects';
import { siteContent } from '../../content/site';
import type { ProjectSlug } from '../../types/content';
import { buildProjectDeckPages, getProjectPanelPath } from './projectPages';

export type SpatialDirection = 'left' | 'right' | 'up' | 'down';
export type SpatialNodeId = 'home' | ProjectSlug | `${ProjectSlug}:${string}`;
export type SpatialNodeKind = 'home' | 'hub' | 'detail';

export interface SpatialCoordinates {
  x: number;
  y: number;
}

export interface SpatialNode {
  id: SpatialNodeId;
  kind: SpatialNodeKind;
  label: string;
  path: string;
  coordinates: SpatialCoordinates;
  projectSlug?: ProjectSlug;
  pageId?: string;
  neighbors: Partial<Record<SpatialDirection, SpatialNodeId>>;
}

const projectHubHomeDirections: Record<ProjectSlug, SpatialDirection> = {
  amorae: 'right',
  vortic: 'left',
  seedbank: 'up'
};

const projectDetailDirections: Record<
  ProjectSlug,
  readonly [SpatialDirection, SpatialDirection, SpatialDirection]
> = {
  amorae: ['left', 'up', 'down'],
  vortic: ['up', 'right', 'down'],
  seedbank: ['left', 'right', 'down']
};

const homeNeighbors: Partial<Record<SpatialDirection, ProjectSlug>> = {
  left: 'amorae',
  right: 'vortic',
  down: 'seedbank'
};

const projectHubCoordinates: Record<ProjectSlug, SpatialCoordinates> = {
  amorae: { x: -1, y: 0 },
  vortic: { x: 1, y: 0 },
  seedbank: { x: 0, y: 1 }
};

const projectDetailOffsets: Record<
  ProjectSlug,
  Partial<Record<SpatialDirection, SpatialCoordinates>>
> = {
  amorae: {
    left: { x: -1, y: 0 },
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 }
  },
  vortic: {
    up: { x: 0, y: -1 },
    right: { x: 1, y: 0 },
    down: { x: 0, y: 1 }
  },
  // Seedbank uses shorter horizontal offsets to avoid coordinate collisions
  // with neighboring project detail nodes while preserving left/right relation.
  seedbank: {
    left: { x: -0.5, y: 0 },
    right: { x: 0.5, y: 0 },
    down: { x: 0, y: 1 }
  }
};

const normalizePath = (path: string) => {
  if (path === '/') {
    return path;
  }

  return path.replace(/\/+$/, '');
};

const createDetailNodeId = (slug: ProjectSlug, pageId: string) =>
  `${slug}:${pageId}` as SpatialNodeId;

export const getOppositeDirection = (
  direction: SpatialDirection
): SpatialDirection => {
  switch (direction) {
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'up':
      return 'down';
    case 'down':
      return 'up';
  }
};

const projectNodes = Object.values(projectsBySlug).flatMap((project) => {
  const pages = buildProjectDeckPages(project);
  const hubPage = pages[0];
  const detailDirectionsForProject = projectDetailDirections[project.slug];
  const hubCoordinates = projectHubCoordinates[project.slug];
  const detailPages = pages.slice(1, 1 + detailDirectionsForProject.length);
  const detailNeighbors = Object.fromEntries(
    detailPages.map((page, index) => [
      detailDirectionsForProject[index],
      createDetailNodeId(project.slug, page.id)
    ])
  ) as Partial<Record<SpatialDirection, SpatialNodeId>>;

  const hubNode: SpatialNode = {
    id: project.slug,
    kind: 'hub',
    label: project.title,
    path: getProjectPanelPath(project.slug),
    coordinates: hubCoordinates,
    projectSlug: project.slug,
    pageId: hubPage.id,
    neighbors: {
      [projectHubHomeDirections[project.slug]]: 'home',
      ...detailNeighbors
    }
  };

  const detailNodes = detailPages.map((page, index) => {
    const direction = detailDirectionsForProject[index];
    const offset = projectDetailOffsets[project.slug][direction];

    if (!offset) {
      throw new Error(`Missing spatial coordinate offset for ${project.slug}:${direction}.`);
    }

    return {
      id: createDetailNodeId(project.slug, page.id),
      kind: 'detail',
      label: page.label,
      path: getProjectPanelPath(project.slug, page.id),
      coordinates: {
        x: hubCoordinates.x + offset.x,
        y: hubCoordinates.y + offset.y
      },
      projectSlug: project.slug,
      pageId: page.id,
      neighbors: {
        [getOppositeDirection(direction)]: project.slug
      }
    } satisfies SpatialNode;
  });

  return [hubNode, ...detailNodes];
});

const nodes = [
  {
    id: 'home',
    kind: 'home',
    label: siteContent.brand.name,
    path: '/',
    coordinates: { x: 0, y: 0 },
    neighbors: homeNeighbors
  } satisfies SpatialNode,
  ...projectNodes
];

export const spatialNodes = Object.fromEntries(
  nodes.map((node) => [node.id, node])
) as Record<SpatialNodeId, SpatialNode>;

const spatialPaths = new Map(
  nodes.map((node) => [normalizePath(node.path), node.id] as const)
);

export const resolveSpatialNodeId = (pathname: string): SpatialNodeId | null =>
  spatialPaths.get(normalizePath(pathname)) ?? null;

export const resolveSpatialNode = (pathname: string): SpatialNode | null => {
  const nodeId = resolveSpatialNodeId(pathname);
  return nodeId ? spatialNodes[nodeId] : null;
};

export const getDirectionBetweenNodes = (
  fromId: SpatialNodeId,
  toId: SpatialNodeId
): SpatialDirection | null => {
  const fromNode = spatialNodes[fromId];

  if (!fromNode) {
    return null;
  }

  const entry = Object.entries(fromNode.neighbors).find(
    ([, targetId]) => targetId === toId
  );

  return (entry?.[0] as SpatialDirection | undefined) ?? null;
};

export const areNodesDirectNeighbors = (
  fromId: SpatialNodeId,
  toId: SpatialNodeId
) => {
  const directDirection = getDirectionBetweenNodes(fromId, toId);

  if (directDirection) {
    return true;
  }

  return getDirectionBetweenNodes(toId, fromId) !== null;
};

export const getDirectionFromCoordinates = (
  current: SpatialCoordinates,
  target: SpatialCoordinates
): SpatialDirection | null => {
  const deltaX = target.x - current.x;
  const deltaY = target.y - current.y;

  if (deltaX === 0 && deltaY === 0) {
    return null;
  }

  if (deltaX !== 0 && deltaY === 0) {
    return deltaX < 0 ? 'left' : 'right';
  }

  if (deltaY !== 0 && deltaX === 0) {
    return deltaY < 0 ? 'up' : 'down';
  }

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX < 0 ? 'left' : 'right';
  }

  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    return deltaY < 0 ? 'up' : 'down';
  }

  return null;
};

export const getNavigationDirection = (
  fromId: SpatialNodeId,
  toId: SpatialNodeId
): SpatialDirection | null => {
  const fromNode = spatialNodes[fromId];
  const toNode = spatialNodes[toId];

  if (!fromNode || !toNode) {
    return null;
  }

  if (!areNodesDirectNeighbors(fromId, toId)) {
    return null;
  }

  return getDirectionFromCoordinates(fromNode.coordinates, toNode.coordinates);
};
