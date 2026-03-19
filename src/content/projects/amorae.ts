import type { ProjectContent } from '../../types/content';

export const amoraeProject: ProjectContent = {
  slug: 'amorae',
  title: 'Amoraê',
  tagline:
    'Front-end de e-commerce para uma gelateria fictícia, com identidade própria, catálogo, página de produto e carrinho.',
  opening:
    'A proposta central do Amoraê é transformar uma pausa simples em um momento bonito, afetivo e memorável.',
  summary:
    'Ao ver o Amoraê, o visitante precisa entender imediatamente quatro coisas: que se trata de uma marca com posicionamento retrô e delicado, que o projeto trabalha com sobremesas e bebidas de forte apelo visual, que a experiência vai além do cardápio ao incluir lembranças e peças especiais, e que a navegação foi pensada para descoberta e desejo, não apenas para compra rápida.',
  heroMedia: {
    kind: 'image',
    src: '/media/amorae/logoAmorae.png',
    alt: 'Identidade visual do projeto Amoraê',
    aspectRatio: '1330 / 1366'
  },
  hubDetailGroup: {
    title: 'Universo de marca',
    items: [
      {
        label: 'Universo de marca',
        value:
          'Os produtos recebem nomes, descrições e papéis que evocam lembrança, ocasião, estilo de vida e cena. Além disso, a marca se expande para objetos, presentes e peças especiais, fazendo o projeto parecer um universo de marca, e não apenas uma sorveteria online.'
      }
    ]
  },
  sections: [
    {
      id: 'contexto',
      eyebrow: 'Contexto',
      title: 'O usuário não vê apenas um item; ele se imagina dentro da experiência.',
      body: [
        'A experiência comercial do Amoraê foi pensada para equilibrar descoberta, encantamento e ação. O usuário entra pela atmosfera da marca, percebe suas categorias e modos de pedido, vê produtos em destaque, conhece extensões do universo Amoraê e só depois aprofunda a navegação comercial.'
      ],
      media: {
        kind: 'image',
        src: '/media/amorae/produtosAmorae.png',
        alt: 'Vitrine de produtos do projeto Amoraê',
        aspectRatio: '1824 / 833'
      }
    },
    {
      id: 'experiencia',
      eyebrow: 'Experiência',
      title: 'O Amoraê não foi pensado apenas como uma gelateria digital.',
      body: [
        'O Amoraê busca transmitir acolhimento, delicadeza, nostalgia leve, desejo visual e calma. A proposta não é acelerar o consumo nem construir energia comercial agressiva. O objetivo é criar conforto visual, vontade de permanecer e sensação de pausa bonita.'
      ],
      media: {
        kind: 'image',
        src: '/media/amorae/homeAmorae.png',
        alt: 'Home editorial do projeto Amoraê',
        aspectRatio: '16 / 9'
      },
      gallery: [
        {
          kind: 'image',
          src: '/media/amorae/secaoDeProdutosAmorae.png',
          alt: 'Catálogo e seção de produtos do projeto Amoraê',
          aspectRatio: '16 / 9'
        },
        {
          kind: 'image',
          src: '/media/amorae/secaoLembrancinhasAmorae.png',
          alt: 'Seção de lembrancinhas do projeto Amoraê',
          aspectRatio: '1588 / 588'
        }
      ]
    },
    {
      id: 'construcao',
      eyebrow: 'Construção',
      title:
        'Aplicação React com separação real de responsabilidades',
      body: [
        'Há uma preocupação clara com componentização, escalabilidade e repetição controlada. A home é montada a partir de componentes de hero, destaques, listas de produtos, layout, botões, textos e títulos, o que permite organizar a narrativa sem perder consistência. O tema visual centraliza cor, tipografia, espaçamento, sombras e bordas, enquanto a navegação com React Router e o carrinho com contexto e reducer dão base estrutural ao projeto.'
      ],
      media: {
        kind: 'image',
        src: '/media/amorae/visualizandoProdutoAmorae.png',
        alt: 'Página de produto do projeto Amoraê',
        aspectRatio: '1244 / 689'
      },
      gallery: [
        {
          kind: 'image',
          src: '/media/amorae/carrinhoAmorae.png',
          alt: 'Carrinho do projeto Amoraê',
          aspectRatio: '1359 / 801'
        }
      ]
    }
  ],
  detailGroups: [
    {
      title: 'Fundação do projeto',
      items: [
        {
          label: 'Jornada da experiência',
          value:
            'Dentro dessa jornada, algumas áreas têm papel decisivo: o hero e a apresentação do "jeito Amoraê" definem o tom; a construção do pedido organiza a entrada no universo comercial; a vitrine de produtos sustenta desejo e curadoria; a extensão da marca para lembranças e peças especiais amplia o vínculo; e o manifesto final amarra a proposta emocional do projeto.'
        },
        {
          label: 'Desejo e nomeação',
          value:
            'O Amoraê cria desejo nomeando com intenção, descrevendo com cenas e organizando por ocasião, clima e vínculo emocional. Em vez de falar só de ingrediente ou preço, ele sugere mesa compartilhada, pausa do dia, lembrança, presente e atmosfera.'
        }
      ]
    },
    {
      title: 'Sensação e linguagem',
      items: [
        {
          label: 'Repertório verbal',
          value:
            'Uma das bases mais fortes da identidade do Amoraê está na forma como ele nomeia e descreve seus produtos. Itens como "Sessão da Tarde", "Morango de Domingo", "Creme das 5" e "Doce Lembrança" não funcionam apenas como nomes chamativos; eles transformam itens comuns em cenas imagináveis, em pequenas lembranças ou ocasiões afetivas. É esse repertório verbal que impede o projeto de parecer uma vitrine genérica.'
        }
      ]
    },
    {
      title: 'Método e base técnica',
      items: [
        {
          label: 'Decisões técnicas',
          value:
            'As decisões técnicas mais importantes do projeto foram: usar React com TypeScript para segurança e organização; separar a navegação com React Router; centralizar estilo e linguagem visual com styled-components e tema; e tratar o carrinho com contexto e reducer para dar coerência ao estado global. Essas decisões sustentam tanto a proposta visual quanto a expansão futura do projeto.'
        }
      ]
    }
  ],
  closing: {
    title: 'Encerramento',
    body: [
      'Mais do que uma vitrine visual, o Amoraê é um exercício de produto, marca e experiência comercial na mesma aplicação.'
    ]
  },
  gallery: [
    {
      kind: 'image',
      src: '/media/amorae/homeAmorae.png',
      alt: 'Home do projeto Amoraê',
      aspectRatio: '16 / 9'
    },
    {
      kind: 'image',
      src: '/media/amorae/secaoDeProdutosAmorae.png',
      alt: 'Seção de produtos do projeto Amoraê',
      aspectRatio: '16 / 9'
    },
    {
      kind: 'image',
      src: '/media/amorae/secaoLembrancinhasAmorae.png',
      alt: 'Seção de lembrancinhas do projeto Amoraê',
      aspectRatio: '1588 / 588'
    },
    {
      kind: 'image',
      src: '/media/amorae/visualizandoProdutoAmorae.png',
      alt: 'Visualização de produto no projeto Amoraê',
      aspectRatio: '1244 / 689'
    },
    {
      kind: 'image',
      src: '/media/amorae/carrinhoAmorae.png',
      alt: 'Carrinho do projeto Amoraê',
      aspectRatio: '1359 / 801'
    }
  ],
  links: [
    {
      label: 'Projeto publicado',
      href: 'https://projeto-amorae.vercel.app/',
      external: true
    },
    {
      label: 'Repositório no GitHub',
      href: 'https://github.com/GabrielKayfer/ProjetoAmorae',
      external: true
    }
  ],
  stack: [
    'React',
    'TypeScript',
    'Vite',
    'React Router DOM',
    'Styled Components'
  ],
  seo: {
    title: 'Amoraê | Gabriel Lira',
    description:
      'Projeto de e-commerce com identidade de marca própria, catálogo, página de produto e carrinho em React.'
  }
};
