import { Link, Type, Image as ImageIcon, ScrollText, Briefcase, LucideIcon } from "lucide-react";
import { ProfileBlock } from "@/features/profiles/types/profile-content";
import {
  LinkBlock,
  ImageBlock,
  TextBlock,
  ChangelogBlock,
  CVBlock
} from "@/features/profiles/components/blocks";
import {
  LinkBlockEditor,
  TextBlockEditor,
  ImageBlockEditor,
  ChangelogBlockEditor,
  CVBlockEditor
} from "@/features/profiles/components/editors";

export interface BlockDefinition {
  type: ProfileBlock["type"];
  label: string;
  description: string;
  icon: LucideIcon;
  component: React.ComponentType<any>;
  editor: React.ComponentType<any>;
  defaultContent: any;
  defaultSize: { w: number; h: number };
  colors: {
    bg: string;
    text: string;
    darkBg: string;
    darkText: string;
  };
}

export const BLOCK_REGISTRY: Record<ProfileBlock["type"], BlockDefinition> = {
  link: {
    type: "link",
    label: "Link",
    description: "Link to any website or social media",
    icon: Link,
    component: LinkBlock,
    editor: LinkBlockEditor,
    defaultContent: {
      url: "https://example.com",
      title: "New Link",
      icon: ""
    },
    defaultSize: { w: 1, h: 1 },
    colors: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      darkBg: "dark:bg-blue-900/40",
      darkText: "dark:text-blue-400"
    }
  },
  text: {
    type: "text",
    label: "Text",
    description: "Add a description or note",
    icon: Type,
    component: TextBlock,
    editor: TextBlockEditor,
    defaultContent: {
      title: "New Text Block",
      text: "<p>Start typing...</p>",
      align: "left"
    },
    defaultSize: { w: 2, h: 1 },
    colors: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      darkBg: "dark:bg-orange-900/40",
      darkText: "dark:text-orange-400"
    }
  },
  image: {
    type: "image",
    label: "Image",
    description: "Add a cover image or GIF",
    icon: ImageIcon,
    component: ImageBlock,
    editor: ImageBlockEditor,
    defaultContent: {
      url: "",
      alt: "",
      fit: "cover",
      position: "center"
    },
    defaultSize: { w: 1, h: 1 },
    colors: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      darkBg: "dark:bg-purple-900/40",
      darkText: "dark:text-purple-400"
    }
  },
  changelog: {
    type: "changelog",
    label: "Changelog",
    description: "Display your latest updates",
    icon: ScrollText,
    component: ChangelogBlock,
    editor: ChangelogBlockEditor,
    defaultContent: {
      limit: 5
    },
    defaultSize: { w: 4, h: 2 },
    colors: {
      bg: "bg-green-100",
      text: "text-green-600",
      darkBg: "dark:bg-green-900/40",
      darkText: "dark:text-green-400"
    }
  },
  cv: {
    type: "cv",
    label: "Work Experience",
    description: "Showcase your professional experience",
    icon: Briefcase,
    component: CVBlock,
    editor: CVBlockEditor,
    defaultContent: {
      experiences: []
    },
    defaultSize: { w: 4, h: 1 },
    colors: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      darkBg: "dark:bg-indigo-900/40",
      darkText: "dark:text-indigo-400"
    }
  }
};

export const getBlockDefinition = (type: ProfileBlock["type"]) => {
  return BLOCK_REGISTRY[type];
};

export const getAllBlockDefinitions = () => {
  return Object.values(BLOCK_REGISTRY);
};
