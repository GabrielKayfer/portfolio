import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Eyebrow } from '../../../components/ui/Eyebrow';
import { Tag } from '../../../components/ui/Tag';
import type { LinkItem, ProjectSlug } from '../../../types/content';
import { ActionPillLink } from './ActionPill';

interface ProjectScreenChromeProps {
  projectSlug: ProjectSlug;
  projectTitle: string;
  projectTagline: string;
  projectLinks: LinkItem[];
  showProjectTag: boolean;
  showTagline: boolean;
  showSmallOrb: boolean;
  children: ReactNode;
}

const variantStyles = {
  amorae: css`
    right: -2rem;
    bottom: -2rem;
  `,
  vortic: css`
    right: 8%;
    bottom: -3.2rem;
  `,
  seedbank: css`
    right: -1rem;
    bottom: -4rem;
  `
} as const;

const ringStyles = {
  amorae: css`
    right: 5%;
    top: 14%;
  `,
  vortic: css`
    right: 12%;
    top: 10%;
  `,
  seedbank: css`
    right: 10%;
    top: 18%;
  `
} as const;

const smallOrbStyles = {
  amorae: css`
    top: 2.4rem;
    right: 4.6rem;
  `,
  vortic: css`
    bottom: 26%;
    right: 10%;
  `,
  seedbank: css`
    top: 2rem;
    right: 6.6rem;
  `
} as const;

const Root = styled.section`
  height: 100%;
  display: grid;
  place-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    place-items: stretch;
  }
`;

const Page = styled.article`
  position: relative;
  box-sizing: border-box;
  width: min(100%, 96rem);
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 1.15rem;
  padding:
    clamp(1.2rem, 2.4vw, 1.85rem)
    clamp(1.5rem, 3vw, 2.4rem)
    clamp(2.4rem, 4.8vw, 3.6rem);
  background:
    radial-gradient(circle at 76% 24%, rgba(255, 255, 255, 0.06), transparent 14%),
    radial-gradient(circle at 70% 72%, rgba(255, 255, 255, 0.04), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0));
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    gap: 1rem;
    padding: 1rem 1rem 2.4rem;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.85rem;
    padding: 0.8rem 0.8rem 2rem;
  }
`;

const Orb = styled.div`
  position: absolute;
  z-index: 0;
  border-radius: 999px;
  pointer-events: none;
`;

const OrbLarge = styled(Orb)<{ $variant: ProjectSlug }>`
  width: clamp(12rem, 22vw, 19rem);
  height: clamp(12rem, 22vw, 19rem);
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.04) 58%,
    transparent 74%
  );
  opacity: 0.5;
  ${({ $variant }) => variantStyles[$variant]}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    opacity: 0.34;
    transform: scale(0.82);
    transform-origin: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    opacity: 0.22;
    transform: scale(0.68);
  }
`;

const OrbSmall = styled(Orb)<{ $variant: ProjectSlug }>`
  width: clamp(3.5rem, 5vw, 4.6rem);
  height: clamp(3.5rem, 5vw, 4.6rem);
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 255, 255, 0.94),
    rgba(255, 255, 255, 0.24) 58%,
    transparent 72%
  );
  ${({ $variant }) => smallOrbStyles[$variant]}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    opacity: 0.7;
    transform: scale(0.84);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const Ring = styled.div<{ $variant: ProjectSlug }>`
  position: absolute;
  z-index: 0;
  width: clamp(16rem, 28vw, 24rem);
  height: clamp(16rem, 28vw, 24rem);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  opacity: 0.38;
  ${({ $variant }) => ringStyles[$variant]}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    opacity: 0.24;
    transform: scale(0.84);
    transform-origin: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    opacity: 0.18;
    transform: scale(0.7);
  }
`;

const RingSoft = styled.div<{ $variant: ProjectSlug }>`
  position: absolute;
  z-index: 0;
  width: clamp(10rem, 18vw, 15rem);
  height: clamp(10rem, 18vw, 15rem);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 50%;
  opacity: 0.3;
  ${({ $variant }) =>
    $variant === 'vortic'
      ? css`
          right: 4%;
          top: 24%;
        `
      : css`
          right: 16%;
          top: 28%;
        `}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    opacity: 0.22;
    transform: scale(0.84);
    transform-origin: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const Header = styled.header`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 0.9rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
  }
`;

const HeaderCopy = styled.div`
  display: grid;
  gap: 0.85rem;
  max-width: 36rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.65rem;
  }
`;

const ProjectTag = styled(Tag)`
  justify-self: start;
  margin-left: -1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: -0.8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-left: -0.45rem;
  }
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.55rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

export function ProjectScreenChrome({
  projectSlug,
  projectTitle,
  projectTagline,
  projectLinks,
  showProjectTag,
  showTagline,
  showSmallOrb,
  children
}: ProjectScreenChromeProps) {
  return (
    <Root>
      <Page>
        <OrbLarge $variant={projectSlug} />
        {showSmallOrb ? <OrbSmall $variant={projectSlug} /> : null}
        <Ring $variant={projectSlug} />
        <RingSoft $variant={projectSlug} />

        <Header>
          <HeaderCopy>
            {showProjectTag ? <ProjectTag>{projectTitle}</ProjectTag> : null}
            {showTagline ? <Eyebrow>{projectTagline}</Eyebrow> : null}
          </HeaderCopy>

          <LinkRow>
            {projectLinks.map((link) => (
              <ActionPillLink
                key={link.label}
                href={link.href}
                rel={link.external ? 'noreferrer' : undefined}
                target={link.external ? '_blank' : undefined}
              >
                {link.label}
              </ActionPillLink>
            ))}
          </LinkRow>
        </Header>

        {children}
      </Page>
    </Root>
  );
}
