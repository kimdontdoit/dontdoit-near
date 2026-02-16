import { useNearWallet } from "near-connect-hooks";
import { Navigate } from "react-router";
import HeroSection from "@/components/landing/HeroSection";
import FeatureGrid from "@/components/landing/FeatureGrid";
import StatsBanner from "@/components/landing/StatsBanner";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CtaSection from "@/components/landing/CtaSection";

const Home = () => {
  const { signedAccountId, loading, signIn } = useNearWallet();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-7 w-7 border-2 border-border border-t-foreground" />
      </div>
    );
  }

  if (signedAccountId) {
    return <Navigate to="/profile/edit" replace />;
  }

  return (
    <main>
      <HeroSection onConnect={signIn} />
      <FeatureGrid />
      <StatsBanner />
      <HowItWorksSection />
      <CtaSection onConnect={signIn} />
    </main>
  );
};

export default Home;
