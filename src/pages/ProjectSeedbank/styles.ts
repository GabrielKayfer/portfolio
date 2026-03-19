import styled from 'styled-components';
import { ActionPillLink } from '../../components/ui/ActionPill';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { Tag } from '../../components/ui/Tag';
import { projectFrameShell } from '../projectFrame';
import { projectHeaderVars } from '../projectHeader';
import { projectTypographyVars } from '../projectTypography';

export const SeedbankPageRoot = styled.section`
  height: 100%;
  display: grid;
  place-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    place-items: stretch;
  }
`;

export const SeedbankPageFrame = styled.article`
  ${projectTypographyVars}
  ${projectHeaderVars}
  ${projectFrameShell}

  position: relative;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background:
    radial-gradient(circle at 76% 24%, rgba(255, 255, 255, 0.06), transparent 14%),
    radial-gradient(circle at 70% 72%, rgba(255, 255, 255, 0.04), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0)),
    ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

const OrbBase = styled.div`
  position: absolute;
  z-index: 0;
  border-radius: 999px;
  pointer-events: none;
`;

export const SeedbankOrbLarge = styled(OrbBase)`
  right: -1rem;
  bottom: -4rem;
  width: clamp(12rem, 22vw, 19rem);
  height: clamp(12rem, 22vw, 19rem);
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.04) 58%,
    transparent 74%
  );
  opacity: 0.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    opacity: 0.34;
    transform: scale(0.82);
    transform-origin: center;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    opacity: 0.26;
    transform: scale(0.7);
    transform-origin: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    opacity: 0.22;
    transform: scale(0.68);
  }
`;

export const SeedbankOrbSmall = styled(OrbBase)`
  top: 2rem;
  right: 6.6rem;
  width: clamp(3.5rem, 5vw, 4.6rem);
  height: clamp(3.5rem, 5vw, 4.6rem);
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 255, 255, 0.94),
    rgba(255, 255, 255, 0.24) 58%,
    transparent 72%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    opacity: 0.7;
    transform: scale(0.84);
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    opacity: 0.56;
    transform: scale(0.74);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const SeedbankRing = styled.div`
  position: absolute;
  z-index: 0;
  right: 10%;
  top: 18%;
  width: clamp(16rem, 28vw, 24rem);
  height: clamp(16rem, 28vw, 24rem);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  opacity: 0.38;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    opacity: 0.24;
    transform: scale(0.84);
    transform-origin: center;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    opacity: 0.2;
    transform: scale(0.72);
    transform-origin: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    opacity: 0.18;
    transform: scale(0.7);
  }
`;

export const SeedbankRingSoft = styled.div`
  position: absolute;
  z-index: 0;
  right: 16%;
  top: 28%;
  width: clamp(10rem, 18vw, 15rem);
  height: clamp(10rem, 18vw, 15rem);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 50%;
  opacity: 0.3;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    opacity: 0.22;
    transform: scale(0.84);
    transform-origin: center;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    opacity: 0.16;
    transform: scale(0.72);
    transform-origin: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const SeedbankHeader = styled.header`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: var(--project-header-gap);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: 0.75rem;
  }
`;

export const SeedbankHeaderCopy = styled.div`
  display: grid;
  justify-items: start;
  align-content: start;
  gap: var(--project-header-copy-gap);
  max-width: 40rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.65rem;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: 0.6rem;
  }
`;

export const SeedbankProjectTag = styled(Tag)`
  justify-self: start;
  max-width: 100%;
  min-height: var(--project-header-tag-height);
  padding-inline: var(--project-header-tag-padding-x);
  font-size: var(--project-header-tag-size);
  letter-spacing: var(--project-header-tag-spacing);
`;

export const SeedbankHeaderEyebrow = styled(Eyebrow)`
  max-width: 100%;
  gap: var(--project-header-eyebrow-gap);
  font-size: var(--project-header-eyebrow-size);
  letter-spacing: var(--project-header-eyebrow-spacing);
`;

export const SeedbankLinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--project-header-link-gap);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: 0.45rem;
  }
`;

export const SeedbankHeaderLink = styled(ActionPillLink)`
  min-height: var(--project-header-link-height);
  padding:
    var(--project-header-link-padding-y)
    var(--project-header-link-padding-x);
  font-size: var(--project-header-link-size);
  letter-spacing: var(--project-header-link-spacing);
`;

export const SeedbankSectionSlot = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  height: 100%;
`;
