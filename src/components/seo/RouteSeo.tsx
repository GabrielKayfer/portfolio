import { Helmet } from 'react-helmet-async';
import { siteContent } from '../../content/site';

interface RouteSeoProps {
  title: string;
  description: string;
  image?: string;
}

export function RouteSeo({ title, description, image }: RouteSeoProps) {
  const ogImage = image ?? siteContent.metadata.ogImage;

  return (
    <Helmet>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      {ogImage ? <meta content={ogImage} property="og:image" /> : null}
    </Helmet>
  );
}
