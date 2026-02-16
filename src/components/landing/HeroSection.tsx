import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onConnect: () => void;
}

const HeroSection = ({ onConnect }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-container pt-20 pb-16 sm:pt-28 sm:pb-24">
        {/* Eyebrow tag */}
        <div className="inline-flex items-center gap-2 rounded-pill border border-border bg-secondary px-3 py-1 text-caption-sm font-sans font-medium text-muted-foreground mb-8">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
          NEAR Protocol · Hackathon 2025
        </div>

        {/* Headline — uses semantic scale + Mona Sans opentype features via font-headline */}
        <h1 className="text-hero-xl font-headline font-bold text-foreground max-w-3xl mb-6">
          Your on-chain{" "}
          <em className="not-italic text-muted-foreground">profile,</em>
          <br />
          owned by you.
        </h1>

        <p className="text-body-lg font-sans font-light text-muted-foreground max-w-xl mb-10">
          Build your personal page on NEAR. Showcase your work, share your
          links, and own your identity — no middlemen, no lock-in.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            className="rounded-pill px-7 h-12 text-body-base font-medium font-sans"
            onClick={onConnect}
          >
            Connect Wallet
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-pill px-7 h-12 text-body-base font-medium font-sans"
            asChild
          >
            <a href="#how-it-works">See how it works</a>
          </Button>
        </div>

        {/* Mock profile card — NOTE: replace with a real screenshot/mockup image */}
        <div className="mt-16 rounded-card border border-border bg-card overflow-hidden shadow-card">
          <div className="h-2 bg-border/40" />
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar placeholder */}
            <div className="w-20 h-20 rounded-card bg-secondary shrink-0 flex items-center justify-center text-3xl">
              🧑‍💻
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-headline-sm font-headline">alice.near</h3>
                {/* accent-secondary = flashy green — used for NEAR verification */}
                <span className="text-caption-sm font-sans font-semibold px-2.5 py-0.5 rounded-pill bg-accent-secondary text-accent-secondary-foreground">
                  ✓ NEAR Verified
                </span>
              </div>
              <p className="text-body-sm font-sans text-muted-foreground max-w-md">
                Full-stack developer building decentralized apps on NEAR
                Protocol. Open to collabs and hackathons.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["GitHub", "Twitter / X", "Blog", "Portfolio"].map((link) => (
                  <span
                    key={link}
                    className="text-caption-sm font-sans px-3 py-1 rounded-pill border border-border bg-background text-muted-foreground"
                  >
                    {link} ↗
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* NOTE: Static mockup — swap for an actual screenshot or ProfileGrid preview */}
          <div className="border-t border-border bg-secondary/30 px-6 sm:px-8 py-4">
            <p className="text-caption-sm font-sans text-muted-foreground">
              dontdoit.near/u/alice.near
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
