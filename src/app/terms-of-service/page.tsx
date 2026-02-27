function TermsOfServicePage() {
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
            Terms of Service
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
          Welcome to EventManager. By accessing or using our platform at{" "}
          <span className="text-amber-400/80">eventmanager.space</span>, you
          agree to be bound by these Terms of Service. Please read them
          carefully before using our services.
        </p>

        <Section title="1. Acceptance of Terms">
          <p>
            By creating an account or using EventManager in any way, you
            confirm that you are at least 18 years old and agree to these
            Terms. If you do not agree, please discontinue use of the platform
            immediately.
          </p>
        </Section>

        <Section title="2. Use of the Platform">
          <p>You agree to use EventManager only for lawful purposes. You must not:</p>
          <ul className="mt-3 space-y-2 text-[#7c7a76]">
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Post false, misleading, or fraudulent event information</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Attempt to gain unauthorized access to the platform or other accounts</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Use the platform to spam, harass, or harm other users</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Violate any applicable local, national, or international laws</span>
            </li>
          </ul>
        </Section>

        <Section title="3. User Accounts">
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. Notify us immediately at{" "}
            <a
              href="mailto:hello@eventmanager.space"
              className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2"
            >
              hello@eventmanager.space
            </a>{" "}
            if you suspect any unauthorized use of your account.
          </p>
        </Section>

        <Section title="4. Events & Registrations">
          <p>When registering for events on EventManager:</p>
          <ul className="mt-3 space-y-2 text-[#7c7a76]">
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                Event details including dates, times, and capacity are subject
                to change by the organizer
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                Paid events are subject to the organizer's refund policy
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>
                EventManager is not liable for any cancellations or changes
                made by event organizers
              </span>
            </li>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            All content on EventManager — including the design, logo, and
            codebase — is the property of EventManager and protected by
            applicable intellectual property laws. You may not reproduce,
            distribute, or create derivative works without our written
            permission.
          </p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p>
            EventManager is provided "as is" without warranties of any kind.
            We are not liable for any indirect, incidental, or consequential
            damages arising from your use of the platform, including but not
            limited to loss of data, missed events, or service interruptions.
          </p>
        </Section>

        <Section title="7. Termination">
          <p>
            We reserve the right to suspend or terminate your account at our
            discretion if you violate these Terms. You may also delete your
            account at any time from your account settings.
          </p>
        </Section>

        <Section title="8. Changes to Terms">
          <p>
            We may update these Terms from time to time. We will notify users
            of significant changes via email or a notice on the platform.
            Continued use of EventManager after changes constitutes acceptance
            of the updated Terms.
          </p>
        </Section>

        <Section title="9. Governing Law">
          <p>
            These Terms are governed by the laws of Kenya. Any disputes arising
            from these Terms shall be subject to the exclusive jurisdiction of
            the courts of Kenya.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>
            For any questions regarding these Terms of Service, please reach
            out to us at{" "}
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
            These Terms of Service constitute the entire agreement between you
            and EventManager regarding your use of the platform and supersede
            any prior agreements.
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

export default TermsOfServicePage;