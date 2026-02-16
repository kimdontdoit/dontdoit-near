import { useState, useCallback, useRef } from "react";
import { useNearWallet } from "near-connect-hooks";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileGrid from "@/features/profiles/components/ProfileGrid";
import { BlockEditPanel } from "@/features/profiles/components/BlockEditPanel";
import { ProfileFloatingNav } from "@/features/profiles/components/ProfileFloatingNav";
import {
  ProfileContent,
  ProfileBlock,
  BlockType,
  calculateCVBlockHeight,
} from "@/features/profiles/types/profile-content";
import { BLOCK_REGISTRY } from "@/features/profiles/blocks/registry";
import { cn } from "@/lib/cn";

const ProfileEdit = () => {
  const { signedAccountId } = useNearWallet();
  const { profile, loading, profileContent, updateProfile } = useProfile(signedAccountId);

  const [displayName, setDisplayName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [stagedContent, setStagedContent] = useState<ProfileContent | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isNewBlock, setIsNewBlock] = useState(false);
  const blockIdCounter = useRef(0);

  const currentContent = stagedContent || profileContent;
  const currentDisplayName = displayName ?? profile?.display_name ?? "";
  const currentAvatarUrl = avatarUrl ?? profile?.avatar_url ?? "";
  const currentBio = bio ?? profile?.bio ?? "";

  const isDirty =
    stagedContent !== null ||
    displayName !== null ||
    avatarUrl !== null ||
    bio !== null;

  const editingBlock = editingBlockId
    ? currentContent.blocks.find((b) => b.i === editingBlockId) || null
    : null;

  const handleLayoutChange = useCallback(
    (layout: any[]) => {
      const updatedBlocks = currentContent.blocks.map((block) => {
        const layoutItem = layout.find((l: any) => l.i === block.i);
        if (layoutItem) {
          return {
            ...block,
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
        }
        return block;
      });

      setStagedContent({ ...currentContent, blocks: updatedBlocks });
    },
    [currentContent]
  );

  const handleAddBlock = useCallback(
    (type: BlockType, x?: number, y?: number) => {
      const definition = BLOCK_REGISTRY[type];
      if (!definition) return;

      blockIdCounter.current += 1;
      const newId = `block-${Date.now()}-${blockIdCounter.current}`;

      const maxY = currentContent.blocks.length > 0
        ? Math.max(...currentContent.blocks.map((b) => b.y + b.h))
        : 0;

      let h = definition.defaultSize.h;
      if (type === "cv") {
        h = calculateCVBlockHeight(definition.defaultContent.experiences || []);
      }

      const newBlock: ProfileBlock = {
        i: newId,
        type,
        x: x ?? 0,
        y: y ?? maxY,
        w: definition.defaultSize.w,
        h,
        content: { ...definition.defaultContent },
      } as ProfileBlock;

      const updatedContent = {
        ...currentContent,
        blocks: [...currentContent.blocks, newBlock],
      };

      setStagedContent(updatedContent);
      setEditingBlockId(newId);
      setIsNewBlock(true);
    },
    [currentContent]
  );

  const handleRemoveBlock = useCallback(
    (blockId: string) => {
      const updatedBlocks = currentContent.blocks.filter((b) => b.i !== blockId);
      setStagedContent({ ...currentContent, blocks: updatedBlocks });
      if (editingBlockId === blockId) {
        setEditingBlockId(null);
      }
    },
    [currentContent, editingBlockId]
  );

  const handleEditBlock = useCallback((blockId: string) => {
    setEditingBlockId(blockId);
    setIsNewBlock(false);
  }, []);

  const handleBlockChange = useCallback(
    (updatedBlock: ProfileBlock) => {
      let block = updatedBlock;
      // Recalculate CV block height
      if (block.type === "cv") {
        const newH = calculateCVBlockHeight(block.content.experiences);
        block = { ...block, h: newH };
      }

      const updatedBlocks = currentContent.blocks.map((b) =>
        b.i === block.i ? block : b
      );
      setStagedContent({ ...currentContent, blocks: updatedBlocks });
    },
    [currentContent]
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        display_name: currentDisplayName,
        avatar_url: currentAvatarUrl || null,
        bio: currentBio || null,
        profile_content: currentContent as any,
      });
      // Reset staged state
      setStagedContent(null);
      setDisplayName(null);
      setAvatarUrl(null);
      setBio(null);
      toast.success("Profile saved!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Profile not found.</p>
      </div>
    );
  }

  const initials = (currentDisplayName || profile.account_id || "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Main Content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          editingBlock ? "mr-[350px]" : ""
        )}
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Profile Header (editable) */}
          <div className="flex items-start gap-4 mb-8">
            <Avatar className="w-16 h-16">
              {currentAvatarUrl && (
                <AvatarImage src={currentAvatarUrl} alt={currentDisplayName} />
              )}
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <div>
                <Label htmlFor="displayName" className="text-xs text-muted-foreground">
                  Display Name
                </Label>
                <Input
                  id="displayName"
                  value={currentDisplayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className="max-w-sm"
                />
              </div>
              <div>
                <Label htmlFor="avatarUrl" className="text-xs text-muted-foreground">
                  Avatar URL
                </Label>
                <Input
                  id="avatarUrl"
                  value={currentAvatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="max-w-sm"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="text-xs text-muted-foreground">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={currentBio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell the world about yourself..."
                  className="max-w-sm resize-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Grid Editor */}
          <ProfileGrid
            content={currentContent}
            isEditing={true}
            onLayoutChange={handleLayoutChange}
            onAddBlock={handleAddBlock}
            onRemoveBlock={handleRemoveBlock}
            onEditBlock={handleEditBlock}
          />
        </div>
      </div>

      {/* Edit Panel (slides in from right) */}
      {editingBlock && (
        <div className="fixed right-0 top-0 bottom-0 w-[350px] border-l border-border bg-background overflow-y-auto z-40">
          <BlockEditPanel
            block={editingBlock}
            onChange={handleBlockChange}
            onClose={() => {
              setEditingBlockId(null);
              setIsNewBlock(false);
            }}
            isNewBlock={isNewBlock}
          />
        </div>
      )}

      {/* Floating Nav */}
      <ProfileFloatingNav
        canEdit={true}
        isEditing={true}
        isSaving={isSaving}
        isDirty={isDirty}
        activeBlock={!!editingBlock}
        onSave={handleSave}
        onAddBlock={handleAddBlock}
      />
    </div>
  );
};

export default ProfileEdit;
