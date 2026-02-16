import { cn } from "@/lib/cn";

interface FeatureCardProps {
  title: string;
  description: string;
  tag?: string;
  className?: string;
  children?: React.ReactNode;
}

const FeatureCard = ({
  title,
  description,
  tag,
  className,
  children,
}: FeatureCardProps) => (
  <div
    className={cn(
      "group relative rounded-card border border-border bg-card p-6 sm:p-8 overflow-hidden flex flex-col gap-4 hover:border-foreground/20 transition-colors duration-200",
      className
    )}
  >
    {tag && (
      <span className="inline-flex self-start items-center gap-1.5 text-caption-sm font-sans font-medium px-2.5 py-1 rounded-pill border border-border bg-background text-muted-foreground">
        {tag} ↗
      </span>
    )}
    <div className="flex-1 space-y-2">
      <h3 className="text-headline-sm font-headline text-foreground">
        {title}
      </h3>
      <p className="text-body-sm font-sans text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
    {children}
  </div>
);

const FeatureGrid = () => {
  return (
    <section className="max-w-6xl mx-auto px-container py-section">
      <div className="mb-12">
        <p className="text-caption-sm font-sans font-medium uppercase tracking-widest text-muted-foreground mb-3">
          What you get
        </p>
        <h2 className="text-display-md font-headline text-foreground max-w-xl">
          Build{" "}
          <em className="not-italic text-muted-foreground">together,</em> own
          it forever.
        </h2>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Large card — spans 2 cols on lg */}
        <FeatureCard
          className="lg:col-span-2"
          tag="Profiles"
          title="Your page, your rules"
          description="Create a customizable profile page with drag-and-drop blocks. Add links, text, a changelog, your CV — whatever represents you best. It lives at your own .near address."
        >
          {/* NOTE: Add a mini profile grid preview image here for visual impact */}
          <div className="mt-2 grid grid-cols-3 gap-2 opacity-60">
            {["Link", "Text", "CV", "Image", "Log", "Bio"].map((b) => (
              <div
                key={b}
                className="h-10 rounded-input border border-border bg-background flex items-center justify-center text-caption-sm font-sans text-muted-foreground"
              >
                {b}
              </div>
            ))}
          </div>
        </FeatureCard>

        <FeatureCard
          tag="NEAR Wallet"
          title="One wallet. Your identity."
          description="Sign in once with your NEAR wallet. No passwords, no email, no data harvesting. Your account IS your identity."
        >
          <div className="mt-auto pt-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-body-sm">
              ◎
            </div>
            <span className="text-body-sm font-sans text-muted-foreground">
              alice.near
            </span>
            {/* accent-secondary badge for NEAR verification state */}
            <span className="ml-auto text-caption-sm font-sans font-semibold px-2 py-0.5 rounded-pill bg-accent-secondary text-accent-secondary-foreground">
              Connected
            </span>
          </div>
        </FeatureCard>

        <FeatureCard
          tag="Open Source"
          title="Transparent by design"
          description="Built in public. All profile data is stored on NEAR, readable by anyone, owned by you. Fork it, extend it, build on top of it."
        />

        <FeatureCard
          tag="Shareable"
          title="Share your profile instantly"
          description="Every profile gets a clean shareable URL. Send it to recruiters, collaborators, or post it on social — it's always up to date."
        >
          <div className="mt-auto pt-4">
            <div className="rounded-input border border-border bg-background px-3 py-2 text-caption-sm font-sans text-muted-foreground flex items-center gap-2">
              <span className="text-foreground/40">🔗</span>
              dontdoit.near/u/
              <span className="text-foreground font-medium">yourname.near</span>
            </div>
          </div>
        </FeatureCard>

        <FeatureCard
          tag="Hackathon"
          title="Built at NEAR Horizon 2025"
          description="A weekend project that became a product. We're just getting started — this is v0.1."
        />
      </div>
    </section>
  );
};

export default FeatureGrid;
