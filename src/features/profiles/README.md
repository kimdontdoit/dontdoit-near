# IKI: The Purposeful Link Page

> **Mission**: Accessibility, Low Cost, Minimalism, and Joyful UI.

IKI is a next-generation profile page system designed to be a "Bento-style" competitor to Linktree and Read.cv. It empowers users to create dynamic, block-based profiles that are both beautiful and highly performant.

## 🌟 Core Philosophy

- **Minimalism**: A clean, distraction-free interface that puts content first.
- **Joyful UI**: Fluid interactions, smooth animations, and a polished editing experience.
- **Accessibility**: Built with semantic HTML (standard components) and keyboard navigation in mind.
- **Low Cost & Scalable**: leveraging a highly efficient data model to keep infrastructure costs low while allowing infinite scalability.

## 🚀 Features

### 1. Dynamic Grid Layout

- **4-Column System**: A flexible grid (powered by `react-grid-layout`) that adapts to all screen sizes.
- **Bento-Style Blocks**: Content is organized into resizeable blocks (1x1, 2x1, 2x2, etc.) for a rich visual hierarchy.
- **Drag & Drop**: Intuitive "Editor Mode" allowing users to rearrange their digital identity with a simple floating interface.

### 2. Block Logic

The system is built to be extensible. Currently supported blocks:

- **Link Block**: A joyful, clickable card for external links with metadata.
- _(Coming Soon)_: Text, Image, Map, and Social Feed blocks.

### 3. Smart Persistence

- **JSONB Storage**: The entire profile layout and content are stored in a single `jsonb` column (`profile_content`) in Supabase.
- **Performance**: Zero-latency fetching—one query retrieves the user's entire profile configuration. No N+1 query problems.

## 🛠️ Architecture

### Data Model

Stored in `public.profiles`:

```sql
profile_content JSONB DEFAULT '{"blocks": []}'::jsonb
```

**Type Definition**:

```typescript
interface ProfileContent {
  blocks: Block[]; // Array of positioned items
  theme?: ProfileTheme; // Optional theme settings
}

interface ProfileTheme {
  backgroundColor?: string;
  backgroundImage?: string;
  gap?: number;
  borderRadius?: string;
  blockBorder?: string;
}

interface BaseBlock {
  i: string; // Unique identifier
  type: "link" | "text" | "image";
  x: number; // Grid X (0-3)
  y: number; // Grid Y (Infinity)
  w: number; // Width (1-4)
  h: number; // Height (1-Infinity)
}
```

### Component Structure

- **`UserProfile.tsx`**: The container page. Handles data fetching and "Edit Mode" state.
- **`ProfileGrid.tsx`**: The layout engine. Manages the drag-and-drop grid logic and renders specific blocks based on type.
- **`blocks/LinkBlock.tsx`**: Atomic block component.

## 🎨 Edit Mode Flow

1.  **Toggle**: Floating "Pencil" FAB (Floating Action Button) enables edit mode.
2.  **Interact**: Grid enables drag-and-resize capabilities; Links disable navigation (prevent clicks) to allow safe moving.
3.  **Save**: "Publish" button writes the new layout state to Supabase via RLS-protected update.
