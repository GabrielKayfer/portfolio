import styled from 'styled-components';
import { RouteSeo } from '../components/seo/RouteSeo';
import { BodyText } from '../components/ui/BodyText';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Heading } from '../components/ui/Heading';
import { LinkButton } from '../components/ui/LinkButton';
import { Section } from '../components/ui/Section';

const Stack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-items: start;
`;

export function NotFoundPage() {
  return (
    <>
      <RouteSeo description="Pagina nao encontrada." title="404 | Gabriel Lira" />
      <Section width="narrow">
        <Stack>
          <Eyebrow>404</Eyebrow>
          <Heading as="h1" size="hero">
            Caminho nao encontrado.
          </Heading>
          <BodyText>
            A rota nao corresponde a nenhuma pagina do portfolio. Use a home como ponto central de navegacao.
          </BodyText>
          <LinkButton href="/">Voltar para home</LinkButton>
        </Stack>
      </Section>
    </>
  );
}
