import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy | rai.bio" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">
          Last updated: February 15, 2026
        </p>
      </header>

      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">Overview</h2>
          <p>
            Your privacy is important to us. This Privacy Policy explains how
            information is collected, used, and protected when you use browser
            extensions developed by rai (hereinafter referred to as &quot;the
            Service&quot;).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">
            Information Collected
          </h2>
          <p>
            The Service may collect information necessary to provide its
            functionality. This may include data you interact with through the
            extension and basic usage information.
          </p>
          <p>
            We do not collect personally identifiable information unless
            explicitly provided by you through the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">
            Data Storage
          </h2>
          <p>
            Data processed by the Service is stored locally in your browser
            wherever possible. Any data transmitted to external servers is done
            securely and only as necessary to provide the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">
            Third-Party Services
          </h2>
          <p>
            The Service may interact with third-party services to provide its
            functionality. These services have their own privacy policies, and we
            encourage you to review them. We are not responsible for the privacy
            practices of third-party services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">
            Data Security
          </h2>
          <p>
            We take reasonable measures to protect any information processed by
            the Service. However, no method of transmission over the internet is
            100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">
            Data Retention
          </h2>
          <p>
            Locally stored data persists until you clear it or uninstall the
            extension. You can remove your data at any time through your browser
            settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">Changes</h2>
          <p>
            This Privacy Policy may be updated from time to time. Any changes
            will be posted on this page with an updated date. Your continued use
            of the Service after changes constitutes acceptance of the updated
            policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, you can reach us
            through the{" "}
            <Link
              to="/contact"
              className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              contact page
            </Link>
            .
          </p>
        </section>

        <div className="pt-4 border-t border-border">
          <p>
            See also our{" "}
            <Link
              to="/terms"
              className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
