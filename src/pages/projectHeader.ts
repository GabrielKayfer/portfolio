import { css } from 'styled-components';

export const projectHeaderVars = css`
  --project-header-gap: max(0.58rem, calc(0.86rem * var(--project-frame-scale)));
  --project-header-copy-gap: max(0.42rem, calc(0.68rem * var(--project-frame-scale)));
  --project-header-link-gap: max(0.34rem, calc(0.52rem * var(--project-frame-scale)));

  --project-header-tag-height: max(1.5rem, calc(1.92rem * var(--project-frame-scale)));
  --project-header-tag-padding-x: max(0.54rem, calc(0.88rem * var(--project-frame-scale)));
  --project-header-tag-size: max(0.56rem, calc(0.7rem * var(--project-frame-scale)));
  --project-header-tag-spacing: 0.12em;

  --project-header-eyebrow-gap: max(0.22rem, calc(0.42rem * var(--project-frame-scale)));
  --project-header-eyebrow-size: max(0.54rem, calc(0.68rem * var(--project-frame-scale)));
  --project-header-eyebrow-spacing: 0.18em;

  --project-header-link-height: max(1.58rem, calc(2rem * var(--project-frame-scale)));
  --project-header-link-padding-y: max(0.16rem, calc(0.32rem * var(--project-frame-scale)));
  --project-header-link-padding-x: max(0.4rem, calc(0.64rem * var(--project-frame-scale)));
  --project-header-link-size: max(0.56rem, calc(0.64rem * var(--project-frame-scale)));
  --project-header-link-spacing: 0.12em;
`;
