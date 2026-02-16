interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Connect your NEAR wallet",
    description:
      "Sign in with any NEAR wallet — MyNEAR Wallet, Meteor, or any other. No email or password needed. Your .near address is your login.",
  },
  {
    number: "02",
    title: "Build your profile",
    description:
      "Add blocks to your page: links, text, your work history, a changelog, images. Drag them around, resize them, make it yours.",
  },
  {
    number: "03",
    title: "Share your link",
    description:
      "Your profile is live at dontdoit.near/u/yourname.near the moment you save. Share it, embed it, link to it from anywhere.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-container py-section">
      <div className="mb-12">
        <p className="text-caption-sm font-sans font-medium uppercase tracking-widest text-muted-foreground mb-3">
          Getting started
        </p>
        <h2 className="text-display-md font-headline text-foreground max-w-lg">
          From idea to profile in{" "}
          <em className="not-italic text-muted-foreground">minutes.</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="relative flex flex-col gap-4 p-6 sm:p-8 rounded-card border border-border bg-card"
          >
            {/* Connector line between steps */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-border z-10" />
            )}
            <span className="text-caption-xs font-sans font-medium text-muted-foreground/50 tracking-widest uppercase">
              {step.number}
            </span>
            <h3 className="text-headline-sm font-headline text-foreground">
              {step.title}
            </h3>
            <p className="text-body-sm font-sans text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
