import styled, { css } from 'styled-components';
import { Tag } from '../../components/ui/Tag';

export const VorticPageRoot = styled.section`
  height: 100%;
  display: grid;
  place-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    place-items: stretch;
  }
`;

export const VorticPageFrame = styled.article<{ $overview: boolean }>`
  --vortic-page-scale-width: ${({ $overview }) =>
    $overview ? 'clamp(0.68, calc(100vw / 1920px), 1)' : '1'};
  --vortic-page-scale-height: ${({ $overview }) =>
    $overview ? 'clamp(0.62, calc(100svh / 945px), 1)' : '1'};
  --vortic-page-scale: ${({ $overview }) =>
    $overview
      ? 'min(var(--vortic-page-scale-width), var(--vortic-page-scale-height))'
      : '1'};

  position: relative;
  box-sizing: border-box;
  width: ${({ theme, $overview }) =>
    $overview
      ? 'min(calc(108rem * var(--vortic-page-scale)), calc(100% - clamp(1rem, 3vw, 2rem)))'
      : theme.width.projectFrame};
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: ${({ $overview }) =>
    $overview
      ? 'max(0.78rem, calc(1.08rem * var(--vortic-page-scale)))'
      : 'clamp(0.95rem, 1.2vw, 1.15rem)'};
  padding: ${({ $overview }) =>
    $overview
      ? `
        max(0.95rem, calc(1.45rem * var(--vortic-page-scale)))
        max(1rem, calc(2rem * var(--vortic-page-scale)))
        max(1.65rem, calc(2.8rem * var(--vortic-page-scale)))
      `
      : `
        clamp(1.2rem, 1.8vw, 1.8rem)
        clamp(1.5rem, 2.5vw, 2.8rem)
        clamp(2.4rem, 4vw, 3.4rem)
      `};
  background:
    radial-gradient(circle at 76% 24%, rgba(255, 255, 255, 0.06), transparent 14%),
    radial-gradient(circle at 70% 72%, rgba(255, 255, 255, 0.04), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0));
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: ${({ $overview }) =>
      $overview
        ? 'min(calc(108rem * var(--vortic-page-scale)), calc(100% - 1.5rem))'
        : 'min(100%, 94rem)'};
    padding: ${({ $overview }) =>
      $overview
        ? `
          max(0.9rem, calc(1.2rem * var(--vortic-page-scale)))
          max(0.95rem, calc(1.5rem * var(--vortic-page-scale)))
          max(1.45rem, calc(2.2rem * var(--vortic-page-scale)))
        `
        : `
          clamp(1rem, 1.5vw, 1.4rem)
          clamp(1.15rem, 2vw, 1.9rem)
          clamp(2rem, 3vw, 2.8rem)
        `};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    gap: 1rem;
    padding: 1rem 1rem 2.4rem;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: ${({ $overview }) =>
      $overview
        ? 'max(0.68rem, calc(0.88rem * var(--vortic-page-scale)))'
        : '0.8rem'};
    padding: ${({ $overview }) =>
      $overview
        ? `
          max(0.78rem, calc(0.98rem * var(--vortic-page-scale)))
          max(0.82rem, calc(1.2rem * var(--vortic-page-scale)))
          max(1.1rem, calc(1.7rem * var(--vortic-page-scale)))
        `
        : '0.82rem 0.9rem 1.2rem'};
    overflow: hidden;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.85rem;
    padding: 0.8rem 0.8rem 2rem;
  }
`;

const OrbBase = styled.div`
  position: absolute;
  z-index: 0;
  border-radius: 999px;
  pointer-events: none;
`;

export const VorticOrbLarge = styled(OrbBase)`
  right: 8%;
  bottom: -3.2rem;
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

export const VorticOrbSmall = styled(OrbBase)`
  bottom: 26%;
  right: 10%;
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

export const VorticRing = styled.div`
  position: absolute;
  z-index: 0;
  right: 12%;
  top: 10%;
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

export const VorticRingSoft = styled.div`
  position: absolute;
  z-index: 0;
  right: 4%;
  top: 24%;
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

export const VorticHeader = styled.header`
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

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: 0.75rem;
  }
`;

export const VorticHeaderCopy = styled.div`
  display: grid;
  gap: 0.85rem;
  max-width: 40rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.65rem;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: 0.6rem;
  }
`;

export const VorticProjectTag = styled(Tag)`
  justify-self: start;
  margin-left: -1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: -0.8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-left: -0.45rem;
  }
`;

export const VorticLinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.55rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: 0.45rem;
  }
`;

export const VorticSectionSlot = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  height: 100%;
`;

export const VorticHeaderEyebrowStyles = css`
  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    font-size: 0.66rem;
    letter-spacing: 0.12em;
  }
`;
