import Link from "next/link";
import { footer, profile } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-black/5 py-10 sm:py-12">
      <div className="container-px flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-charcoal-500">
        <p>{footer.copyright}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footer.links.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-amber transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber transition-colors"
              >
                {link.label}
              </a>
            )
          )}
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
