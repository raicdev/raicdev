"use client";

import { SiRefinedgithub, SiX } from "@icons-pack/react-simple-icons";
import { Edit2Icon, HomeIcon, MailIcon, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const navItems = [
  { title: "Home", href: "/", icon: <HomeIcon className="size-4" /> },
  { title: "Blog", href: "/blog", icon: <Edit2Icon className="size-4" /> },
  { title: "Contact", href: "/contact", icon: <MailIcon className="size-4" /> },
];

const socialItems = [
  {
    title: "GitHub",
    href: "https://github.com/raicdev",
    icon: <SiRefinedgithub className="size-4" />,
  },
  {
    title: "Twitter",
    href: "https://twitter.com/raic_dev",
    icon: <SiX className="size-4" />,
  },
];

export function NavBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  if (!pathname) {
    return null;
  }

  return (
    <nav className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 bg-background/80 backdrop-blur-md border rounded-full px-3 py-2 shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "flex items-center justify-center p-2 rounded-full transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent",
            )}
            title={item.title}
          >
            {item.icon}
          </Link>
        ))}

        <div className="w-px h-6 bg-border mx-1" />

        {socialItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            target="_blank"
            className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent transition-colors"
            title={item.title}
          >
            {item.icon}
          </Link>
        ))}

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <SunIcon className="size-4 dark:hidden" />
          <MoonIcon className="size-4 hidden dark:block" />
          <span className="sr-only">Theme</span>
        </Button>
      </div>
    </nav>
  );
}
