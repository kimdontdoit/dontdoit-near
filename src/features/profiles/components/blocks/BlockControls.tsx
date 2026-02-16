import { Minus, Pencil } from "lucide-react";
import { memo } from "react";

interface BlockControlsProps {
  onRemove?: () => void;
  onEdit?: () => void;
}

export const BlockControls = memo(
  ({ onRemove, onEdit }: BlockControlsProps) => {
    return (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove?.();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute -top-2 -left-2 z-50 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover/block:opacity-100 transition-opacity cursor-pointer pointer-events-auto hover:bg-destructive/90"
          aria-label="Remove block"
        >
          <Minus className="w-3 h-3" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit?.();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute -top-2 -right-2 z-50 w-6 h-6 bg-popover border border-border text-foreground rounded-full flex items-center justify-center opacity-0 group-hover/block:opacity-100 transition-opacity cursor-pointer pointer-events-auto hover:bg-background/80"
          aria-label="Edit block"
        >
          <Pencil className="w-3 h-3" />
        </button>
      </>
    );
  }
);

BlockControls.displayName = "BlockControls";
