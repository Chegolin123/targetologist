import { footer, profile } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-black/5 py-10 sm:py-12">
      <div className="container-px flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-charcoal-500">
        <p>{footer.copyright}</p>
        <div className="flex items-center gap-6">
          {footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-amber transition-colors"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
