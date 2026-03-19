import { useEffect, useState } from 'react';
import type { ProjectDeckPage } from '../../features/spatial/projectPages';
import type { ProjectContent } from '../../types/content';
import { ConstructionSection } from './sections/ConstructionSection';
import { ContextSection } from './sections/ContextSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { OverviewSection } from './sections/OverviewSection';
import {
  AmoraeHeader,
  AmoraeHeaderCopy,
  AmoraeHeaderEyebrow,
  AmoraeHeaderLink,
  AmoraeLinkRow,
  AmoraeOrbLarge,
  AmoraeOrbSmall,
  AmoraePageFrame,
  AmoraePageRoot,
  AmoraeProjectTag,
  AmoraeRing,
  AmoraeRingSoft,
  AmoraeSectionSlot
} from './styles';

interface ProjectAmoraePageProps {
  project: ProjectContent;
  activePage: ProjectDeckPage;
  isActive: boolean;
}

export function ProjectAmoraePage({
  project,
  activePage,
  isActive
}: ProjectAmoraePageProps) {
  const [experienceMediaIndex, setExperienceMediaIndex] = useState(0);
  const [constructionMediaIndex, setConstructionMediaIndex] = useState(0);
  const isOverview = activePage.id === 'overview';

  useEffect(() => {
    setExperienceMediaIndex(0);
    setConstructionMediaIndex(0);
  }, [activePage.id]);

  const handleNextExperienceImage = () => {
    const mediaLength = [activePage.media, ...(activePage.gallery ?? [])].slice(0, 3).length;
    setExperienceMediaIndex((current) =>
      current === mediaLength - 1 ? 0 : current + 1
    );
  };

  const handlePreviousExperienceImage = () => {
    const mediaLength = [activePage.media, ...(activePage.gallery ?? [])].slice(0, 3).length;
    setExperienceMediaIndex((current) =>
      current === 0 ? mediaLength - 1 : current - 1
    );
  };

  const handleNextConstructionImage = () => {
    const mediaLength = [activePage.media, ...(activePage.gallery ?? [])].slice(0, 2).length;
    setConstructionMediaIndex((current) =>
      current === mediaLength - 1 ? 0 : current + 1
    );
  };

  const handlePreviousConstructionImage = () => {
    const mediaLength = [activePage.media, ...(activePage.gallery ?? [])].slice(0, 2).length;
    setConstructionMediaIndex((current) =>
      current === 0 ? mediaLength - 1 : current - 1
    );
  };

  return (
    <AmoraePageRoot>
      <AmoraePageFrame>
        <AmoraeOrbLarge />
        <AmoraeOrbSmall />
        <AmoraeRing />
        <AmoraeRingSoft />

        <AmoraeHeader>
          <AmoraeHeaderCopy>
            {isOverview ? <AmoraeProjectTag>{project.title}</AmoraeProjectTag> : null}
            {isOverview ? (
              <AmoraeHeaderEyebrow>{project.tagline}</AmoraeHeaderEyebrow>
            ) : null}
          </AmoraeHeaderCopy>

          <AmoraeLinkRow>
            {project.links.map((link) => (
              <AmoraeHeaderLink
                key={link.label}
                href={link.href}
                rel={link.external ? 'noreferrer' : undefined}
                target={link.external ? '_blank' : undefined}
              >
                {link.label}
              </AmoraeHeaderLink>
            ))}
          </AmoraeLinkRow>
        </AmoraeHeader>

        <AmoraeSectionSlot>
          {activePage.id === 'overview' ? (
            <OverviewSection activePage={activePage} isActive={isActive} />
          ) : activePage.id === 'contexto' ? (
            <ContextSection activePage={activePage} isActive={isActive} />
          ) : activePage.id === 'experiencia' ? (
            <ExperienceSection
              activePage={activePage}
              isActive={isActive}
              mediaIndex={experienceMediaIndex}
              onNextImage={handleNextExperienceImage}
              onPreviousImage={handlePreviousExperienceImage}
            />
          ) : (
            <ConstructionSection
              activePage={activePage}
              isActive={isActive}
              mediaIndex={constructionMediaIndex}
              onNextImage={handleNextConstructionImage}
              onPreviousImage={handlePreviousConstructionImage}
            />
          )}
        </AmoraeSectionSlot>
      </AmoraePageFrame>
    </AmoraePageRoot>
  );
}
