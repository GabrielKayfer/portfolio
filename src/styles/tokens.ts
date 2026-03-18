export const tokens = {
  viewport: {
    base: {
      width: 1917,
      height: 944
    },
    heights: {
      short: '58rem',
      compact: '52rem'
    }
  },
  colors: {
    neutral: {
      background: '#050505',
      surface: '#0a0a0a',
      surfaceElevated: '#111111',
      text: '#f5f2ee',
      textMuted: 'rgba(245, 242, 238, 0.68)',
      border: 'rgba(245, 242, 238, 0.18)',
      divider: 'rgba(245, 242, 238, 0.1)',
      shadow: 'rgba(0, 0, 0, 0.42)'
    },
    accent: {
      default: {
        primary: '#f5f2ee',
        strong: '#ffffff',
        soft: 'rgba(255, 255, 255, 0.12)',
        contrast: '#050505'
      },
      amorae: {
        primary: '#f5f2ee',
        strong: '#ffffff',
        soft: 'rgba(255, 255, 255, 0.09)',
        contrast: '#050505'
      },
      vortic: {
        primary: '#f5f2ee',
        strong: '#ffffff',
        soft: 'rgba(255, 255, 255, 0.08)',
        contrast: '#050505'
      },
      seedbank: {
        primary: '#f5f2ee',
        strong: '#ffffff',
        soft: 'rgba(255, 255, 255, 0.1)',
        contrast: '#050505'
      }
    }
  },
  typography: {
    fontDisplay: "'Space Grotesk', 'Segoe UI', sans-serif",
    fontBody: "'Manrope', 'Segoe UI', sans-serif",
    fontMono: "'IBM Plex Mono', 'Consolas', monospace",
    sizes: {
      xs: '0.8rem',
      sm: '1rem',
      md: '1.125rem',
      lg: '1.45rem',
      xl: 'clamp(2.5rem, 5vw, 4.25rem)',
      hero: 'clamp(4rem, 8vw, 7rem)'
    },
    lineHeights: {
      tight: 1.05,
      normal: 1.55,
      relaxed: 1.7
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    section: 'clamp(4rem, 8vw, 7rem)'
  },
  width: {
    content: 'min(100% - clamp(1.5rem, 4vw, 4rem), 88rem)',
    wide: 'min(100% - clamp(2rem, 5vw, 5.5rem), 108rem)',
    narrow: 'min(100% - clamp(1.5rem, 3vw, 3rem), 60rem)',
    homeFrame: 'min(100%, 92rem)',
    projectFrame: 'min(100%, 108rem)'
  },
  radius: {
    sm: '0.75rem',
    md: '1.25rem',
    lg: '2rem',
    pill: '999px'
  },
  layers: {
    base: 0,
    header: 10,
    overlay: 20
  },
  motion: {
    duration: {
      fast: 0.18,
      normal: 0.3,
      slow: 0.48
    },
    easing: {
      standard: [0.22, 1, 0.36, 1],
      entrance: [0.16, 1, 0.3, 1]
    }
  },
  breakpoints: {
    sm: '40rem',
    md: '56rem',
    lg: '72rem',
    xl: '90rem'
  }
} as const;
