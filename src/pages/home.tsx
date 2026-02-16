import { useNearWallet } from "near-connect-hooks";
import { Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import NearLogo from "@/assets/near-logo.svg";

const Home = () => {
  const { signedAccountId, loading, signIn } = useNearWallet();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  if (signedAccountId) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] gap-8 px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <img
          src={NearLogo}
          alt="NEAR Protocol"
          className="w-32 h-auto dark:invert"
        />
        <h1 className="text-3xl font-bold tracking-tight">
          Don't Do It — NEAR
        </h1>
        <p className="text-muted-foreground text-lg">
          Create your on-chain profile page. Connect your NEAR wallet to get started.
        </p>
        <Button
          size="lg"
          className="rounded-full px-8 h-12 text-base font-medium"
          onClick={() => signIn()}
        >
          Connect NEAR Wallet
        </Button>
      </div>
    </main>
  );
};

export default Home;
