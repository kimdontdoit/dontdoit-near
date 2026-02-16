import { useMemo } from "react";
import { CVBlock as CVBlockType } from "@/features/profiles/types/profile-content";
import { ResolvedTheme } from "@/features/profiles/theme";
import { cn } from "@/lib/cn";
import { BlockControls } from "./BlockControls";
import { formatDateRange } from "@/features/profiles/lib/dateUtils";

interface CVBlockProps {
  block: CVBlockType;
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

export const CVBlock = ({
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
}: CVBlockProps) => {
  const { content } = block;

  const sortedExperiences = useMemo(() => {
    const experiences = content.experiences || [];
    return [...experiences].sort((a, b) => {
      return b.startDate.localeCompare(a.startDate);
    });
  }, [content.experiences]);

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
          "w-full h-full flex flex-col p-5 overflow-hidden",
          theme.borderRadius,
          theme.backgroundColor,
          theme.border,
          theme.shadow,
          isEditing ? theme.editing : theme.hover
        )}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground">
            Work Experience
          </h3>
        </div>

        {sortedExperiences.length === 0 ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">No work experience added yet.</p>
              <p className="text-xs text-muted-foreground/60">
                Click edit to add your work history.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative flex-1">
            <div className="space-y-5">
              {sortedExperiences.map((exp) => {
                const yearRange = formatDateRange(exp.startDate, exp.endDate);

                return (
                  <div
                    key={exp.id}
                    className="pb-5 last:pb-0"
                  >
                    <div className="space-y-1">
                      <time className="text-xs font-medium text-muted-foreground/80 block">
                        {yearRange}
                      </time>
                      <h4 className="text-sm font-semibold leading-snug text-foreground">
                        {exp.title}
                      </h4>
                      <p className="text-sm text-foreground/80">
                        {exp.company}
                      </p>
                      {exp.location && (
                        <p className="text-xs text-muted-foreground">
                          {exp.location}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVBlock;
