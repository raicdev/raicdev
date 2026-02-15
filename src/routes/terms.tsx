import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms of Service | rai.bio" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground text-sm">
          Last updated: February 15, 2026
        </p>
      </header>

      <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">Agreement</h2>
          <p>
            By installing and using browser extensions developed by rai
            (hereinafter referred to as &quot;the Service&quot;), you agree to be
            bound by these Terms of Service. If you do not agree with any part of
            these terms, please uninstall the extension.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">
            Use of Service
          </h2>
          <p>
            The Service is provided for personal and commercial use. You agree to
            use the Service in compliance with all applicable laws and
            regulations.
          </p>
          <p>
            You agree not to misuse the Service, including but not limited to
            attempting to reverse engineer, modify, or distribute the Service
            without authorization.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">
            User Content
          </h2>
          <p>
            You retain ownership of any content you create or interact with
            through the Service. By using the Service, you grant us a limited
            license to process your content as necessary to operate the Service.
          </p>
          <p>
            You are solely responsible for the content you engage with and must
            ensure your usage does not violate any third-party rights or
            applicable laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">
            Intellectual Property
          </h2>
          <p>
            The Service, including its code, design, and functionality, is owned
            by the developer and is protected by applicable copyright and
            intellectual property laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">
            Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate access to the Service at
            any time, with or without cause. You may stop using the Service at
            any time by uninstalling it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">Disclaimer</h2>
          <p>
            The Service is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis without any warranties of any kind, either
            express or implied. We do not warrant that the Service will be
            uninterrupted, error-free, or free of harmful components.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">
            Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, the developer shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of or inability to use the
            Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-foreground">Changes</h2>
          <p>
            We reserve the right to modify or replace these terms at any time.
            Changes will be posted on this page with an updated date. Your
            continued use of the Service after changes constitutes acceptance of
            the new terms.
          </p>
        </section>

        <div className="pt-4 border-t border-border">
          <p>
            See also our{" "}
            <Link
              to="/privacy"
              className="text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
