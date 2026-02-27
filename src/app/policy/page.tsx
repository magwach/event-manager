function PolicyPage() {
  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e8e6e1]">
      {/* Header */}
      <div className="border-b border-[#2a2a35]">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-amber-500 uppercase tracking-widest">
              Legal
            </span>
          </div>
          <h1 className="font-syne text-4xl font-bold text-[#e8e6e1] mb-3">
            Privacy Policy
          </h1>
          <p className="text-[#7c7a76] text-sm">
            Last updated:{" "}
            <span className="text-amber-400/80">January 1, 2025</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-10">

        {/* Intro */}
        <p className="text-[#7c7a76] leading-relaxed border-l-2 border-amber-500/40 pl-4">
          EventManager ("we", "our", or "us") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, and
          safeguard your information when you use our platform at{" "}
          <span className="text-amber-400/80">eventmanager.space</span>.
        </p>

        <Section title="1. Information We Collect">
          <p>We collect the following types of information:</p>
          <ul className="mt-3 space-y-2 text-[#7c7a76]">
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                <strong className="text-[#e8e6e1]">Account Information</strong>{" "}
                — name, email address, and profile picture provided when you
                sign in via Google or email.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                <strong className="text-[#e8e6e1]">Usage Data</strong> — pages
                visited, events viewed, and actions taken on the platform.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                <strong className="text-[#e8e6e1]">Event Registrations</strong>{" "}
                — events you register for and associated details.
              </span>
            </li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use your information to:</p>
          <ul className="mt-3 space-y-2 text-[#7c7a76]">
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Provide and improve our event management services</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Send event confirmations and notifications</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Authenticate your identity and secure your account</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Respond to support requests and inquiries</span>
            </li>
          </ul>
        </Section>

        <Section title="3. Data Sharing">
          <p>
            We do <strong className="text-[#e8e6e1]">not</strong> sell, trade,
            or rent your personal information to third parties. We may share
            data with:
          </p>
          <ul className="mt-3 space-y-2 text-[#7c7a76]">
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                <strong className="text-[#e8e6e1]">Clerk</strong> — for
                authentication and user management
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                <strong className="text-[#e8e6e1]">Vercel</strong> — for
                hosting and infrastructure
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                <strong className="text-[#e8e6e1]">Neon</strong> — for secure
                database storage
              </span>
            </li>
          </ul>
        </Section>

        <Section title="4. Data Security">
          <p>
            We implement industry-standard security measures to protect your
            data, including encrypted connections (HTTPS), secure authentication
            via Clerk, and restricted database access. However, no method of
            transmission over the internet is 100% secure.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <p>You have the right to:</p>
          <ul className="mt-3 space-y-2 text-[#7c7a76]">
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Access the personal data we hold about you</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Request correction or deletion of your data</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Withdraw consent at any time by deleting your account</span>
            </li>
          </ul>
        </Section>

        <Section title="6. Cookies">
          <p>
            We use essential cookies to maintain your session and authentication
            state. We do not use tracking or advertising cookies.
          </p>
        </Section>

        <Section title="7. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:hello@eventmanager.space"
              className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2"
            >
              hello@eventmanager.space
            </a>
          </p>
        </Section>

        {/* Footer note */}
        <div className="rounded-xl border border-[#2a2a35] bg-[#16161a] px-5 py-4">
          <p className="text-xs text-[#4a4a52] leading-relaxed">
            By using EventManager, you agree to the terms of this Privacy
            Policy. We may update this policy from time to time — continued use
            of the platform constitutes acceptance of any changes.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-syne text-lg font-bold text-[#e8e6e1]">{title}</h2>
      <div className="text-[#7c7a76] leading-relaxed">{children}</div>
    </div>
  );
}

export default PolicyPage;