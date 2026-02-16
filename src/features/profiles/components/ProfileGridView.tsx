import { ProfileContent } from "@/features/profiles/types/profile-content";
import { resolveTheme } from "@/features/profiles/theme";
import { BLOCK_REGISTRY } from "@/features/profiles/blocks/registry";
import { cn } from "@/lib/cn";
import { useContainerWidth } from "react-grid-layout";

interface ProfileGridViewProps {
  content: ProfileContent;
}

const ProfileGridView = ({ content }: ProfileGridViewProps) => {
  const { width, containerRef } = useContainerWidth();
  const theme = resolveTheme(content.theme);
  const gap = theme.gap || 16;
  const cols = 4;
  const validWidth = width > 0 ? width : 1200;
  const colWidth = (validWidth - gap * (cols - 1)) / cols;
  const rowHeight = colWidth;

  const sortedBlocks = [...content.blocks].sort((a, b) => {
    if (a.y === b.y) return a.x - b.x;
    return a.y - b.y;
  });

  const renderBlock = (block: ProfileContent["blocks"][number]) => {
    const definition = BLOCK_REGISTRY[block.type];
    if (!definition) {
      return <div className="bg-muted rounded-md p-4">Unknown block type</div>;
    }

    const Component = definition.component;
    return (
      <Component
        block={block}
        isEditing={false}
        theme={theme}
      />
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl mx-auto p-4 sm:p-0"
    >
      {/* Mobile: Linear auto-flow */}
      <div
        className={cn("grid grid-cols-1 sm:grid-cols-2 md:hidden")}
        style={{ gap }}
      >
        {sortedBlocks.map((block) => (
          <div
            key={block.i}
            className={cn(
              block.w >= 2 ? "col-span-1 sm:col-span-2" : "col-span-1",
              "aspect-square"
            )}
            style={{
              aspectRatio: `${block.w} / ${block.h}`
            }}
          >
            {renderBlock(block)}
          </div>
        ))}
      </div>

      {/* Desktop: Exact Grid */}
      <div
        className="hidden md:grid"
        style={{
          gap,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridAutoRows: `${rowHeight}px`
        }}
      >
        {content.blocks.map((block) => (
          <div
            key={block.i}
            className="h-full"
            style={{
              gridColumnStart: block.x + 1,
              gridColumnEnd: `span ${block.w}`,
              gridRowStart: block.y + 1,
              gridRowEnd: `span ${block.h}`
            }}
          >
            {renderBlock(block)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileGridView;
