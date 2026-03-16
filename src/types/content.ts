export type ProjectSlug = 'amorae' | 'vortic' | 'seedbank';

export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface MediaAsset {
  kind: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string;
  caption?: string;
  aspectRatio?: string;
}

export interface ProjectSection {
  id: string;
  eyebrow?: string;
  title: string;
  body: string[];
  highlights?: string[];
  media?: MediaAsset;
  gallery?: MediaAsset[];
}

export interface DetailItem {
  label: string;
  value: string;
}

export interface DetailGroup {
  title: string;
  items: DetailItem[];
}

export interface ClosingContent {
  title: string;
  body: string[];
}

export interface SeoContent {
  title: string;
  description: string;
  image?: string;
}

export interface ProjectContent {
  slug: ProjectSlug;
  title: string;
  tagline: string;
  opening: string;
  summary: string;
  heroMedia: MediaAsset;
  sections: ProjectSection[];
  hubDetailGroup?: DetailGroup;
  detailGroups: DetailGroup[];
  closing: ClosingContent;
  gallery: MediaAsset[];
  links: LinkItem[];
  stack: string[];
  seo: SeoContent;
}

export interface HomeHeroContent {
  eyebrow: string;
  name: string;
  title: string;
  shortTitle?: string;
  statement: string;
  supportingText: string;
  primaryCta: LinkItem;
  secondaryCta?: LinkItem;
}

export interface HomeOverviewContent {
  title: string;
  bio: string;
  valueProposition: string;
  availability?: string;
}

export interface LegitimacyItem {
  value?: string;
  label: string;
  description: string;
}

export interface SpecialityItem {
  title: string;
  description: string;
  items?: string[];
}

export interface ContactContent {
  title: string;
  body: string;
  note?: string;
  links: LinkItem[];
}

export interface HomeContent {
  hero: HomeHeroContent;
  overview: HomeOverviewContent;
  legitimacy: {
    title: string;
    items: LegitimacyItem[];
  };
  specialties: {
    title: string;
    items: SpecialityItem[];
    areasOfInterestTitle: string;
    areasOfInterest: string[];
  };
  contact: ContactContent;
}

export interface SiteContent {
  metadata: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    ogImage?: string;
  };
  brand: {
    name: string;
    role: string;
  };
  home: HomeContent;
}
