import type { ProjectContent } from '../../types/content';

export const vorticProject: ProjectContent = {
  slug: 'vortic',
  title: 'Vortic',
  tagline:
    'Marca esportiva conceitual pensada como produto digital.',
  opening:
    'Um projeto que une marketplace, curadoria editorial e repertório de prática para transformar a compra em uma experiência de marca mais viva, contextual e cultural.',
  summary:
    'O Vortic não foi pensado como uma vitrine comum. A proposta era construir um universo esportivo contemporâneo, onde produto, modalidade, rotina e identidade visual trabalhassem juntos.',
  heroMedia: {
    kind: 'image',
    src: '/media/vortic/logoVortic.png',
    alt: 'Identidade visual do projeto Vortic',
    aspectRatio: '1587 / 2245'
  },
  sections: [
    {
      id: 'tese',
      eyebrow: 'Direção e conceito',
      title:
        'Uma marca esportiva pensada como sistema visual, não como vitrine.',
      body: [
        'A direção visual do projeto foi influenciada por Futurismo, Bauhaus, De Stijl, Vorticismo e, de forma mais concreta, pela lógica compositiva de Mondrian.',
        'Essas referências não entraram como ornamento, mas como estrutura: blocos, ritmo, contraste, tensão e organização espacial.'
      ],
      media: {
        kind: 'image',
        src: '/media/vortic/homeVortic.png',
        alt: 'Home do projeto Vortic',
        aspectRatio: '1900 / 1065'
      }
    },
    {
      id: 'logica',
      eyebrow: 'INTERFACE',
      title:
        'A interface organiza descoberta, marca e produto como uma experiência contínua.',
      body: [
        'A navegação foi pensada para ir além do caminho clássico de entrar, filtrar e comprar. O usuário encontra rotas funcionais, como catálogo, produto, favoritos e carrinho, mas também caminhos organizados por modalidades, repertório e contexto de prática.'
      ],
      media: {
        kind: 'image',
        src: '/media/vortic/modalidadesVortic.png',
        alt: 'Seção de modalidades do projeto Vortic',
        aspectRatio: '1499 / 1076'
      },
      gallery: [
        {
          kind: 'image',
          src: '/media/vortic/buscarVortic.png',
          alt: 'Busca e descoberta no projeto Vortic',
          aspectRatio: '1284 / 889'
        }
      ]
    },
    {
      id: 'arquitetura',
      eyebrow: 'Arquitetura e bastidor',
      title: 'Como o projeto foi montado para sustentar sistema, produto e identidade.',
      body: [
        'O Vortic mostra uma forma de desenvolvimento em que a tecnologia não serve apenas para montar tela, mas para sustentar identidade, produto e experiência.'
      ],
      media: {
        kind: 'image',
        src: '/media/vortic/favoritosVortic.png',
        alt: 'Seção de favoritos do projeto Vortic',
        aspectRatio: '1427 / 993'
      },
      gallery: [
        {
          kind: 'image',
          src: '/media/vortic/visualizandoProdutoVortic.png',
          alt: 'Visualização de produto no projeto Vortic',
          aspectRatio: '1299 / 980'
        },
        {
          kind: 'image',
          src: '/media/vortic/carrinhoVortic.png',
          alt: 'Carrinho do projeto Vortic',
          aspectRatio: '1376 / 996'
        }
      ]
    }
  ],
  hubDetailGroup: {
    title: 'Fundação do projeto',
    items: [
      {
        label: 'Leitura do projeto',
        value:
          'Vortic é uma marca esportiva conceitual pensada como produto digital, unindo marketplace, curadoria editorial e repertório de prática em uma mesma experiência.'
      },
      {
        label: 'Síntese do Vortic',
        value:
          'Mais do que uma vitrine de produtos, o projeto organiza esporte, contexto de uso e identidade visual para criar uma experiência de marca mais viva e menos transacional.'
      },
      {
        label: 'O projeto em três camadas',
        value:
          'Desenvolvido como uma aplicação front-end estruturada, com navegação, componentização e sistema visual pensados para sustentar evolução real de produto.'
      }
    ]
  },
  detailGroups: [
    {
      title: 'Direção e assinatura',
      items: [
        {
          label: 'Assinatura',
          value:
            'O objetivo era criar uma linguagem viva, gráfica e arquitetônica, equilibrando força e refinamento. Para o projeto manter sua identidade, alguns elementos eram indispensáveis: presença de marca, relação entre prática e produto, direção visual estruturada e alguma camada editorial.'
        },
        {
          label: 'Eixo verbal',
          value:
            'Não era sobre parecer esportivo. Era sobre construir uma marca com ritmo, estrutura e contexto real de uso.'
        }
      ]
    },
    {
      title: 'Experiência de uso',
      items: [
        {
          label: 'Costura entre camadas',
          value:
            'No Vortic, vitrine, editorial e marca não aparecem como partes separadas. Modalidades preparam a leitura dos produtos. Os blocos editoriais legitimam a curadoria. A interface organiza tudo como uma experiência coerente, e não como uma vitrine dispersa.'
        },
        {
          label: 'Estrutura da home',
          value:
            'A home foi pensada como narrativa. O hero define a primeira leitura da marca. As modalidades e os destaques de produto sustentam o uso. Os blocos editoriais ampliam repertório. A seção do app e o footer ajudam a aproximar o projeto de um produto real.'
        },
        {
          label: 'Hierarquia e diferencial',
          value:
            'A experiência se apoia em contraste de escala, peso tipográfico, ritmo entre blocos e alternância entre áreas contidas e expansivas. O diferencial não está em efeitos complexos, mas na forma como a interface organiza marca, produto e continuidade.'
        }
      ]
    },
    {
      title: 'Construção e método',
      items: [
        {
          label: 'Construção e sistema',
          value:
            'O Vortic foi desenvolvido com React, TypeScript, Vite, React Router e Styled-components, com suporte de ESLint e Prettier para consistência e qualidade de código.'
        },
        {
          label: 'Arquitetura',
          value:
            'A aplicação foi organizada como produto navegável, com separação entre páginas, componentes, contexts e sistema visual. Theme, tokens e estilos globais ajudaram a sustentar consistência, enquanto contexts para favoritos e carrinho reforçaram a continuidade da experiência.'
        },
        {
          label: 'Decisões importantes',
          value:
            'As decisões técnicas mais importantes foram usar TypeScript para segurança, React Router para navegação estruturada, Styled-components para integrar estilo e componente, e uma base de theme e tokens para dar coerência ao sistema visual.'
        },
        {
          label: 'Desafios e aprendizado',
          value:
            'O principal desafio não foi apenas técnico, mas de tradução. Era preciso equilibrar geometria e usabilidade, arte e e-commerce, energia visual e sofisticação. O projeto amadureceu por iteração: revisão de paleta, ajuste de estrutura, recalibração da geometrização e leitura crítica do que ainda parecia genérico ou excessivo.'
        }
      ]
    }
  ],
  closing: {
    title: 'Encerramento',
    body: [
      'O projeto funciona como base de evolução para um ecossistema esportivo que ainda pode crescer em catálogo, serviços e identidade.'
    ]
  },
  gallery: [
    {
      kind: 'image',
      src: '/media/vortic/homeVortic.png',
      alt: 'Home do projeto Vortic',
      aspectRatio: '16 / 9'
    },
    {
      kind: 'image',
      src: '/media/vortic/modalidadesVortic.png',
      alt: 'Seção de modalidades do projeto Vortic',
      aspectRatio: '1403 / 956'
    },
    {
      kind: 'image',
      src: '/media/vortic/buscarVortic.png',
      alt: 'Busca do projeto Vortic',
      aspectRatio: '16 / 9'
    },
    {
      kind: 'image',
      src: '/media/vortic/favoritosVortic.png',
      alt: 'Favoritos do projeto Vortic',
      aspectRatio: '16 / 9'
    },
    {
      kind: 'image',
      src: '/media/vortic/visualizandoProdutoVortic.png',
      alt: 'Visualização de produto no projeto Vortic',
      aspectRatio: '16 / 9'
    },
    {
      kind: 'image',
      src: '/media/vortic/carrinhoVortic.png',
      alt: 'Carrinho do projeto Vortic',
      aspectRatio: '16 / 9'
    }
  ],
  links: [
    {
      label: 'Projeto publicado',
      href: 'https://vortic-tau.vercel.app/',
      external: true
    },
    {
      label: 'Repositório no GitHub',
      href: 'https://github.com/GabrielKayfer/Vortic',
      external: true
    }
  ],
  stack: [
    'React',
    'TypeScript',
    'Vite',
    'React Router',
    'Styled-components'
  ],
  seo: {
    title: 'Vortic | Gabriel Lira',
    description:
      'Projeto de marketplace esportivo com catálogo, busca, favoritos, carrinho e arquitetura modular por features.'
  }
};
