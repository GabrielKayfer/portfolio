import type { ThemeKey } from '../types/router';
import { tokens } from './tokens';

const themeLabels: Record<ThemeKey, string> = {
  default: 'Portfolio',
  amorae: 'Amorae',
  vortic: 'Vortic',
  seedbank: 'SeedBank'
};

export const createTheme = (themeKey: ThemeKey) => {
  const accent = tokens.colors.accent[themeKey];

  return {
    breakpoints: tokens.breakpoints,
    layers: tokens.layers,
    motion: tokens.motion,
    radius: tokens.radius,
    spacing: tokens.spacing,
    typography: tokens.typography,
    width: tokens.width,
    project: {
      key: themeKey,
      label: themeLabels[themeKey]
    },
    colors: {
      background: tokens.colors.neutral.background,
      surface: tokens.colors.neutral.surface,
      surfaceElevated: tokens.colors.neutral.surfaceElevated,
      text: tokens.colors.neutral.text,
      textMuted: tokens.colors.neutral.textMuted,
      border: tokens.colors.neutral.border,
      divider: tokens.colors.neutral.divider,
      shadow: tokens.colors.neutral.shadow,
      accent: accent.primary,
      accentStrong: accent.strong,
      accentSoft: accent.soft,
      accentContrast: accent.contrast
    }
  };
};

export type AppTheme = ReturnType<typeof createTheme>;
