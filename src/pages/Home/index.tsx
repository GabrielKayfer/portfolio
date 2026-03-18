import { siteContent } from '../../content/site';
import { FooterSection } from './sections/FooterSection';
import { HeroSection } from './sections/HeroSection';
import { OverviewSection } from './sections/OverviewSection';
import {
  HomeLayout,
  HomeOrbLarge,
  HomeOrbSmall,
  HomeOrbSoft,
  HomePageFrame,
  HomePageRoot,
  HomeRing,
  HomeRingSoft
} from './styles';

export function HomePage() {
  const { hero, overview, legitimacy, specialties, contact } = siteContent.home;
  const featuredSkills = specialties.items
    .flatMap((item) => item.items ?? [])
    .slice(0, 4);

  return (
    <HomePageRoot>
      <HomePageFrame>
        <HomeOrbLarge />
        <HomeOrbSoft />
        <HomeOrbSmall />
        <HomeRing />
        <HomeRingSoft />

        <HomeLayout>
          <HeroSection hero={hero} featuredSkills={featuredSkills} />
          <OverviewSection legitimacy={legitimacy} overview={overview} />
        </HomeLayout>

        <FooterSection contact={contact} />
      </HomePageFrame>
    </HomePageRoot>
  );
}
