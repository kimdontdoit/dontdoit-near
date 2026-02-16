import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_THEME } from "@/features/profiles/theme";
import { Button } from "@/components/ui/button";
import { AddBlockPopover } from "./AddBlockPopover";
import { Plus, Check, Loader2, Pencil } from "lucide-react";
import { cn } from "@/lib/cn";

interface ProfileFloatingNavProps {
  isEditing?: boolean;
  isSaving?: boolean;
  isDirty?: boolean;
  canEdit?: boolean;
  activeBlock?: boolean;
  onEdit?: () => void;
  editUrl?: string;
  onCancel?: () => void;
  onSave?: () => void;
  onAddBlock?: (
    type: "link" | "text" | "image",
    x?: number,
    y?: number
  ) => void;
  className?: string;
}

export function ProfileFloatingNav({
  isEditing = false,
  isSaving = false,
  isDirty = false,
  canEdit = false,
  activeBlock = false,
  onEdit,
  editUrl,
  onCancel,
  onSave,
  onAddBlock,
  className
}: ProfileFloatingNavProps) {
  return (
    <motion.div
      layout
      className={cn(
        "fixed bottom-6 z-50 flex items-center gap-2 p-2 rounded-full shadow-xl supports-[backdrop-filter]:bg-card/60",
        DEFAULT_THEME.glass.backgroundColor,
        DEFAULT_THEME.glass.border,
        className
      )}
      style={{
        right: activeBlock ? "374px" : "24px",
        left: "auto",
        transform: "none"
      }}
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.4
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {canEdit && (
          <motion.div
            layout
            key={isEditing ? "editing" : "viewing"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                {onAddBlock && (
                  <>
                    <AddBlockPopover
                      onAddBlock={onAddBlock}
                      trigger={
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-full px-4 h-10 gap-2 hover:bg-muted/50"
                        >
                          <Plus className="w-4 h-4" />
                          Add Block
                        </Button>
                      }
                    />
                    <div className="w-px h-6 bg-border/50 mx-1" />
                  </>
                )}

                <Button
                  size="sm"
                  className={cn(
                    "rounded-full px-6 h-10 transition-all duration-300 font-medium",
                    isDirty
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-md shadow-accent/20"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted/50 cursor-not-allowed opacity-50"
                  )}
                  onClick={onSave}
                  disabled={isSaving || !isDirty}
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  Publish
                </Button>
              </>
            ) : (
              <>
                {editUrl ? (
                  <Button
                    size="lg"
                    variant="ghost"
                    className="rounded-full w-10 h-10 p-0 hover:scale-105 transition-transform ml-2"
                    asChild
                  >
                    <a href={editUrl}>
                      <Pencil className="w-5 h-5" />
                      <span className="sr-only">Edit Profile</span>
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="ghost"
                    className="rounded-full w-10 h-10 p-0 hover:scale-105 transition-transform ml-2"
                    onClick={onEdit}
                  >
                    <Pencil className="w-5 h-5" />
                    <span className="sr-only">Edit Profile</span>
                  </Button>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
