import { ImageBlock as ImageBlockType } from "@/features/profiles/types/profile-content";
import { ResolvedTheme } from "@/features/profiles/theme";
import { cn } from "@/lib/cn";
import { Image } from "lucide-react";
import React, { memo, useMemo } from "react";
import { BlockControls } from "./BlockControls";

const positionClasses: Record<
  NonNullable<ImageBlockType["content"]["position"]>,
  string
> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
  "top-left": "object-left-top",
  "top-right": "object-right-top",
  "bottom-left": "object-left-bottom",
  "bottom-right": "object-right-bottom"
};

interface ImageBlockProps {
  block: ImageBlockType;
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

const ImageBlock = memo(
  ({
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
  }: ImageBlockProps) => {
    const { fit = "cover", position = "center", url, alt } = block.content;
    const positionClass = positionClasses[position];
    const isCover = fit === "cover";
    const isPriority = block.y === 0;

    const sizes = useMemo(() => {
      return `(max-width: 768px) 100vw, (max-width: 1024px) ${Math.min(block.w * 50, 100)}vw, ${Math.min(block.w * 25, 100)}vw`;
    }, [block.w]);

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

        <div
          className={cn(
            "block w-full h-full overflow-hidden relative text-card-foreground",
            theme.borderRadius,
            theme.backgroundColor,
            theme.border,
            theme.shadow,
            isEditing ? theme.editing : theme.hover
          )}
        >
          {url ? (
            <img
              src={url}
              alt={alt || "Profile image"}
              loading={isPriority ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              fetchPriority={isPriority ? "high" : "auto"}
              sizes={sizes}
              className={cn(
                "w-full h-full select-none",
                isCover ? "object-cover" : "object-contain",
                positionClass
              )}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground bg-muted/40 text-center p-2">
              <Image className="w-6 h-6" />
              <span className="text-xs">Add an image URL</span>
            </div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.isEditing !== nextProps.isEditing) return false;
    if (prevProps.style !== nextProps.style) return false;
    if (prevProps.className !== nextProps.className) return false;

    const prevContent = prevProps.block.content;
    const nextContent = nextProps.block.content;

    if (prevContent.url !== nextContent.url) return false;
    if (prevContent.alt !== nextContent.alt) return false;
    if (prevContent.fit !== nextContent.fit) return false;
    if (prevContent.position !== nextContent.position) return false;

    if (prevProps.block.w !== nextProps.block.w) return false;
    if (prevProps.block.h !== nextProps.block.h) return false;

    if (prevProps.theme !== nextProps.theme) return false;

    return true;
  }
);

ImageBlock.displayName = "ImageBlock";

export default ImageBlock;
