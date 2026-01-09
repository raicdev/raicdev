export type Project = {
  name: string;
  description: string;
  href?: string;
};

export const projects: Project[] = [
  {
    name: "Deni AI",
    description: "An AI chat app created for everyone, free.",
    href: "https://deniai.app",
  },
  {
    name: "Prodfind",
    description: "A tool that allows you to find, publish products (discontinued)",
    href: "https://prodfind.space",
  },
  {
    name: "VistaUpdater",
    description: "Make Windows Vista to updateable. 50K+ users",
    href: "https://vistaupdater.net",
  },
  {
    name: "Coming Soon",
    description: "Stay tuned for something new",
  },
];
