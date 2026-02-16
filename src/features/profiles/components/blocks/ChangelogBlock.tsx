import { format } from "date-fns";
import { ChangelogBlock as ChangelogBlockType } from "@/features/profiles/types/profile-content";
import { ResolvedTheme } from "@/features/profiles/theme";
import { cn } from "@/lib/cn";
import { BlockControls } from "./BlockControls";

export type ChangelogPost = {
  id: string;
  title: string | null;
  content: string | null;
  created_at: string;
  slug: string;
  hashtags: string[] | null;
  profiles?: {
    username: string | null;
  } | null;
};

interface ChangelogBlockProps {
  block: ChangelogBlockType;
  className?: string;
  isEditing?: boolean;
  onRemove?: () => void;
  onEdit?: () => void;
  style?: React.CSSProperties;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onTouchEnd?: React.TouchEventHandler;
  theme?: ResolvedTheme;
  userId?: string;
  changelogPosts?: ChangelogPost[];
}

function createExcerpt(html: string | null, maxLength = 120): string {
  if (!html) return "";
  const text = html.replace(/<[^>]*>/g, " ");
  const decoded = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
  const cleaned = decoded.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength).trim() + "...";
}

export const ChangelogBlock = ({
  block,
  className,
  isEditing = false,
  onRemove,
  onEdit,
  style,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
  theme,
  changelogPosts = []
}: ChangelogBlockProps) => {
  const { content } = block;
  const limit = content.limit || 5;
  const posts = changelogPosts.slice(0, limit);

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
        <h3 className="text-lg font-semibold mb-4 leading-tight tracking-tight text-foreground">
          Changelog
        </h3>

        {posts.length === 0 ? (
          <div className="flex items-center justify-center flex-1">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">No changelog posts yet.</p>
              <p className="text-xs text-muted-foreground/60">
                Posts will appear here once published.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative flex-1 overflow-y-auto pr-1 -mr-1">
            <div className="space-y-4">
              {posts.map((post) => {
                const formattedDate = format(new Date(post.created_at), "MMM d, yyyy");
                const excerpt = createExcerpt(post.content);

                return (
                  <div
                    key={post.id}
                    className="relative pl-7 pb-4 border-l-2 border-dashed border-border/40 last:border-transparent last:pb-0"
                  >
                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary/40 border-2 border-background" />

                    <div className="space-y-1.5">
                      <time className="text-xs font-medium text-muted-foreground block">
                        {formattedDate}
                      </time>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold leading-snug text-foreground line-clamp-2">
                          {post.title || "Update"}
                        </h4>
                        {excerpt && (
                          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                            {excerpt}
                          </p>
                        )}
                      </div>
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

export default ChangelogBlock;
