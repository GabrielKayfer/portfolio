import styled from 'styled-components';
import { siteContent } from '../../../content/site';
import { BodyText } from '../../../components/ui/BodyText';
import { Eyebrow } from '../../../components/ui/Eyebrow';
import { Heading } from '../../../components/ui/Heading';
import { MetaList } from '../../../components/ui/MetaList';
import { ActionPillLink } from '../components/ActionPill';

const Root = styled.section`
  height: 100%;
  display: grid;
  place-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    place-items: stretch;
  }
`;

const Frame = styled.article`
  position: relative;
  width: min(100%, 74rem);
  height: min(100%, 41rem);
  max-height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.85rem;
  padding: clamp(1.2rem, 2.2vw, 2rem);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: clamp(2rem, 3vw, 3rem);
  background:
    radial-gradient(circle at 78% 25%, rgba(255, 255, 255, 0.08), transparent 14%),
    radial-gradient(circle at 72% 78%, rgba(255, 255, 255, 0.06), transparent 22%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.018), rgba(255, 255, 255, 0)),
    ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  box-shadow: 0 24px 64px ${({ theme }) => theme.colors.shadow};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 100%;
    grid-template-rows: auto auto;
    padding: 1rem 1rem 1.2rem;
    border-radius: 2rem;
    overflow: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.9rem 0.85rem 1rem;
    gap: 0.75rem;
    border-radius: 1.5rem;
  }
`;

const Orb = styled.div`
  position: absolute;
  z-index: 0;
  border-radius: 999px;
  pointer-events: none;
`;

const OrbLarge = styled(Orb)`
  width: clamp(14rem, 23vw, 20rem);
  height: clamp(14rem, 23vw, 20rem);
  right: -2.5rem;
  bottom: -3rem;
  background: radial-gradient(
    circle at 36% 34%,
    rgba(255, 255, 255, 0.28),
    rgba(255, 255, 255, 0.04) 60%,
    transparent 76%
  );
  opacity: 0.58;
`;

const OrbSoft = styled(Orb)`
  width: clamp(11rem, 18vw, 15rem);
  height: clamp(11rem, 18vw, 15rem);
  right: 18%;
  bottom: 14%;
  background: radial-gradient(
    circle at 40% 40%,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.02) 62%,
    transparent 78%
  );
`;

const OrbSmall = styled(Orb)`
  width: clamp(3.5rem, 5vw, 4.25rem);
  height: clamp(3.5rem, 5vw, 4.25rem);
  right: clamp(4.25rem, 8vw, 6.75rem);
  top: clamp(2rem, 5vw, 3.6rem);
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 255, 255, 0.92),
    rgba(255, 255, 255, 0.22) 58%,
    transparent 72%
  );
`;

const Ring = styled.div`
  position: absolute;
  z-index: 0;
  width: clamp(17rem, 28vw, 24rem);
  height: clamp(17rem, 28vw, 24rem);
  right: 8%;
  top: 10%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  opacity: 0.44;
`;

const RingSoft = styled.div`
  position: absolute;
  z-index: 0;
  width: clamp(12rem, 20vw, 18rem);
  height: clamp(12rem, 20vw, 18rem);
  right: 18%;
  top: 24%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  opacity: 0.36;
`;

const Layout = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(17rem, 0.82fr);
  gap: clamp(0.9rem, 1.8vw, 1.5rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    align-content: start;
    gap: 1rem;
  }
`;

const HeroBlock = styled.div`
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: start;
  gap: 0.58rem;
  padding-top: 0.15rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.48rem;
    padding-top: 0;
  }
`;

const Name = styled.h1`
  margin: 0;
  max-width: 4.7ch;
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: clamp(2.35rem, 4.8vw, 4rem);
  line-height: 0.88;
  letter-spacing: -0.09em;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 5.6ch;
    font-size: clamp(2rem, 11vw, 3rem);
    line-height: 0.92;
  }
`;

const Role = styled.p`
  max-width: 22ch;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.92rem;
  line-height: 1.36;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: none;
    font-size: 0.88rem;
  }
`;

const Statement = styled.h2`
  margin: 0;
  max-width: 15ch;
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: clamp(1.55rem, 2.8vw, 2.45rem);
  line-height: 1;
  letter-spacing: -0.055em;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 13ch;
    font-size: clamp(1.35rem, 7vw, 1.9rem);
  }
`;

const SupportingText = styled(BodyText)`
  max-width: 54ch;
  font-size: 0.92rem;
  line-height: 1.58;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.88rem;
    line-height: 1.52;
  }
`;

const SideRail = styled.aside`
  min-width: 0;
  display: grid;
  grid-template-rows: auto auto;
  align-content: start;
  gap: 0.65rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
    gap: 0.75rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Surface = styled.section`
  display: grid;
  gap: 0.55rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.018);
  backdrop-filter: blur(10px);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.72rem 0.78rem;
    border-radius: 1.2rem;
  }
`;

const PrincipleGrid = styled.div`
  display: grid;
  gap: 0.48rem;
`;

const PrincipleItem = styled.div`
  display: grid;
  gap: 0.16rem;
`;

const PrincipleValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontDisplay};
  font-size: 1rem;
  letter-spacing: -0.03em;
`;

const PrincipleLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
  line-height: 1.48;
`;

const FooterBar = styled.footer`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.7rem;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.6rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 0.55rem;
  }
`;

const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  width: 100%;
`;

export function HomeSpatialScreen() {
  const {
    hero,
    overview,
    legitimacy,
    specialties,
    contact
  } = siteContent.home;
  const featuredSkills = specialties.items
    .flatMap((item) => item.items ?? [])
    .slice(0, 4);

  return (
    <Root>
      <Frame>
        <OrbLarge />
        <OrbSoft />
        <OrbSmall />
        <Ring />
        <RingSoft />

        <Layout>
          <HeroBlock>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <Name>{hero.name}</Name>
            <Role>{hero.shortTitle ?? hero.title}</Role>
            <Statement>{hero.statement}</Statement>
            <SupportingText>{hero.supportingText}</SupportingText>
            <MetaList items={featuredSkills} />
          </HeroBlock>

          <SideRail>
            <Surface>
              <Eyebrow>{overview.title}</Eyebrow>
              <Heading as="h2" size="lg">
                Código, produto e experiência na mesma direção.
              </Heading>
              <BodyText>{overview.valueProposition}</BodyText>
              <BodyText>{overview.bio}</BodyText>
              {overview.availability ? (
                <BodyText>{overview.availability}</BodyText>
              ) : null}
            </Surface>

            <Surface>
              <PrincipleGrid>
                {legitimacy.items.map((item) => (
                  <PrincipleItem key={item.label}>
                    <PrincipleValue>{item.value ?? item.label}</PrincipleValue>
                    <PrincipleLabel>{item.description}</PrincipleLabel>
                  </PrincipleItem>
                ))}
              </PrincipleGrid>
            </Surface>
          </SideRail>
        </Layout>

        <FooterBar>
          <ContactRow>
            {contact.links.map((link) => (
              <ActionPillLink
                key={link.label}
                href={link.href}
                rel={link.external ? 'noreferrer' : undefined}
                target={link.external ? '_blank' : undefined}
              >
                {link.label}
              </ActionPillLink>
            ))}
          </ContactRow>
        </FooterBar>
      </Frame>
    </Root>
  );
}
