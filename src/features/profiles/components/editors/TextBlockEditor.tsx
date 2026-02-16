import { TextBlock } from "@/features/profiles/types/profile-content";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { X, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapEditor = ({
  content,
  onChange
}: {
  content: string;
  onChange: (html: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose prosem-sm dark:prose-invert max-w-none"
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  return <EditorContent editor={editor} />;
};

interface TextBlockEditorProps {
  block: TextBlock;
  onChange: (updatedBlock: TextBlock) => void;
  onClose: () => void;
}

export const TextBlockEditor = ({
  block,
  onChange,
  onClose
}: TextBlockEditorProps) => {
  return (
    <Card className="h-full w-full flex flex-col border-0 rounded-none shadow-none animate-in slide-in-from-right duration-200">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b space-y-0">
        <CardTitle className="text-lg">Edit Text Block</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <ScrollArea className="flex-1">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title (Optional)</Label>
              <Input
                value={block.content.title || ""}
                onChange={(e) =>
                  onChange({
                    ...block,
                    type: "text",
                    content: { ...block.content, title: e.target.value }
                  })
                }
                placeholder="e.g. About Me"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Content</Label>
                <ToggleGroup
                  type="single"
                  value={block.content.align || "left"}
                  onValueChange={(value) => {
                    if (value) {
                      onChange({
                        ...block,
                        type: "text",
                        content: {
                          ...block.content,
                          align: value as "left" | "center" | "right"
                        }
                      });
                    }
                  }}
                  size="sm"
                >
                  <ToggleGroupItem value="left" aria-label="Align left">
                    <AlignLeft className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="Align center">
                    <AlignCenter className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="Align right">
                    <AlignRight className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <TiptapEditor
                content={block.content.text}
                onChange={(html) =>
                  onChange({
                    ...block,
                    type: "text",
                    content: { ...block.content, text: html }
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </ScrollArea>

      <CardFooter className="p-4 border-t bg-muted/50 text-xs text-muted-foreground">
        Changes are previewed live. Close to revert if not saved.
      </CardFooter>
    </Card>
  );
};
