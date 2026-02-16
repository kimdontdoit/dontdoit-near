import { Link } from "react-router";
import NearLogo from "@/assets/near-logo.svg";
import { useNearWallet } from "near-connect-hooks";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const { signedAccountId, loading, signIn, signOut } = useNearWallet();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={NearLogo}
            alt="NEAR"
            className="w-6 h-6 dark:invert"
          />
          <span className="font-semibold text-sm hidden sm:inline">
            dontdoit.near
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {signedAccountId && (
            <Link
              to="/profile"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {signedAccountId}
            </Link>
          )}
          <Button
            variant={signedAccountId ? "ghost" : "default"}
            size="sm"
            onClick={() => (signedAccountId ? signOut() : signIn())}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : signedAccountId
                ? "Sign Out"
                : "Sign In"}
          </Button>
        </div>
      </div>
    </nav>
  );
};
