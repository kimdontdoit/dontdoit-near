export interface NearProfile {
  account_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  profile_content: { blocks: unknown[] } | null;
  visibility: string;
  created_at: string;
  updated_at: string;
}
