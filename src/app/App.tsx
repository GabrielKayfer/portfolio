import { useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { siteContent } from '../content/site';
import { GlobalStyles } from '../styles/GlobalStyles';
import { createTheme } from '../styles/theme';
import { AppShell } from '../components/layout/AppShell';
import { resolveRouteMeta } from './routeManifest';
import { AppRouter } from './router';

export default function App() {
  const location = useLocation();
  const routeMeta = resolveRouteMeta(location.pathname);
  const theme = createTheme(routeMeta.themeKey);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppShell brandName={siteContent.brand.name} brandRole={siteContent.brand.role}>
        <AppRouter />
      </AppShell>
    </ThemeProvider>
  );
}
