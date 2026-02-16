import { useParams } from "react-router";
import { useProfile } from "@/hooks/useProfile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileGridView from "@/features/profiles/components/ProfileGridView";

const PublicProfile = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const { profile, loading, profileContent } = useProfile(accountId);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
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

  const initials = (profile.display_name || profile.account_id || "?")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="w-16 h-16">
          {profile.avatar_url && (
            <AvatarImage src={profile.avatar_url} alt={profile.display_name || ""} />
          )}
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">
            {profile.display_name || profile.account_id}
          </h1>
          <p className="text-sm text-muted-foreground">{profile.account_id}</p>
          {profile.bio && (
            <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>
          )}
        </div>
      </div>

      {profileContent.blocks.length > 0 ? (
        <ProfileGridView content={profileContent} />
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p>This profile doesn't have any content yet.</p>
        </div>
      )}
    </div>
  );
};

export default PublicProfile;
