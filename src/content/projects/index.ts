import type { ProjectContent, ProjectSlug } from '../../types/content';
import { amoraeProject } from './amorae';
import { seedbankProject } from './seedbank';
import { vorticProject } from './vortic';

export const projects = [amoraeProject, vorticProject, seedbankProject] satisfies ProjectContent[];

export const projectsBySlug: Record<ProjectSlug, ProjectContent> = {
  amorae: amoraeProject,
  vortic: vorticProject,
  seedbank: seedbankProject
};
