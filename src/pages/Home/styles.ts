import styled from 'styled-components';
import { BodyText } from '../../components/ui/BodyText';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Heading } from '../../components/ui/Heading';
import { ActionPillLink } from '../../components/ui/ActionPill';

export const HomePageRoot = styled.section`
  height: 100%;
  display: grid;
  place-items: center;

  @media (max-width: 48rem) {
    place-items: stretch;
  }
`;

export const HomePageFrame = styled.article`
  --home-scale-width: clamp(0.54, calc(100vw / 1920px), 1);
  --home-scale-height: clamp(0.54, calc(100svh / 945px), 1);
  --home-scale: min(var(--home-scale-width), var(--home-scale-height));

  --home-frame-width: calc(104rem * var(--home-scale));
  --home-frame-height: calc(47rem * var(--home-scale));
  --home-frame-padding-y: max(0.7rem, calc(1.75rem * var(--home-scale)));
  --home-frame-padding-x: max(0.8rem, calc(2rem * var(--home-scale)));
  --home-frame-gap: max(0.55rem, calc(1.1rem * var(--home-scale)));
  --home-layout-gap: max(0.6rem, calc(1.45rem * var(--home-scale)));
  --home-side-gap: max(0.72rem, calc(1.18rem * var(--home-scale)));

  --home-hero-width: clamp(24rem, calc(var(--home-frame-width) * 0.38), 40rem);
  --home-overview-width: clamp(23rem, calc(var(--home-frame-width) * 0.34), 32rem);
  --home-legitimacy-width: clamp(21rem, calc(var(--home-frame-width) * 0.31), 29rem);

  --home-name-size: max(2.35rem, calc(4.5rem * var(--home-scale)));
  --home-name-max: 4.7ch;
  --home-role-size: max(0.78rem, calc(1rem * var(--home-scale)));
  --home-statement-size: max(1.45rem, calc(2.6rem * var(--home-scale)));
  --home-statement-max: 14.5ch;
  --home-support-size: max(0.72rem, calc(0.98rem * var(--home-scale)));
  --home-support-line: 1.42;
  --home-support-width: clamp(34ch, calc(60ch * var(--home-scale)), 60ch);

  --home-card-gap: max(0.24rem, calc(0.55rem * var(--home-scale)));
  --home-card-padding-y: max(0.42rem, calc(0.88rem * var(--home-scale)));
  --home-card-padding-x: max(0.5rem, calc(1rem * var(--home-scale)));

  --home-overview-heading-size: max(1rem, calc(1.45rem * var(--home-scale)));
  --home-overview-body-size: max(0.68rem, calc(0.98rem * var(--home-scale)));
  --home-overview-body-line: 1.34;
  --home-principle-value-size: max(0.72rem, calc(0.98rem * var(--home-scale)));
  --home-principle-label-size: max(0.58rem, calc(0.78rem * var(--home-scale)));
  --home-principle-label-line: 1.22;
  --home-principle-grid-gap: max(0.4rem, calc(0.56rem * var(--home-scale)));
  --home-principle-item-gap: max(0.14rem, calc(0.2rem * var(--home-scale)));
  --home-principle-item-padding-y: max(0.34rem, calc(0.56rem * var(--home-scale)));
  --home-principle-item-padding-x: max(0.42rem, calc(0.64rem * var(--home-scale)));

  --home-label-size: max(0.52rem, calc(0.74rem * var(--home-scale)));
  --home-label-spacing: 0.22em;

  --home-footer-gap: max(0.24rem, calc(0.55rem * var(--home-scale)));
  --home-pill-min-height: max(1.38rem, calc(2.25rem * var(--home-scale)));
  --home-pill-padding-y: max(0.16rem, calc(0.45rem * var(--home-scale)));
  --home-pill-padding-x: max(0.3rem, calc(0.72rem * var(--home-scale)));
  --home-pill-size: max(0.5rem, calc(0.68rem * var(--home-scale)));
  --home-pill-spacing: 0.08em;

  --home-frame-radius: max(1.3rem, calc(3rem * var(--home-scale)));
  --home-shadow-y: calc(24px * var(--home-scale));
  --home-shadow-blur: calc(64px * var(--home-scale));
  --home-decor-scale: max(0.68, calc(var(--home-scale) * 0.96));
  --home-decor-opacity: clamp(0.45, calc(var(--home-scale) * 0.92), 1);

  position: relative;
  width: min(var(--home-frame-width), calc(100% - clamp(1rem, 3vw, 2rem)));
  height: min(
    var(--home-frame-height),
    calc(100svh - clamp(4.25rem, 8vh, 7rem))
  );
  max-height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: var(--home-frame-gap);
  padding:
    var(--home-frame-padding-y)
    var(--home-frame-padding-x)
    calc(var(--home-frame-padding-y) + max(0.1rem, calc(0.2rem * var(--home-scale))));
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: var(--home-frame-radius);
  background:
    radial-gradient(circle at 78% 25%, rgba(255, 255, 255, 0.08), transparent 14%),
    radial-gradient(circle at 72% 78%, rgba(255, 255, 255, 0.06), transparent 22%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.018), rgba(255, 255, 255, 0)),
    ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  box-shadow:
    0 var(--home-shadow-y) var(--home-shadow-blur)
      ${({ theme }) => theme.colors.shadow};

  @media (max-width: 48rem) {
    width: calc(100% - 1.5rem);
    height: auto;
    min-height: 0;
    grid-template-rows: auto auto;
    overflow: auto;
  }
`;

const OrbBase = styled.div`
  position: absolute;
  z-index: 0;
  border-radius: 999px;
  pointer-events: none;
`;

export const HomeOrbLarge = styled(OrbBase)`
  width: calc(20rem * var(--home-decor-scale));
  height: calc(20rem * var(--home-decor-scale));
  right: calc(-2.5rem * var(--home-decor-scale));
  bottom: calc(-3rem * var(--home-decor-scale));
  background: radial-gradient(
    circle at 36% 34%,
    rgba(255, 255, 255, 0.28),
    rgba(255, 255, 255, 0.04) 60%,
    transparent 76%
  );
  opacity: calc(0.58 * var(--home-decor-opacity));
`;

export const HomeOrbSoft = styled(OrbBase)`
  width: calc(15rem * var(--home-decor-scale));
  height: calc(15rem * var(--home-decor-scale));
  right: 18%;
  bottom: 14%;
  background: radial-gradient(
    circle at 40% 40%,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.02) 62%,
    transparent 78%
  );
  opacity: calc(0.7 * var(--home-decor-opacity));
`;

export const HomeOrbSmall = styled(OrbBase)`
  width: calc(4.25rem * var(--home-decor-scale));
  height: calc(4.25rem * var(--home-decor-scale));
  right: calc(6.75rem * var(--home-decor-scale));
  top: calc(3.6rem * var(--home-decor-scale));
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 255, 255, 0.92),
    rgba(255, 255, 255, 0.22) 58%,
    transparent 72%
  );
  opacity: calc(0.92 * var(--home-decor-opacity));
`;

export const HomeRing = styled.div`
  position: absolute;
  z-index: 0;
  width: calc(24rem * var(--home-decor-scale));
  height: calc(24rem * var(--home-decor-scale));
  right: 8%;
  top: 10%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  opacity: calc(0.44 * var(--home-decor-opacity));
`;

export const HomeRingSoft = styled.div`
  position: absolute;
  z-index: 0;
  width: calc(18rem * var(--home-decor-scale));
  height: calc(18rem * var(--home-decor-scale));
  right: 18%;
  top: 24%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  opacity: calc(0.36 * var(--home-decor-opacity));
`;

export const HomeLayout = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: var(--home-layout-gap);
  align-items: center;

  @media (max-width: 48rem) {
    height: auto;
    grid-template-columns: 1fr;
    align-content: start;
    align-items: start;
  }
`;

export const HomeHeroBlock = styled.section`
  width: 100%;
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: start;
  gap: max(0.36rem, calc(0.64rem * var(--home-scale)));
  align-self: center;
  max-width: var(--home-hero-width);
`;

export const HomeName = styled.h1`
  margin: 0;
  max-width: var(--home-name-max);
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: var(--home-name-size);
  line-height: 0.88;
  letter-spacing: -0.09em;
`;

export const HomeRole = styled.p`
  max-width: 24ch;
  color: ${({ theme }) => theme.colors.text};
  font-size: var(--home-role-size);
  line-height: 1.24;
`;

export const HomeStatement = styled.h2`
  margin: 0;
  max-width: var(--home-statement-max);
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: var(--home-statement-size);
  line-height: 0.98;
  letter-spacing: -0.055em;
`;

export const HomeSupportingText = styled(BodyText)`
  max-width: var(--home-support-width);
  font-size: var(--home-support-size);
  line-height: var(--home-support-line);
`;

export const HomeSideRail = styled.aside`
  min-width: 0;
  min-height: 0;
  height: auto;
  width: 100%;
  justify-self: stretch;
  display: grid;
  grid-template-rows: auto auto;
  align-content: center;
  justify-items: end;
  gap: var(--home-side-gap);

  @media (max-width: 48rem) {
    width: 100%;
    justify-self: stretch;
    height: auto;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
    align-content: start;
  }

  @media (max-width: 32rem) {
    grid-template-columns: 1fr;
  }
`;

const HomeSurface = styled.section`
  display: grid;
  gap: var(--home-card-gap);
  padding: var(--home-card-padding-y) var(--home-card-padding-x);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: max(0.95rem, calc(1.5rem * var(--home-scale)));
  background: rgba(255, 255, 255, 0.018);
  backdrop-filter: blur(calc(10px * var(--home-scale)));
`;

export const HomeOverviewSurface = styled(HomeSurface)`
  width: min(100%, var(--home-overview-width));
  justify-self: end;
  padding:
    max(0.54rem, calc(1rem * var(--home-scale)))
    max(0.62rem, calc(1.14rem * var(--home-scale)));
  gap: max(0.26rem, calc(0.55rem * var(--home-scale)));
`;

export const HomeLegitimacySurface = styled(HomeSurface)`
  width: min(100%, var(--home-legitimacy-width));
  justify-self: end;
  padding:
    max(0.44rem, calc(0.84rem * var(--home-scale)))
    max(0.5rem, calc(0.94rem * var(--home-scale)));
  gap: max(0.22rem, calc(0.42rem * var(--home-scale)));

  @media (max-width: 48rem) {
    width: 100%;
    justify-self: stretch;
  }
`;

export const HomeEyebrow = styled(Eyebrow)`
  font-size: var(--home-label-size);
  letter-spacing: var(--home-label-spacing);
`;

export const HomeOverviewHeading = styled(Heading)`
  font-size: 0;
  line-height: 1;

  &::before {
    content: attr(data-copy);
    display: block;
    font-size: var(--home-overview-heading-size);
    line-height: 1.02;
  }
`;

export const HomeOverviewText = styled(BodyText)`
  font-size: var(--home-overview-body-size);
  line-height: var(--home-overview-body-line);
`;

export const HomePrincipleGrid = styled.div`
  display: grid;
  gap: var(--home-principle-grid-gap);
  width: 100%;
`;

export const HomePrincipleItem = styled.div`
  display: grid;
  gap: var(--home-principle-item-gap);
  padding: var(--home-principle-item-padding-y) var(--home-principle-item-padding-x);
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: max(0.82rem, calc(1.02rem * var(--home-scale)));
  background: rgba(255, 255, 255, 0.012);
`;

export const HomePrincipleValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: var(--home-principle-value-size);
  letter-spacing: -0.03em;
`;

export const HomePrincipleLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: var(--home-principle-label-size);
  line-height: var(--home-principle-label-line);
`;

export const HomeFooterBar = styled.footer`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--home-footer-gap);
  padding-top: max(0.3rem, calc(0.7rem * var(--home-scale)));
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const HomeContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--home-footer-gap);
  width: 100%;
`;

export const HomeActionPillLink = styled(ActionPillLink)`
  min-height: var(--home-pill-min-height);
  padding: var(--home-pill-padding-y) var(--home-pill-padding-x);
  font-size: var(--home-pill-size);
  letter-spacing: var(--home-pill-spacing);
`;
