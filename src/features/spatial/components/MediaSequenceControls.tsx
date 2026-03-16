import { ActionPillButton } from './ActionPill';
import { PanelMediaHeader } from './ProjectPanelPrimitives';

interface MediaSequenceControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  nextLabel?: string;
  previousLabel?: string;
}

export function MediaSequenceControls({
  onNext,
  onPrevious,
  nextLabel = 'Proxima imagem',
  previousLabel = 'Anterior'
}: MediaSequenceControlsProps) {
  return (
    <PanelMediaHeader>
      <ActionPillButton onClick={onPrevious} type="button">
        {previousLabel}
      </ActionPillButton>

      <ActionPillButton onClick={onNext} type="button">
        {nextLabel}
      </ActionPillButton>
    </PanelMediaHeader>
  );
}
