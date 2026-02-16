import { Link } from "react-router";
import { useNearWallet } from "near-connect-hooks";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const Navigation = () => {
  const { signedAccountId, loading, signIn, signOut } = useNearWallet();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-container">
        {/* Brand */}
        <Link
          to="/"
          className="text-headline-sm font-headline hover:opacity-70 transition-opacity"
        >
          dontdoit.near
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {signedAccountId && (
            <>
              <Link
                to="/profile/edit"
                className="hidden sm:inline text-body-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
              >
                {signedAccountId}
              </Link>
              <a
                href={`https://dontdoit.club/iki/${signedAccountId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-body-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View published
              </a>
            </>
          )}
          <Button
            variant={signedAccountId ? "outline" : "default"}
            size="sm"
            className="rounded-pill px-4 text-body-sm font-sans"
            onClick={() => (signedAccountId ? signOut() : signIn())}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : signedAccountId
                ? "Sign out"
                : "Connect wallet"}
          </Button>
        </div>
      </div>
    </nav>
  );
};
