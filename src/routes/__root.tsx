import { HeadContent, Link, Scripts, createRootRoute } from "@tanstack/react-router";
import PageTransition from "@/components/page-transition";
import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/navbar";

import appCss from "../styles.css?url";
import katexCss from "katex/dist/katex.min.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "rai.bio" },
      { name: "description", content: "" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: katexCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="theme"
          enableSystem
          disableTransitionOnChange
        >
          <main className="p-4 py-12 md:py-20 lg:py-25 mx-auto max-w-xl min-h-screen h-full">
            <PageTransition>{children}</PageTransition>
          </main>
          <NavBar />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="space-y-4 py-12">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
