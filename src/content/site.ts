import type { SiteContent } from '../types/content';

export const siteContent: SiteContent = {
  metadata: {
    siteName: 'Gabriel Lira',
    defaultTitle: 'Gabriel Lira | Desenvolvedor Full Stack',
    defaultDescription:
      'Portfolio de Gabriel Lira, desenvolvedor full stack com foco em interface, estrutura de produto, integracao entre frontend, backend e IA aplicada.',
    ogImage: '/media/amorae/homeAmorae.png'
  },
  brand: {
    name: 'Gabriel Lira',
    role: 'Desenvolvedor Full Stack'
  },
  home: {
    hero: {
      eyebrow: 'DESENVOLVEDOR FULL STACK',
      name: 'Gabriel Lira',
      title: 'Desenvolvedor Full Stack',
      shortTitle: 'Desenvolvedor Full Stack',
      statement:
        'Desenvolvo produtos digitais que conectam experiência, lógica e evolução contínua.',
      supportingText:
        'Atuo na criação de aplicações web com foco em frontend moderno, integração entre camadas e soluções alinhadas ao uso real.',
      primaryCta: {
        label: 'Ver projetos',
        href: '#projetos'
      },
      secondaryCta: {
        label: 'Entrar em contato',
        href: '#contato'
      }
    },
    overview: {
      title: 'DO CONCEITO A ENTREGA',
      valueProposition:
        'Meu trabalho combina construção visual, organização técnica e decisões de produto para criar sistemas mais claros, funcionais e preparados para crescer.',
      bio:
        'Também exploro IA aplicada como recurso de apoio a fluxo, contexto e eficiência dentro da experiência digital.'
    },
    legitimacy: {
      title: 'Diferenciais',
      items: [
        {
          value: 'FRONTEND',
          label: 'Interfaces responsivas, componentização clara e experiência consistente.',
          description:
            'Interfaces responsivas, componentização clara e experiência consistente.'
        },
        {
          value: 'BACKEND',
          label: 'Integração com APIs, regras de fluxo e comunicação entre camadas.',
          description:
            'Integração com APIs, regras de fluxo e comunicação entre camadas.'
        },
        {
          value: 'PRODUTO',
          label: 'Estrutura de navegação, clareza de uso e decisões guiadas pelo contexto.',
          description:
            'Estrutura de navegação, clareza de uso e decisões guiadas pelo contexto.'
        },
        {
          value: 'IA APLICADA',
          label: 'Recursos que ampliam suporte, automação e inteligência no uso.',
          description:
            'Recursos que ampliam suporte, automação e inteligência no uso.'
        }
      ]
    },
    specialties: {
      title: 'Stack principal',
      items: [
        {
          title: 'Stack principal',
          description: 'Base principal de trabalho em aplicacoes web.',
          items: ['React', 'TypeScript', 'Node.js', 'APIs REST', 'IA aplicada']
        }
      ],
      areasOfInterestTitle: 'Atuacao',
      areasOfInterest: [
        'Interface',
        'Produto',
        'Backend',
        'Integracao com APIs',
        'Fluxos autenticados',
        'IA aplicada'
      ]
    },
    contact: {
      title: 'Contato',
      body: 'GitHub, LinkedIn e contato direto reunidos em um único ponto.',
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/GabrielKayfer',
          external: true
        },
        {
          label: 'LinkedIn',
          href: 'http://www.linkedin.com/in/gabrielkayfer',
          external: true
        },
        {
          label: 'Contato',
          href: 'mailto:gabrielkayferl@icloud.com',
          external: true
        }
      ]
    }
  }
};
