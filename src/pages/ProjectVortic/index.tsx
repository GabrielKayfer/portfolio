import { useEffect, useState } from 'react';
import { Eyebrow } from '../../components/ui/Eyebrow';
import { ActionPillLink } from '../../components/ui/ActionPill';
import type { ProjectDeckPage } from '../../features/spatial/projectPages';
import type { ProjectContent } from '../../types/content';
import { ArchitectureSection } from './sections/ArchitectureSection';
import { ConceptSection } from './sections/ConceptSection';
import { LogicSection } from './sections/LogicSection';
import { OverviewSection } from './sections/OverviewSection';
import {
  VorticHeader,
  VorticHeaderCopy,
  VorticLinkRow,
  VorticOrbLarge,
  VorticOrbSmall,
  VorticPageFrame,
  VorticPageRoot,
  VorticProjectTag,
  VorticRing,
  VorticRingSoft,
  VorticSectionSlot
} from './styles';

interface ProjectVorticPageProps {
  project: ProjectContent;
  activePage: ProjectDeckPage;
  isActive: boolean;
}

export function ProjectVorticPage({
  project,
  activePage,
  isActive
}: ProjectVorticPageProps) {
  const [architectureMediaIndex, setArchitectureMediaIndex] = useState(0);
  const isOverview = activePage.id === 'overview';
  const isConcept = activePage.id === 'tese';
  const isLogic = activePage.id === 'logica';
  const isArchitecture = activePage.id === 'arquitetura';
  const showSmallOrb = !isOverview && !isArchitecture;

  useEffect(() => {
    setArchitectureMediaIndex(0);
  }, [activePage.id]);

  const handleNextArchitectureImage = () => {
    const mediaLength = [activePage.media, ...(activePage.gallery ?? [])].length;
    setArchitectureMediaIndex((current) =>
      current === mediaLength - 1 ? 0 : current + 1
    );
  };

  const handlePreviousArchitectureImage = () => {
    const mediaLength = [activePage.media, ...(activePage.gallery ?? [])].length;
    setArchitectureMediaIndex((current) =>
      current === 0 ? mediaLength - 1 : current - 1
    );
  };

  return (
    <VorticPageRoot>
      <VorticPageFrame $overview={isOverview}>
        <VorticOrbLarge />
        {showSmallOrb ? <VorticOrbSmall /> : null}
        <VorticRing />
        <VorticRingSoft />

        <VorticHeader>
          <VorticHeaderCopy>
            {isOverview ? <VorticProjectTag>{project.title}</VorticProjectTag> : null}
            {isOverview ? <Eyebrow>{project.tagline}</Eyebrow> : null}
          </VorticHeaderCopy>

          <VorticLinkRow>
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
          </VorticLinkRow>
        </VorticHeader>

        <VorticSectionSlot>
          {isOverview ? (
            <OverviewSection activePage={activePage} isActive={isActive} />
          ) : isConcept ? (
            <ConceptSection activePage={activePage} isActive={isActive} />
          ) : isLogic ? (
            <LogicSection activePage={activePage} isActive={isActive} />
          ) : (
            <ArchitectureSection
              activePage={activePage}
              isActive={isActive}
              mediaIndex={architectureMediaIndex}
              onNextImage={handleNextArchitectureImage}
              onPreviousImage={handlePreviousArchitectureImage}
            />
          )}
        </VorticSectionSlot>
      </VorticPageFrame>
    </VorticPageRoot>
  );
}
