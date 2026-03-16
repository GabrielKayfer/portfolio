import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { SpatialExperience } from '../features/spatial/SpatialExperience';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<SpatialExperience />} path="/" />
      <Route element={<SpatialExperience />} path="/projetos/:slug/:panelId?" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}
