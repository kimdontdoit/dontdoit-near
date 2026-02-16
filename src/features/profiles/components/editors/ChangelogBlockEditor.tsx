import { ChangelogBlock } from "@/features/profiles/types/profile-content";

interface ChangelogBlockEditorProps {
  block: ChangelogBlock;
  onChange: (block: ChangelogBlock) => void;
}

export const ChangelogBlockEditor = ({
  block,
  onChange
}: ChangelogBlockEditorProps) => {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Changelog Block</h3>
        <p className="text-sm text-muted-foreground">
          This block displays your latest changelog entries from the CMS.
        </p>
      </div>

      <div className="rounded-lg border border-border/40 bg-muted/20 p-4">
        <p className="text-sm text-muted-foreground">
          The changelog block pulls data automatically from your published posts.
          No configuration needed - just add it to your grid and it will display
          your latest updates.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Display Limit</label>
        <input
          type="number"
          min="1"
          max="10"
          value={block.content.limit || 5}
          onChange={(e) => {
            const limit = parseInt(e.target.value, 10);
            if (!isNaN(limit) && limit > 0) {
              onChange({
                ...block,
                content: {
                  ...block.content,
                  limit
                }
              });
            }
          }}
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Number of recent posts to show (1-10)
        </p>
      </div>
    </div>
  );
};

export default ChangelogBlockEditor;
