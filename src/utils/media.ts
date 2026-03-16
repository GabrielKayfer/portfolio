import type { MediaAsset } from '../types/content';

export const resolvePosterSource = (asset: MediaAsset) =>
  asset.poster ?? (asset.kind === 'image' ? asset.src : undefined);
