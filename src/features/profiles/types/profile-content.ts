import { z } from "zod";

export type BlockType = "link" | "text" | "image" | "changelog" | "cv";
export type ImageFit = "cover" | "contain";
export type ImagePosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface BaseBlock {
  i: string;
  type: BlockType;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface LinkBlock extends BaseBlock {
  type: "link";
  content: {
    url: string;
    title: string;
    icon?: string;
  };
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  content: {
    url: string;
    alt?: string;
    fit?: ImageFit;
    position?: ImagePosition;
  };
}

export interface TextBlock extends BaseBlock {
  type: "text";
  content: {
    title?: string;
    text: string;
    align?: "left" | "center" | "right";
  };
}

export interface ChangelogBlock extends BaseBlock {
  type: "changelog";
  content: {
    limit?: number;
  };
}

export interface WorkExperience {
  id: string;
  startDate: string;
  endDate: string | null;
  title: string;
  company: string;
  location: string;
}

export interface CVBlock extends BaseBlock {
  type: "cv";
  content: {
    experiences: WorkExperience[];
  };
}

export type ProfileBlock = LinkBlock | ImageBlock | TextBlock | ChangelogBlock | CVBlock;

export const BLOCK_CONSTRAINTS: Record<
  string,
  { minW: number; maxW: number; minH: number; maxH: number; isResizable?: boolean }
> = {
  link: { minW: 1, maxW: 2, minH: 1, maxH: 4 },
  text: { minW: 1, maxW: 4, minH: 1, maxH: 6 },
  image: { minW: 1, maxW: 4, minH: 1, maxH: 2 },
  changelog: { minW: 4, maxW: 4, minH: 2, maxH: 4 },
  cv: { minW: 4, maxW: 4, minH: 1, maxH: 999, isResizable: false }
};

export interface ProfileTheme {
  backgroundColor?: string;
  backgroundImage?: string;
  gap?: number;
  borderRadius?: string;
  blockBorder?: string;
}

export interface ProfileContent {
  blocks: ProfileBlock[];
  theme?: ProfileTheme;
}

const monthYearRegex = /^\d{4}(-((0[1-9])|(1[0-2])))?$/;

export const monthYearSchema = z
  .string()
  .regex(monthYearRegex, "Expected YYYY or YYYY-MM");

export const workExperienceSchema = z
  .object({
    id: z.string().min(1),
    startDate: monthYearSchema,
    endDate: monthYearSchema.nullable(),
    title: z.string(),
    company: z.string(),
    location: z.string()
  })
  .refine(
    (value) => !value.endDate || value.endDate >= value.startDate,
    { message: "End date must be after start date", path: ["endDate"] }
  );

export const cvBlockSchema = z.object({
  type: z.literal("cv"),
  content: z.object({
    experiences: z.array(workExperienceSchema)
  })
});

export const calculateCVBlockHeight = (experiences: WorkExperience[]): number => {
  if (experiences.length === 0) {
    return 1;
  }

  const baseHeight = 0.2;
  const experienceHeight = experiences.length * 0.6;

  return Math.max(1, Math.ceil(baseHeight + experienceHeight));
};
