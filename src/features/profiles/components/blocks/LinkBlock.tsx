import { LinkBlock as LinkBlockType } from "@/features/profiles/types/profile-content";
import { ResolvedTheme } from "@/features/profiles/theme";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";
import { sanitizeUrl } from "@/lib/security";
import { BlockControls } from "./BlockControls";

interface LinkBlockProps {
  block: LinkBlockType;
  isEditing?: boolean;
  onRemove?: () => void;
  onEdit?: () => void;
  className?: string;
  style?: React.CSSProperties;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onTouchEnd?: React.TouchEventHandler;
  theme?: ResolvedTheme;
}

const LinkBlock = ({
  block,
  isEditing = false,
  onRemove,
  onEdit,
  className,
  style,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
  theme
}: LinkBlockProps) => {
  if (!theme) return null;

  return (
    <div
      className={cn("h-full w-full relative group/block", className)}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
    >
      {isEditing && <BlockControls onRemove={onRemove} onEdit={onEdit} />}

      <a
        href={sanitizeUrl(block.content.url)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "block w-full h-full p-4 group overflow-hidden relative text-card-foreground",
          theme.borderRadius,
          theme.backgroundColor,
          theme.border,
          theme.shadow,
          isEditing ? theme.editing : theme.hover
        )}
        onClick={(e) => {
          if (isEditing) {
            e.preventDefault();
          }
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted shrink-0 text-xl overflow-hidden">
              {block.content.icon ? (
                <img
                  src={block.content.icon}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-muted-foreground w-5 h-5 flex items-center justify-center">
                  🔗
                </span>
              )}
            </div>

            {block.w > 1 && (
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>

          <div className="mt-auto">
            <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
              {block.content.title}
            </h3>
            {block.w > 1 && (
              <p className="text-xs text-muted-foreground mt-1 truncate opacity-70">
                {block.content.url}
              </p>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default LinkBlock;
