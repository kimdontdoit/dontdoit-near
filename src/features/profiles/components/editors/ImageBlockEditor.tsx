import { useRef, useState } from "react";
import { useNearWallet } from "near-connect-hooks";
import { toast } from "sonner";
import { ImageBlock } from "@/features/profiles/types/profile-content";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { uploadImage, validateImageFile } from "@/lib/upload";

interface ImageBlockEditorProps {
  block: ImageBlock;
  onChange: (updatedBlock: ImageBlock) => void;
  onClose: () => void;
}

export const ImageBlockEditor = ({
  block,
  onChange,
  onClose
}: ImageBlockEditorProps) => {
  const { signedAccountId } = useNearWallet();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !signedAccountId) return;

    const err = validateImageFile(file);
    if (err) {
      toast.error(err);
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage(file, signedAccountId, "block");
      onChange({ ...block, type: "image", content: { ...block.content, url } });
      toast.success("Image uploaded");
    } catch (uploadErr: any) {
      toast.error(uploadErr.message || "Upload failed");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <Card className="h-full w-full flex flex-col border-0 rounded-none shadow-none animate-in slide-in-from-right duration-200">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b space-y-0">
        <CardTitle className="text-lg">Edit Image Block</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2">
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <ScrollArea className="flex-1">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="image-url"
                value={block.content.url}
                onChange={(e) =>
                  onChange({
                    ...block,
                    type: "image",
                    content: { ...block.content, url: e.target.value }
                  })
                }
                placeholder="https://example.com/image.png"
                className="text-xs font-mono"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={isUploading || !signedAccountId}
                onClick={() => fileInputRef.current?.click()}
                title="Upload image"
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
            {isUploading && (
              <p className="text-xs text-muted-foreground">Uploading...</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-alt">Alt Text (Optional)</Label>
            <Input
              id="image-alt"
              value={block.content.alt || ""}
              onChange={(e) =>
                onChange({
                  ...block,
                  type: "image",
                  content: { ...block.content, alt: e.target.value }
                })
              }
              placeholder="Describe the image"
            />
          </div>

          <div className="space-y-2">
            <Label>Fit</Label>
            <Select
              value={block.content.fit ?? "cover"}
              onValueChange={(value) =>
                onChange({
                  ...block,
                  type: "image",
                  content: {
                    ...block.content,
                    fit: value as "cover" | "contain"
                  }
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cover">Fill (Cover)</SelectItem>
                <SelectItem value="contain">Contain</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Alignment</Label>
            <Select
              value={block.content.position ?? "center"}
              onValueChange={(value) =>
                onChange({
                  ...block,
                  type: "image",
                  content: {
                    ...block.content,
                    position: value as
                      | "center"
                      | "top"
                      | "bottom"
                      | "left"
                      | "right"
                      | "top-left"
                      | "top-right"
                      | "bottom-left"
                      | "bottom-right"
                  }
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="top-left">Top Left</SelectItem>
                <SelectItem value="top-right">Top Right</SelectItem>
                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </ScrollArea>

      <CardFooter className="p-4 border-t bg-muted/50 text-xs text-muted-foreground">
        Changes are previewed live. Close to revert if not saved.
      </CardFooter>
    </Card>
  );
};
