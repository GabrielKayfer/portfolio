import type { ProjectSlug } from './content';

export type ThemeKey = 'default' | ProjectSlug;

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  themeKey: ThemeKey;
}
