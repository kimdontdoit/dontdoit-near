interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "1B+", label: "NEAR accounts registered" },
  { value: "10M+", label: "Transactions per day" },
  { value: "< 1¢", label: "Average transaction fee" },
  { value: "2s", label: "Time to finality" },
];

const StatsBanner = () => {
  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="max-w-6xl mx-auto px-container py-layout-2xl sm:py-layout-xl">
        <p className="text-center text-caption-sm font-sans font-medium text-muted-foreground mb-8 uppercase tracking-widest">
          Built on NEAR Protocol
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-display-sm font-headline text-foreground mb-1">
                {value}
              </p>
              <p className="text-body-sm font-sans text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
