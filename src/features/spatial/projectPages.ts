import type {
  DetailItem,
  MediaAsset,
  ProjectContent,
  ProjectSlug
} from '../../types/content';

export interface ProjectDeckPage {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string[];
  highlights: string[];
  media: MediaAsset;
  detailTitle?: string;
  details: DetailItem[];
  gallery?: MediaAsset[];
}

const buildStillAsset = (
  asset: MediaAsset,
  fallbackAsset?: MediaAsset
): MediaAsset => {
  if (asset.kind === 'image') {
    return asset;
  }

  if (asset.poster) {
    return {
      kind: 'image',
      src: asset.poster,
      alt: asset.alt,
      caption: asset.caption,
      aspectRatio: asset.aspectRatio
    };
  }

  return fallbackAsset ?? asset;
};

const getSupportingGallery = (
  gallery: MediaAsset[],
  primarySrc: string,
  startIndex: number,
  count = 1
) => {
  const filtered = gallery.filter((item) => item.src !== primarySrc);
  return filtered.slice(startIndex, startIndex + count);
};

export const getProjectPanelPath = (
  slug: ProjectSlug,
  panelId?: string
) => {
  if (!panelId || panelId === 'overview') {
    return `/projetos/${slug}`;
  }

  return `/projetos/${slug}/${panelId}`;
};

export const buildProjectDeckPages = (
  project: ProjectContent
): ProjectDeckPage[] => {
  const fallbackImage =
    project.gallery[0] ??
    buildStillAsset(project.heroMedia, {
      kind: 'image',
      src: project.heroMedia.poster ?? '',
      alt: project.heroMedia.alt,
      aspectRatio: project.heroMedia.aspectRatio
    });

  const overviewDetails =
    project.hubDetailGroup?.items ?? project.detailGroups[0]?.items ?? [];
  const overviewTitle =
    project.hubDetailGroup?.title ?? project.detailGroups[0]?.title;

  return [
    {
      id: 'overview',
      label: 'Entrada',
      eyebrow: project.title,
      title: project.opening,
      body: [project.summary],
      highlights: project.stack,
      media: buildStillAsset(project.heroMedia, fallbackImage),
      detailTitle: overviewTitle,
      details: overviewDetails,
      gallery: getSupportingGallery(
        project.gallery,
        buildStillAsset(project.heroMedia, fallbackImage).src,
        0
      )
    },
    ...project.sections.map((section, index) => {
      const sectionMedia = section.media ?? project.gallery[index] ?? fallbackImage;
      const stillMedia = buildStillAsset(sectionMedia, fallbackImage);
      const sectionGallery =
        section.gallery ??
        ((project.slug === 'vortic' && section.id === 'tese')
          ? undefined
          : getSupportingGallery(project.gallery, stillMedia.src, index + 1));

      return {
        id: section.id,
        label: section.eyebrow ?? `Bloco ${index + 1}`,
        eyebrow: section.eyebrow ?? project.title,
        title: section.title,
        body: section.body,
        highlights: section.highlights ?? [],
        media: stillMedia,
        detailTitle: project.detailGroups[index]?.title,
        details: project.detailGroups[index]?.items ?? [],
        gallery: sectionGallery
      };
    })
  ];
};
