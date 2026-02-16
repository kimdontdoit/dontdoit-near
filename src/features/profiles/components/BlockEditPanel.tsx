import { useEffect } from "react";
import { ProfileBlock } from "@/features/profiles/types/profile-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BLOCK_REGISTRY } from "@/features/profiles/blocks/registry";

interface BlockEditPanelProps {
  block: ProfileBlock;
  onChange: (updatedBlock: ProfileBlock) => void;
  onClose: () => void;
  isNewBlock?: boolean;
}

export const BlockEditPanel = ({
  block,
  onChange,
  onClose,
  isNewBlock = false
}: BlockEditPanelProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const definition = BLOCK_REGISTRY[block.type];

  if (!definition) {
    return (
      <Card className="w-full h-full p-4 border-0 rounded-none shadow-none">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">
            Unknown Block Type: {block.type}
            <pre className="text-xs mt-2 p-2 bg-muted rounded overflow-auto max-w-[300px]">
              {JSON.stringify(block, null, 2)}
            </pre>
          </span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    );
  }

  const Editor = definition.editor;

  return (
    <Editor
      block={block}
      onChange={(updatedBlock: ProfileBlock) => onChange(updatedBlock)}
      onClose={onClose}
      isNewBlock={isNewBlock}
    />
  );
};
