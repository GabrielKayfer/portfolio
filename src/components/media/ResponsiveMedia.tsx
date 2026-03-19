import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { MediaAsset } from '../../types/content';
import { resolvePosterSource } from '../../utils/media';

interface ResponsiveMediaProps {
  asset: MediaAsset;
  priority?: boolean;
  fit?: 'contain' | 'cover';
  frameSizing?: 'fill' | 'fit-media' | 'viewport-fill';
  surfaceVariant?: 'framed' | 'plain';
  objectPosition?: string;
  cornerStyle?: 'sharp' | 'card';
}

const Root = styled.figure<{ $frameSizing: 'fill' | 'fit-media' | 'viewport-fill' }>`
  margin: 0;
  min-height: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  height: ${({ $frameSizing }) =>
    $frameSizing === 'fill' ? 'auto' : '100%'};
`;

const Frame = styled.div<{
  $aspectRatio: string;
  $frameSizing: 'fill' | 'fit-media' | 'viewport-fill';
  $surfaceVariant: 'framed' | 'plain';
  $cornerStyle: 'sharp' | 'card';
}>`
  position: relative;
  min-height: 0;
  overflow: hidden;
  border: ${({ theme, $surfaceVariant }) =>
    $surfaceVariant === 'plain' ? 'none' : `1px solid ${theme.colors.border}`};
  border-radius: ${({ $cornerStyle }) =>
    $cornerStyle === 'card' ? '1.1rem' : '0'};
  background: ${({ theme, $surfaceVariant }) =>
    $surfaceVariant === 'plain'
      ? 'transparent'
      : `radial-gradient(
      circle at top right,
      rgba(255, 255, 255, 0.08),
      transparent 40%
    ),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0)),
    ${theme.colors.surface}`};
  box-shadow: ${({ theme, $surfaceVariant }) =>
    $surfaceVariant === 'plain'
      ? 'none'
      : `0 18px 40px ${theme.colors.shadow}`};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};

  ${({ $frameSizing }) =>
    $frameSizing === 'fit-media'
      ? `
          justify-self: center;
          align-self: center;
          width: auto;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
        `
      : $frameSizing === 'viewport-fill'
        ? `
            justify-self: stretch;
            align-self: stretch;
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            aspect-ratio: auto;
          `
      : `
          width: 100%;
        `}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ $cornerStyle }) =>
      $cornerStyle === 'card' ? '0.95rem' : '0'};
  }
`;

const sharedMediaStyles = `
  width: 100%;
  height: 100%;
`;

const Image = styled.img<{ $fit: 'contain' | 'cover'; $objectPosition: string }>`
  ${sharedMediaStyles}
  object-fit: ${({ $fit }) => $fit};
  object-position: ${({ $objectPosition }) => $objectPosition};
`;

const Placeholder = styled.div`
  ${sharedMediaStyles}
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

const Caption = styled.figcaption`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

export function ResponsiveMedia({
  asset,
  priority = false,
  fit = 'cover',
  frameSizing = 'fill',
  surfaceVariant = 'framed',
  objectPosition = 'center center',
  cornerStyle = 'sharp'
}: ResponsiveMediaProps) {
  const stillSource = resolvePosterSource(asset);
  const shouldSyncAspectRatio = !asset.aspectRatio;
  const [hasError, setHasError] = useState(false);
  const [resolvedAspectRatio, setResolvedAspectRatio] = useState(
    asset.aspectRatio ?? '16 / 9'
  );

  useEffect(() => {
    setHasError(false);
    setResolvedAspectRatio(asset.aspectRatio ?? '16 / 9');
  }, [asset.aspectRatio, asset.kind, asset.poster, asset.src]);

  const syncAspectRatio = (width: number, height: number) => {
    if (!width || !height) {
      return;
    }

    setResolvedAspectRatio(`${width} / ${height}`);
  };

  return (
    <Root $frameSizing={frameSizing}>
      <Frame
        $aspectRatio={resolvedAspectRatio}
        $frameSizing={frameSizing}
        $cornerStyle={cornerStyle}
        $surfaceVariant={surfaceVariant}
      >
        {stillSource && !hasError ? (
          <Image
            $fit={fit}
            $objectPosition={objectPosition}
            alt={asset.alt}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            loading={priority ? 'eager' : 'lazy'}
            onError={() => setHasError(true)}
            onLoad={(event) => {
              if (shouldSyncAspectRatio) {
                syncAspectRatio(
                  event.currentTarget.naturalWidth,
                  event.currentTarget.naturalHeight
                );
              }
            }}
            src={stillSource}
          />
        ) : (
          <Placeholder aria-label={asset.alt} role="img">
            Midia ainda nao preparada para esta visualizacao.
          </Placeholder>
        )}
      </Frame>
      {asset.caption ? <Caption>{asset.caption}</Caption> : null}
    </Root>
  );
}
