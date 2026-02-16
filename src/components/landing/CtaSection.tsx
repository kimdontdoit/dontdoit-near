import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  onConnect: () => void;
}

const CtaSection = ({ onConnect }: CtaSectionProps) => {
  return (
    <section className="border-t border-border bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-container py-section flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div className="space-y-3 max-w-lg">
          <h2 className="text-display-md font-headline leading-tight">
            Claim your .near profile today.
          </h2>
          <p className="text-body-base font-sans text-background/60 font-light">
            Free to use. No gas fees for profile creation during the hackathon
            period.
          </p>
        </div>
        <Button
          size="lg"
          variant="secondary"
          className="rounded-pill px-8 h-12 text-body-base font-medium font-sans shrink-0"
          onClick={onConnect}
        >
          Get started →
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
