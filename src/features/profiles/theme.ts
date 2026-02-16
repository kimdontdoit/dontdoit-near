import { ProfileTheme } from "./types/profile-content";

export const DEFAULT_THEME = {
  border: "border border-border/50",
  backgroundColor: "bg-card",
  shadow: "shadow-sm",
  borderRadius: "rounded-xl",

  hover: "hover:shadow-lg transition-all duration-300",
  editing: "cursor-grab active:cursor-grabbing",

  glass: {
    backgroundColor: "bg-card/60 backdrop-blur-xl",
    border: "border-white/20"
  },

  ghost: {
    border: "border-2 border-dashed border-muted-foreground/0",
    borderRadius: "rounded-xl",
    backgroundColor: "bg-transparent"
  }
} as const;

export type ResolvedTheme = typeof DEFAULT_THEME & {
  gap?: number;
};

export const resolveTheme = (settings?: ProfileTheme): ResolvedTheme => {
  return DEFAULT_THEME;
};

export const PROFILE_THEME = DEFAULT_THEME;
