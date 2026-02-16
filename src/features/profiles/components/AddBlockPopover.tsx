import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getAllBlockDefinitions } from "@/features/profiles/blocks/registry";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";

import { BlockType } from "@/features/profiles/types/profile-content";

interface AddBlockPopoverProps {
  onAddBlock: (type: BlockType, x?: number, y?: number) => void;
  trigger?: React.ReactNode;
  x?: number;
  y?: number;
}

export function AddBlockPopover({
  onAddBlock,
  trigger,
  x,
  y
}: AddBlockPopoverProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSelect = (type: BlockType) => {
    onAddBlock(type, x, y);
    setOpen(false);
  };

  const Options = () => (
    <div className="grid gap-4 p-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Add Block</h4>
        <p className="text-sm text-muted-foreground">
          Choose a block type to add to your profile.
        </p>
      </div>
      <div className="grid gap-2">
        {getAllBlockDefinitions().map((def) => (
          <Button
            key={def.type}
            variant="outline"
            className="justify-start gap-2 h-auto py-3"
            onClick={() => handleSelect(def.type)}
          >
            <div
              className={cn(
                "p-2 rounded-md",
                def.colors.bg,
                def.colors.text,
                def.colors.darkBg,
                def.colors.darkText
              )}
            >
              <def.icon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-medium">{def.label}</div>
              <div className="text-xs text-muted-foreground">
                {def.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {trigger || (
            <Button variant="outline" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start" sideOffset={12}>
          <Options />
        </PopoverContent>
      </Popover>
    );
  }

  // Mobile: use popover as well (no drawer dependency)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger || (
          <Button variant="outline" size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start" sideOffset={12}>
        <Options />
      </PopoverContent>
    </Popover>
  );
}
