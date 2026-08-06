import Link from "next/link";
import { footer } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="container-px flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-mist">{footer.copyright}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footer.links.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} href={l.href} className="font-mono text-xs text-mist hover:text-lime transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-mist hover:text-lime transition-colors">
                {l.label}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
