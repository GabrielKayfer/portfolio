import type { ContactContent } from '../../../types/content';
import {
  HomeActionPillLink,
  HomeContactRow,
  HomeFooterBar
} from '../styles';

interface FooterSectionProps {
  contact: ContactContent;
}

export function FooterSection({
  contact
}: FooterSectionProps) {
  return (
    <HomeFooterBar>
      <HomeContactRow>
        {contact.links.map((link) => (
          <HomeActionPillLink
            key={link.label}
            href={link.href}
            rel={link.external ? 'noreferrer' : undefined}
            target={link.external ? '_blank' : undefined}
          >
            {link.label}
          </HomeActionPillLink>
        ))}
      </HomeContactRow>
    </HomeFooterBar>
  );
}
