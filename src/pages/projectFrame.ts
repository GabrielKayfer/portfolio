import { css } from 'styled-components';

export const projectFrameShell = css`
  --project-frame-scale-width: clamp(0.54, calc(100vw / 1920px), 1);
  --project-frame-scale-height: clamp(0.54, calc(100svh / 945px), 1);
  --project-frame-scale: min(
    var(--project-frame-scale-width),
    var(--project-frame-scale-height)
  );

  --project-frame-width: calc(104rem * var(--project-frame-scale));
  --project-frame-height: calc(47rem * var(--project-frame-scale));
  --project-frame-padding-y: max(0.7rem, calc(1.75rem * var(--project-frame-scale)));
  --project-frame-padding-x: max(0.8rem, calc(2rem * var(--project-frame-scale)));
  --project-frame-padding-bottom: calc(
    var(--project-frame-padding-y) + max(0.1rem, calc(0.2rem * var(--project-frame-scale)))
  );
  --project-frame-gap: max(0.55rem, calc(1.1rem * var(--project-frame-scale)));
  --project-frame-radius: max(1.3rem, calc(3rem * var(--project-frame-scale)));
  --project-frame-shadow-y: calc(24px * var(--project-frame-scale));
  --project-frame-shadow-blur: calc(64px * var(--project-frame-scale));

  justify-self: center;
  width: min(var(--project-frame-width), calc(100% - clamp(1rem, 3vw, 2rem)));
  height: min(
    var(--project-frame-height),
    calc(100svh - clamp(4.25rem, 8vh, 7rem))
  );
  max-height: 100%;
  gap: var(--project-frame-gap);
  padding:
    var(--project-frame-padding-y)
    var(--project-frame-padding-x)
    var(--project-frame-padding-bottom);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: var(--project-frame-radius);
  box-shadow:
    0 var(--project-frame-shadow-y) var(--project-frame-shadow-blur)
      ${({ theme }) => theme.colors.shadow};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: calc(100% - 1.5rem);
    height: auto;
    gap: 1rem;
    padding: 1rem 1rem 2.4rem;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @media (max-height: ${({ theme }) => theme.viewport.heights.compact}) {
    gap: max(0.5rem, calc(0.82rem * var(--project-frame-scale)));
    padding: 0.82rem 0.9rem 1.2rem;
    overflow: hidden;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: calc(100% - 1rem);
    gap: 0.85rem;
    padding: 0.8rem 0.8rem 2rem;
  }
`;
