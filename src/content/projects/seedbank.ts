import type { ProjectContent } from '../../types/content';

export const seedbankProject: ProjectContent = {
  slug: 'seedbank',
  title: 'SeedBank',
  tagline:
    'Fintech conceitual transformada em produto navegável.',
  opening:
    'O projeto nasceu da vontade de ir além de uma landing estática e construir um banco digital que acompanhasse o usuário em fases diferentes da vida.',
  summary:
    'Em vez de tratar finanças apenas como operação, o SeedBank foi pensado como uma jornada de crescimento, orientação e confiança.',
  heroMedia: {
    kind: 'video',
    src: '/media/seedbank/seedBank.mp4',
    poster: '/media/seedbank/logoSeedbank.png',
    alt: 'Identidade visual do projeto SeedBank',
    aspectRatio: '1057 / 901'
  },
  sections: [
    {
      id: 'visao-geral',
      eyebrow: 'Visão geral',
      title:
        'O SeedBank nasceu de uma pergunta central: como transformar um produto financeiro em uma experiência mais próxima, legível e acompanhadora, em vez de apenas uma interface de saldo e transação?',
      body: [
        'A proposta do projeto é reduzir a distância entre marca, uso e suporte. Em vez de apresentar uma promessa financeira genérica e deixar a experiência real escondida atrás de fluxos desconectados, o SeedBank organiza descoberta, acesso e ajuda dentro do mesmo ecossistema. Isso faz com que o produto pareça menos uma vitrine institucional e mais uma experiência contínua.'
      ],
      highlights: [
        'Landing page pública',
        'Trust section',
        'Ponto de entrada para suporte'
      ],
      media: {
        kind: 'image',
        src: '/media/seedbank/jorneySeedbank.png',
        alt: 'Jornada principal do projeto SeedBank',
        aspectRatio: '1269 / 842'
      },
      gallery: [
        {
          kind: 'image',
          src: '/media/seedbank/benefitsSeedbank.png',
          alt: 'Bloco de benefícios do projeto SeedBank',
          aspectRatio: '1838 / 911'
        }
      ]
    },
    {
      id: 'autenticacao',
      eyebrow: 'HOME + IA',
      title:
        'Login dedicado, persistência de sessão e rota protegida como camada real de produto',
      body: [
        'Cada ambiente do SeedBank foi pensado para cumprir uma função específica. A landing apresenta. O login permite entrada com foco e confiança. A área protegida demonstra uso. O suporte com IA oferece ajuda contextual. Essa divisão evita ambiguidade e impede que a interface tente fazer tudo ao mesmo tempo.'
      ],
      media: {
        kind: 'image',
        src: '/media/seedbank/homeSeedbank.png',
        alt: 'Home do projeto SeedBank',
        aspectRatio: '1894 / 1060'
      },
      gallery: [
        {
          kind: 'image',
          src: '/media/seedbank/chatSeedbank.png',
          alt: 'Bloco de suporte do projeto SeedBank',
          aspectRatio: '969 / 613'
        }
      ]
    },
    {
      id: 'area-protegida',
      eyebrow: 'ÁREA PROTEGIDA',
      title:
        'Desenvolvimento guiado por estrutura e evolução. Interface, sistema e IA não foram tratados como peças independentes, mas como partes de uma mesma experiência de produto.',
      body: [],
      media: {
        kind: 'video',
        src: '/media/seedbank/usandoChatSeedBank.mp4',
        poster: '/media/seedbank/paginaUsuarioSeedbank.png',
        alt: 'Uso do assistente no projeto SeedBank',
        aspectRatio: '1100 / 1010'
      },
      gallery: [
        {
          kind: 'image',
          src: '/media/seedbank/paginaLoginSeedbank.png',
          alt: 'Tela de login do projeto SeedBank',
          aspectRatio: '980 / 738'
        }
      ]
    }
  ],
  hubDetailGroup: {
    title: 'Fundação do projeto',
    items: [
      {
        label: 'Profundidade do projeto',
        value:
          'A experiência do SeedBank é construída em quatro camadas complementares: descoberta da proposta na área pública, entrada por uma rota de login dedicada, uso em uma área protegida com contexto próprio e suporte inteligente integrado ao ecossistema.'
      }
    ]
  },
  detailGroups: [
    {
      title: 'Forças do projeto',
      items: [
        {
          label: 'Motivações do projeto',
          value:
            'Duas motivações deram origem ao SeedBank. A primeira foi tirar o projeto do estágio de landing page estática e levá-lo para uma experiência com profundidade real de uso. A segunda foi imaginar um banco que crescesse junto com o usuário, acompanhando diferentes fases da vida e oferecendo mais do que acesso funcional: clareza, orientação e confiança.'
        }
      ]
    },
    {
      title: 'Produto e fluxo',
      items: [
        {
          label: 'IA como suporte contextual',
          value:
            'No SeedBank, a IA não existe para ornamentar a experiência. Ela atua como suporte contextual, ajudando o usuário a encontrar respostas sobre o próprio produto sem depender de navegação extensa ou busca manual por informação. Sua função é reduzir atrito nos momentos de dúvida, comparação e descoberta.'
        },
        {
          label: 'IA dentro da jornada',
          value:
            'A IA faz sentido no SeedBank porque responde sobre o próprio ecossistema e aparece como parte da experiência de ajuda. Ela não foi colocada como recurso solto, mas como continuação da lógica do produto: se o banco quer orientar e acompanhar, o suporte precisa existir dentro da jornada, e não fora dela.'
        }
      ]
    },
    {
      title: 'Papel e resultados',
      items: [
        {
          label: 'Organização da aplicação',
          value:
            'A aplicação foi organizada em duas frentes complementares. No frontend, há separação entre componentes, conteúdo, layouts, páginas, roteamento, serviços, estilos e contexto de autenticação. No backend, a estrutura inclui configuração, controladores, middlewares, rotas, dados fake e serviços. Essa divisão sustenta crescimento sem colapsar responsabilidades.'
        },
        {
          label: 'Stack aplicada',
          value:
            'No frontend, o projeto utiliza React 19, TypeScript, Vite, styled-components e React Router. No backend, usa Node.js, Express, CORS e controle de requisições com express-rate-limit. A integração com OpenAI passou por fases diferentes do produto, incluindo uma etapa com knowledge base e RAG e outra com ChatKit mediado por backend.'
        }
      ]
    }
  ],
  closing: {
    title: 'Encerramento',
    body: [
      'Dentro do portfólio, o SeedBank resume o tipo de produto que gosto de construir: interface, fluxo e tecnologia trabalhando juntos para resolver uma jornada inteira.'
    ]
  },
  gallery: [
    {
      kind: 'image',
      src: '/media/seedbank/homeSeedbank.png',
      alt: 'Home do projeto SeedBank',
      aspectRatio: '16 / 9'
    },
    {
      kind: 'image',
      src: '/media/seedbank/secaoTrustSeedbank.png',
      alt: 'Seção de confiança do projeto SeedBank',
      aspectRatio: '1902 / 963'
    },
    {
      kind: 'image',
      src: '/media/seedbank/paginaLoginSeedbank.png',
      alt: 'Tela de login do projeto SeedBank',
      aspectRatio: '16 / 9'
    },
    {
      kind: 'image',
      src: '/media/seedbank/paginaUsuarioSeedbank.png',
      alt: 'Área do usuário do projeto SeedBank',
      aspectRatio: '1309 / 1044'
    }
  ],
  links: [
    {
      label: 'Projeto publicado',
      href: 'https://seed-bank-five.vercel.app/',
      external: true
    },
    {
      label: 'Repositório no GitHub',
      href: 'https://github.com/GabrielKayfer/seedBank',
      external: true
    }
  ],
  stack: [
    'React',
    'TypeScript',
    'Node.js',
    'Express',
    'OpenAI'
  ],
  seo: {
    title: 'SeedBank | Gabriel Lira',
    description:
      'Projeto fintech com landing page, login, área protegida, backend Node/Express e OpenAI ChatKit.'
  }
};
