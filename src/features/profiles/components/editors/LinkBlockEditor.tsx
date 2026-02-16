import { LinkBlock } from "@/features/profiles/types/profile-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface LinkBlockEditorProps {
  block: LinkBlock;
  onChange: (updatedBlock: LinkBlock) => void;
  onClose: () => void;
}

export const LinkBlockEditor = ({
  block,
  onChange,
  onClose
}: LinkBlockEditorProps) => {
  return (
    <Card className="h-full w-full flex flex-col border-0 rounded-none shadow-none animate-in slide-in-from-right duration-200">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b space-y-0">
        <CardTitle className="text-lg">Edit Link Block</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <ScrollArea className="flex-1">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={block.content.title}
              onChange={(e) =>
                onChange({
                  ...block,
                  type: "link",
                  content: { ...block.content, title: e.target.value }
                })
              }
              placeholder="Link Title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={block.content.url}
              onChange={(e) =>
                onChange({
                  ...block,
                  type: "link",
                  content: { ...block.content, url: e.target.value }
                })
              }
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon URL (Optional)</Label>
            <Input
              id="icon"
              value={block.content.icon || ""}
              onChange={(e) =>
                onChange({
                  ...block,
                  type: "link",
                  content: { ...block.content, icon: e.target.value }
                })
              }
              placeholder="https://example.com/favicon.png"
            />
          </div>
        </CardContent>
      </ScrollArea>

      <CardFooter className="p-4 border-t bg-muted/50 text-xs text-muted-foreground">
        Changes are previewed live. Close to revert if not saved.
      </CardFooter>
    </Card>
  );
};
