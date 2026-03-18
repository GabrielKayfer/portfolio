import type { HomeContent } from '../../../types/content';
import {
  HomeEyebrow,
  HomeLegitimacySurface,
  HomeOverviewHeading,
  HomeOverviewSurface,
  HomeOverviewText,
  HomePrincipleGrid,
  HomePrincipleItem,
  HomePrincipleLabel,
  HomePrincipleValue,
  HomeSideRail
} from '../styles';

interface OverviewSectionProps {
  overview: HomeContent['overview'];
  legitimacy: HomeContent['legitimacy'];
}

const OVERVIEW_HEADING_COPY = 'Código, produto e experiência na mesma direção.';

export function OverviewSection({
  overview,
  legitimacy
}: OverviewSectionProps) {
  return (
    <HomeSideRail>
      <HomeOverviewSurface>
        <HomeEyebrow>{overview.title}</HomeEyebrow>
        <HomeOverviewHeading
          as="h2"
          size="lg"
          aria-label={OVERVIEW_HEADING_COPY}
          data-copy={OVERVIEW_HEADING_COPY}
        >
          {OVERVIEW_HEADING_COPY}
        </HomeOverviewHeading>
        <HomeOverviewText>{overview.valueProposition}</HomeOverviewText>
        <HomeOverviewText>{overview.bio}</HomeOverviewText>
        {overview.availability ? (
          <HomeOverviewText>{overview.availability}</HomeOverviewText>
        ) : null}
      </HomeOverviewSurface>

      <HomeLegitimacySurface>
        <HomePrincipleGrid>
          {legitimacy.items.map((item) => (
            <HomePrincipleItem key={item.label}>
              <HomePrincipleValue>{item.value ?? item.label}</HomePrincipleValue>
              <HomePrincipleLabel>{item.description}</HomePrincipleLabel>
            </HomePrincipleItem>
          ))}
        </HomePrincipleGrid>
      </HomeLegitimacySurface>
    </HomeSideRail>
  );
}
