import { Eyebrow } from '../../components/ui/Eyebrow';
import { ActionPillLink } from '../../components/ui/ActionPill';
import type { ProjectDeckPage } from '../../features/spatial/projectPages';
import type { ProjectContent } from '../../types/content';
import { AuthenticationSection } from './sections/AuthenticationSection';
import { OverviewSection } from './sections/OverviewSection';
import { ProtectedAreaSection } from './sections/ProtectedAreaSection';
import { VisionSection } from './sections/VisionSection';
import {
  SeedbankHeader,
  SeedbankHeaderCopy,
  SeedbankLinkRow,
  SeedbankOrbLarge,
  SeedbankOrbSmall,
  SeedbankPageFrame,
  SeedbankPageRoot,
  SeedbankProjectTag,
  SeedbankRing,
  SeedbankRingSoft,
  SeedbankSectionSlot
} from './styles';

interface ProjectSeedbankPageProps {
  project: ProjectContent;
  activePage: ProjectDeckPage;
  isActive: boolean;
}

export function ProjectSeedbankPage({
  project,
  activePage,
  isActive
}: ProjectSeedbankPageProps) {
  const isOverview = activePage.id === 'overview';

  return (
    <SeedbankPageRoot>
      <SeedbankPageFrame>
        <SeedbankOrbLarge />
        <SeedbankOrbSmall />
        <SeedbankRing />
        <SeedbankRingSoft />

        <SeedbankHeader>
          <SeedbankHeaderCopy>
            {isOverview ? <SeedbankProjectTag>{project.title}</SeedbankProjectTag> : null}
            {isOverview ? <Eyebrow>{project.tagline}</Eyebrow> : null}
          </SeedbankHeaderCopy>

          <SeedbankLinkRow>
            {project.links.map((link) => (
              <ActionPillLink
                key={link.label}
                href={link.href}
                rel={link.external ? 'noreferrer' : undefined}
                target={link.external ? '_blank' : undefined}
              >
                {link.label}
              </ActionPillLink>
            ))}
          </SeedbankLinkRow>
        </SeedbankHeader>

        <SeedbankSectionSlot>
          {activePage.id === 'overview' ? (
            <OverviewSection activePage={activePage} isActive={isActive} />
          ) : activePage.id === 'visao-geral' ? (
            <VisionSection activePage={activePage} isActive={isActive} />
          ) : activePage.id === 'autenticacao' ? (
            <AuthenticationSection activePage={activePage} isActive={isActive} />
          ) : (
            <ProtectedAreaSection activePage={activePage} isActive={isActive} />
          )}
        </SeedbankSectionSlot>
      </SeedbankPageFrame>
    </SeedbankPageRoot>
  );
}
