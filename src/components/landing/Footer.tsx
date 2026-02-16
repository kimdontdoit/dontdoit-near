import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-container py-layout-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-headline-sm font-headline">dontdoit.near</span>
          <span className="text-caption-sm font-sans text-muted-foreground border border-border rounded-pill px-2 py-0.5">
            v0.1
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "GitHub", href: "https://github.com" },
            { label: "NEAR Protocol", href: "https://near.org" },
            { label: "Hackathon", href: "#" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-body-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Legal */}
        <p className="text-caption-sm font-sans text-muted-foreground">
          © 2025 dontdoit.near · Built with ❤️ on NEAR
        </p>
      </div>
    </footer>
  );
};

export default Footer;
