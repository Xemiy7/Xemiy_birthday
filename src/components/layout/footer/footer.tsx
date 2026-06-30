import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site";
import { footerNavigation } from "@/constants/navigation";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Dribbble", href: "https://dribbble.com" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-mono-1000">
      <div className="grid-container section-y !py-16 stack-xl">
        <div className="grid-12 gap-12">
          <div className="col-span-12 md:col-span-4 stack-md">
            <Logo />
            <p className="text-body-sm max-w-xs text-muted-foreground">
              Premium graphics design studio specializing in monochrome brand
              systems and editorial excellence.
            </p>
          </div>

          <div className="col-span-6 md:col-span-2 stack-sm">
            <p className="text-overline">Navigate</p>
            <ul className="stack-xs">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-muted-foreground transition-colors-premium hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#services"
                  className="text-body-sm text-muted-foreground transition-colors-premium hover:text-foreground"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#process"
                  className="text-body-sm text-muted-foreground transition-colors-premium hover:text-foreground"
                >
                  Process
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2 stack-sm">
            <p className="text-overline">Social</p>
            <ul className="stack-xs">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-muted-foreground transition-colors-premium hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4 stack-sm md:text-right">
            <p className="text-overline">Contact</p>
            <a
              href="/book"
              className="text-body-lg hover-underline"
            >
              Book a Project
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-8 md:flex-row md:items-center">
          <p className="text-caption">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-caption">Crafted in monochrome.</p>
        </div>
      </div>
    </footer>
  );
}
