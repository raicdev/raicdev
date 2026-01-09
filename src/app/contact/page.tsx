import { SiDiscord, SiRefinedgithub, SiX } from "@icons-pack/react-simple-icons";
import { ArrowUpRight, Mail, Triangle } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    name: "Email",
    description: "The best way to reach me for collaborations and projects",
    value: "rai@rai.bio",
    href: "mailto:rai@rai.bio",
    icon: Mail,
  },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/raicdev",
    icon: SiRefinedgithub,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/raic_dev",
    icon: SiX,
  },
  {
    name: "Discord",
    value: "@raic_dev",
    icon: SiDiscord,
  },
];

export default function Contact() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <header className="space-y-4 animate-in fade-in duration-700">
        <h1 className="text-5xl font-bold bg-linear-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
          Contact
        </h1>
        <p className="text-muted-foreground text-base animate-in fade-in slide-in-from-left-3 duration-700 delay-100">
          Let&apos;s work together
        </p>
      </header>

      {/* Contact Methods */}
      <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div>
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2 mb-4">
            <Mail className="w-4 h-4" />
            <span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Email
            </span>
          </h2>
          {contactMethods.map((method, index) => (
            <Link
              key={method.name}
              href={method.href}
              className="group block space-y-1 p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-all duration-300 border border-transparent hover:border-border hover:shadow-sm animate-in fade-in slide-in-from-left-2"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-base font-medium text-foreground group-hover:text-foreground/90 transition-colors">
                    {method.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </div>
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-sm font-medium text-foreground flex items-center gap-2 mb-4">
            <span className="text-muted-foreground inline-block hover:rotate-180 transition-transform duration-500">
              <Triangle className="w-4 h-4" />
            </span>
            <span className="bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Social
            </span>
          </h2>
          <div className="space-y-2">
            {socialLinks.map((link, index) => (
              <div key={link.name}>
                {link.href ? (
                  <Link
                    href={link.href}
                    target="_blank"
                    className="group flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-muted/50 transition-all duration-300 border border-transparent hover:border-border hover:shadow-sm animate-in fade-in slide-in-from-left-2"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-base font-medium text-foreground group-hover:text-foreground/90 transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                ) : (
                  <div
                    className="flex items-center gap-3 p-3 -mx-3 rounded-lg animate-in fade-in slide-in-from-left-2"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <link.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-base font-medium text-foreground">
                      {link.name}: {link.value}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
