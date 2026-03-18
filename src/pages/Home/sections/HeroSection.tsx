import { MetaList } from '../../../components/ui/MetaList';
import type { HomeHeroContent } from '../../../types/content';
import {
  HomeEyebrow,
  HomeHeroBlock,
  HomeName,
  HomeRole,
  HomeStatement,
  HomeSupportingText
} from '../styles';

interface HeroSectionProps {
  hero: HomeHeroContent;
  featuredSkills: string[];
}

export function HeroSection({
  hero,
  featuredSkills
}: HeroSectionProps) {
  return (
    <HomeHeroBlock>
      <HomeEyebrow>{hero.eyebrow}</HomeEyebrow>
      <HomeName>{hero.name}</HomeName>
      <HomeRole>{hero.shortTitle ?? hero.title}</HomeRole>
      <HomeStatement>{hero.statement}</HomeStatement>
      <HomeSupportingText>{hero.supportingText}</HomeSupportingText>

      <MetaList items={featuredSkills} />
    </HomeHeroBlock>
  );
}
