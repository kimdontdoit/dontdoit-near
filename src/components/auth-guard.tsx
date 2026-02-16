import { useNearWallet } from "near-connect-hooks";
import { Navigate } from "react-router";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { signedAccountId, loading } = useNearWallet();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  if (!signedAccountId) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
