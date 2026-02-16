import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { NearProfile } from "@/lib/supabase-types";
import type { ProfileContent } from "@/features/profiles/types/profile-content";

export function useProfile(accountId: string | null | undefined) {
  const [profile, setProfile] = useState<NearProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrCreate = useCallback(async () => {
    if (!accountId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("near_profiles")
        .select("*")
        .eq("account_id", accountId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        setProfile(data as NearProfile);
      } else {
        // Auto-create profile
        const newProfile = {
          account_id: accountId,
          display_name: accountId,
          avatar_url: null,
          bio: null,
          profile_content: { blocks: [] },
          visibility: "public",
        };

        const { data: created, error: createError } = await supabase
          .from("near_profiles")
          .insert(newProfile)
          .select()
          .single();

        if (createError) throw createError;
        setProfile(created as NearProfile);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchOrCreate();
  }, [fetchOrCreate]);

  const updateProfile = useCallback(
    async (updates: Partial<Pick<NearProfile, "display_name" | "avatar_url" | "bio" | "profile_content" | "visibility">>) => {
      if (!accountId) return;

      const { data, error: updateError } = await supabase
        .from("near_profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("account_id", accountId)
        .select()
        .single();

      if (updateError) throw updateError;
      setProfile(data as NearProfile);
      return data as NearProfile;
    },
    [accountId]
  );

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchOrCreate,
    profileContent: (profile?.profile_content as ProfileContent | null) ?? { blocks: [] },
  };
}
