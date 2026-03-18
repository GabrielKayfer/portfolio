import styled from 'styled-components';
import { Tag } from '../../components/ui/Tag';

export const AmoraePageRoot = styled.section`
  height: 100%;
  display: grid;
  place-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    place-items: stretch;
  }
`;

export const AmoraePageFrame = styled.article`
  position: relative;
  box-sizing: border-box;
  width: ${({ theme }) => theme.width.projectFrame};
  height: 100%;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: clamp(0.95rem, 1.2vw, 1.15rem);
  padding:
    clamp(1.2rem, 1.8vw, 1.8rem)
    clamp(1.5rem, 2.5vw, 2.8rem)
    clamp(2.4rem, 4vw, 3.4rem);
  background:
    radial-gradient(circle at 76% 24%, rgba(255, 255, 255, 0.06), transparent 14%),
    radial-gradient(circle at 70% 72%, rgba(255, 255, 255, 0.04), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0));
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: min(100%, 94rem);
    padding:
      clamp(1rem, 1.5vw, 1.4rem)
      clamp(1.15rem, 2vw, 1.9rem)
      clamp(2rem, 3vw, 2.8rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    gap: 1rem;
    padding: 1rem 1rem 2.4rem;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: 0.8rem;
    padding: 0.82rem 0.9rem 1.2rem;
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

export const AmoraeOrbLarge = styled(OrbBase)`
  right: -2rem;
  bottom: -2rem;
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

export const AmoraeOrbSmall = styled(OrbBase)`
  top: 2.4rem;
  right: 4.6rem;
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

export const AmoraeRing = styled.div`
  position: absolute;
  z-index: 0;
  right: 5%;
  top: 14%;
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

export const AmoraeRingSoft = styled.div`
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

export const AmoraeHeader = styled.header`
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

export const AmoraeHeaderCopy = styled.div`
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

export const AmoraeProjectTag = styled(Tag)`
  justify-self: start;
  margin-left: -1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: -0.8rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-left: -0.45rem;
  }
`;

export const AmoraeLinkRow = styled.div`
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

export const AmoraeSectionSlot = styled.div`
  position: relative;
  z-index: 1;
  min-height: 0;
  height: 100%;
`;
