import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { MediaAsset } from '../../types/content';
import { resolvePosterSource } from '../../utils/media';

interface ResponsiveMediaProps {
  asset: MediaAsset;
  priority?: boolean;
  fit?: 'contain' | 'cover';
  frameSizing?: 'fill' | 'fit-media';
  surfaceVariant?: 'framed' | 'plain';
}

const Root = styled.figure<{ $frameSizing: 'fill' | 'fit-media' }>`
  min-height: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  height: ${({ $frameSizing }) => ($frameSizing === 'fit-media' ? '100%' : 'auto')};
`;

const Frame = styled.div<{
  $aspectRatio: string;
  $frameSizing: 'fill' | 'fit-media';
  $surfaceVariant: 'framed' | 'plain';
}>`
  position: relative;
  min-height: 0;
  overflow: hidden;
  border: ${({ theme, $surfaceVariant }) =>
    $surfaceVariant === 'plain' ? 'none' : `1px solid ${theme.colors.border}`};
  border-radius: 0;
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
      : `
          width: 100%;
        `}
`;

const sharedMediaStyles = `
  width: 100%;
  height: 100%;
`;

const Image = styled.img<{ $fit: 'contain' | 'cover' }>`
  ${sharedMediaStyles}
  object-fit: ${({ $fit }) => $fit};
  object-position: center center;
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
  surfaceVariant = 'framed'
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
        $surfaceVariant={surfaceVariant}
      >
        {stillSource && !hasError ? (
          <Image
            $fit={fit}
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
