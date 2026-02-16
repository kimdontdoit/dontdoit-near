import { useMemo } from "react";
import { Plus } from "lucide-react";
import { Responsive, useContainerWidth, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  ProfileContent,
  BLOCK_CONSTRAINTS,
  BlockType
} from "@/features/profiles/types/profile-content";
import { AddBlockPopover } from "./AddBlockPopover";
import { resolveTheme } from "@/features/profiles/theme";
import { BLOCK_REGISTRY } from "@/features/profiles/blocks/registry";
import { cn } from "@/lib/cn";

const ResponsiveGridLayout = Responsive as unknown as React.ComponentType<any>;

interface ProfileGridProps {
  content: ProfileContent;
  isEditing?: boolean;
  onLayoutChange?: (layout: any) => void;
  onAddBlock?: (
    type: BlockType,
    x?: number,
    y?: number
  ) => void;
  onRemoveBlock?: (blockId: string) => void;
  onEditBlock?: (blockId: string) => void;
  userId?: string;
}

const ProfileGrid = ({
  content,
  isEditing = false,
  onLayoutChange,
  onAddBlock,
  onRemoveBlock,
  onEditBlock,
  userId
}: ProfileGridProps) => {
  const { width, containerRef, mounted } = useContainerWidth();

  const getCols = (currentWidth: number) => {
    if (currentWidth >= 1200) return 4;
    if (currentWidth >= 996) return 4;
    if (currentWidth >= 768) return 4;
    if (currentWidth >= 480) return 2;
    return 1;
  };

  const cols = getCols(width);
  const isCanonicalLayout = cols === 4;

  const theme = resolveTheme(content.theme);
  const margin = theme.gap || 16;

  const validWidth = width > 0 ? width : 1200;
  const colWidth = (validWidth - margin * (cols - 1)) / cols;
  const rowHeight = colWidth;

  const maxRow = useMemo(() => {
    if (!content.blocks.length) return 0;
    const finiteBlocks = content.blocks.filter((b) => isFinite(b.y));
    if (finiteBlocks.length === 0) return 0;
    return Math.max(...finiteBlocks.map((b) => b.y + b.h));
  }, [content.blocks]);

  const blockLayouts = useMemo(() => {
    return content.blocks.map((block) => {
      const constraints = BLOCK_CONSTRAINTS[block.type] || {
        minW: 1,
        maxW: 4,
        minH: 1,
        maxH: 4
      };

      return {
        i: block.i,
        x: block.x,
        y: block.y,
        w: block.w,
        h: block.h,
        minW: constraints.minW,
        minH: constraints.minH,
        maxW: constraints.maxW,
        maxH: constraints.maxH,
        isResizable: constraints.isResizable !== false
      };
    });
  }, [content.blocks]);

  const ghostCells = useMemo(() => {
    if (!isEditing || !mounted || !isCanonicalLayout) return [];

    const occupied = new Set<string>();
    content.blocks.forEach((block) => {
      if (!isFinite(block.y) || !isFinite(block.x)) return;
      for (let y = block.y; y < block.y + block.h; y++) {
        for (let x = block.x; x < block.x + block.w; x++) {
          occupied.add(`${x},${y}`);
        }
      }
    });

    const cells = [];
    const totalRows = maxRow + 1;

    for (let y = 0; y < totalRows; y++) {
      for (let x = 0; x < cols; x++) {
        if (!occupied.has(`${x},${y}`)) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }, [isEditing, mounted, maxRow, content.blocks, cols, isCanonicalLayout]);

  const renderBlock = (blockId: string) => {
    const block = content.blocks.find((b) => b.i === blockId);
    if (!block) return null;

    const definition = BLOCK_REGISTRY[block.type];
    if (!definition) return null;

    const Component = definition.component;

    return (
      <Component
        key={block.i}
        block={block}
        isEditing={isEditing}
        onRemove={() => onRemoveBlock?.(block.i)}
        onEdit={() => onEditBlock?.(block.i)}
        theme={theme}
        userId={userId}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "profile-grid w-full max-w-4xl mx-auto relative min-h-[500px]"
      )}
    >
      {isEditing && mounted && isCanonicalLayout && (
        <div className="absolute inset-0 z-10">
          {ghostCells.map((cell) => {
            const left = Math.round(cell.x * (colWidth + margin));
            const top = Math.round(cell.y * (rowHeight + margin));

            return (
              <div
                key={`ghost-${cell.x}-${cell.y}`}
                className="absolute pointer-events-auto transition-all duration-200 group"
                style={{
                  left: `${left}px`,
                  top: `${top}px`,
                  width: `${colWidth}px`,
                  height: `${rowHeight}px`
                }}
              >
                <AddBlockPopover
                  x={cell.x}
                  y={cell.y}
                  onAddBlock={(type, x, y) => {
                    if (onAddBlock) {
                      onAddBlock(type, x, y);
                    }
                  }}
                  trigger={
                    <button
                      className={cn(
                        "w-full h-full flex items-center justify-center transition-all group-hover:bg-muted/10",
                        theme.ghost.border,
                        theme.ghost.borderRadius,
                        theme.ghost.backgroundColor,
                        "group-hover:border-muted-foreground/30 text-muted-foreground/0 group-hover:text-muted-foreground"
                      )}
                    >
                      <Plus className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  }
                />
              </div>
            );
          })}
        </div>
      )}

      {mounted && (
        <ResponsiveGridLayout
          className="layout relative"
          layouts={{
            lg: blockLayouts,
            md: blockLayouts,
            sm: blockLayouts,
            xs: blockLayouts,
            xxs: blockLayouts
          }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: cols, md: cols, sm: cols, xs: 2, xxs: 1 }}
          rowHeight={rowHeight}
          margin={[margin, margin]}
          containerPadding={[0, 0]}
          dragConfig={{
            enabled: isEditing && isCanonicalLayout
          }}
          resizeConfig={{
            enabled: isEditing && isCanonicalLayout
          }}
          width={width}
          onLayoutChange={(currentLayout: Layout[]) => {
            if (onLayoutChange && isCanonicalLayout) {
              onLayoutChange(currentLayout);
            }
          }}
        >
          {blockLayouts.map((item) => (
            <div key={item.i} className="z-20">
              {renderBlock(item.i)}
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export default ProfileGrid;
