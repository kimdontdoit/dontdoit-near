import { TextBlock as TextBlockType } from "@/features/profiles/types/profile-content";
import { ResolvedTheme } from "@/features/profiles/theme";
import { cn } from "@/lib/cn";
import { BlockControls } from "./BlockControls";
import { useState, useEffect } from "react";

const useSanitizedHTML = (html: string): string => {
  const [sanitized, setSanitized] = useState(html);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("isomorphic-dompurify").then((module) => {
        const DOMPurify = module.default;
        setSanitized(DOMPurify.sanitize(html));
      }).catch(() => {
        setSanitized(html);
      });
    }
  }, [html]);

  return sanitized;
};

interface TextBlockProps {
  block: TextBlockType;
  className?: string;
  isEditing?: boolean;
  onRemove?: () => void;
  onEdit?: () => void;
  style?: React.CSSProperties;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onTouchEnd?: React.TouchEventHandler;
  theme?: ResolvedTheme;
}

export const TextBlock = ({
  block,
  className,
  isEditing = false,
  onRemove,
  onEdit,
  style,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
  theme
}: TextBlockProps) => {
  const { content } = block;
  const { title, text, align = "left" } = content;

  const sanitizedText = useSanitizedHTML(text);

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
          "w-full h-full flex flex-col p-6 overflow-hidden",
          theme.borderRadius,
          theme.backgroundColor,
          theme.border,
          theme.shadow,
          isEditing ? theme.editing : theme.hover
        )}
        style={{ textAlign: align }}
      >
        {title && (
          <h3 className="text-lg font-semibold mb-2 leading-tight tracking-tight text-foreground/90">
            {title}
          </h3>
        )}

        <div
          className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed break-words"
          dangerouslySetInnerHTML={{ __html: sanitizedText }}
        />
      </div>
    </div>
  );
};

export default TextBlock;
