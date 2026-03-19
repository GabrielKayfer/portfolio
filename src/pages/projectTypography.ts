import { css } from 'styled-components';

export const projectTypographyVars = css`
  --project-opening-size: max(1.45rem, calc(2.6rem * var(--project-frame-scale)));
  --project-summary-size: max(0.72rem, calc(0.98rem * var(--project-frame-scale)));
  --project-summary-line: 1.42;
  --project-card-title-size: max(0.72rem, calc(0.98rem * var(--project-frame-scale)));
  --project-card-title-line: 1.18;
  --project-card-body-size: max(0.68rem, calc(0.98rem * var(--project-frame-scale)));
  --project-card-body-line: 1.34;

  --project-section-opening-size: max(1.32rem, calc(2.08rem * var(--project-frame-scale)));
  --project-section-opening-line: 1;
  --project-section-summary-size: max(0.8rem, calc(0.94rem * var(--project-frame-scale)));
  --project-section-summary-line: 1.58;
  --project-section-card-label-size: max(0.56rem, calc(0.64rem * var(--project-frame-scale)));
  --project-section-card-label-spacing: 0.1em;
  --project-section-card-body-size: max(0.74rem, calc(0.84rem * var(--project-frame-scale)));
  --project-section-card-body-line: 1.46;
  --project-section-card-body-compact-size: max(0.7rem, calc(0.78rem * var(--project-frame-scale)));
  --project-section-card-body-compact-line: 1.42;
`;
