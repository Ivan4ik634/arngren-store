import Container from '@/components/shared/Container';
import { FC } from 'react';

const PrivatyPolicyPage: FC = () => {
  return (
    <Container className="max-w-[860px]">
      <div className="py-10 sm:py-14">
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#0971f9]">
            Legal
          </p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-[-0.03em] text-[#0c1427]">
            Privacy Policy
          </h1>
        </header>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#3a4a66]">
          <section>
            <p>
              This Privacy Policy explains how{' '}
              <span className="font-medium text-[#0c1427]">[Company Legal Name]</span>{' '}
              (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your
              information when you use the Arngren Store marketplace website and related services
              (the &quot;Service&quot;).
            </p>
            <p className="mt-4">
              By using the Service, you agree to the collection and use of information in accordance
              with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us and information collected
              automatically when you use the Service.
            </p>
            <h3 className="mt-4 mb-2 font-semibold text-[#0c1427]">Account Information</h3>
            <p>
              When you create an account, we collect basic account information such as your name,
              email address, and password (stored securely). You may also choose to provide an
              avatar or profile picture.
            </p>
            <h3 className="mt-4 mb-2 font-semibold text-[#0c1427]">Authentication Provider Data</h3>
            <p>
              If you sign in using a third-party authentication provider such as Google, X
              (Twitter), or Facebook, we may receive certain information from that provider, such as
              your name, email address, and avatar, in accordance with the provider&apos;s
              permissions and your privacy settings.
            </p>
            <h3 className="mt-4 mb-2 font-semibold text-[#0c1427]">Usage Information</h3>
            <p>
              We may automatically collect information about how you interact with the Service,
              including pages visited, products viewed, and similar usage data.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Create and manage your account.</li>
              <li>Authenticate you when you sign in.</li>
              <li>Provide, operate, and maintain the Service.</li>
              <li>Allow you to browse products and marketplace listings.</li>
              <li>Facilitate interactions between buyers and sellers.</li>
              <li>Process and fulfill purchases where applicable.</li>
              <li>Communicate with you about your account and the Service.</li>
              <li>Improve and personalize your experience.</li>
              <li>Detect, prevent, and address technical issues and fraudulent activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">3. Storage and Database</h2>
            <p>
              We use Supabase for authentication and database services. Your account information and
              other data are stored in Supabase&apos;s infrastructure. Supabase processes and stores
              data on our behalf in accordance with its own security and privacy practices.
            </p>
            <p className="mt-3">
              We take reasonable measures to protect your information, but no method of transmission
              over the internet or method of electronic storage is completely secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">
              4. Cookies and Similar Technologies
            </h2>
            <p>
              We may use cookies and similar technologies to keep you signed in, remember your
              preferences, and understand how you use the Service. You can control cookies through
              your browser settings, but disabling them may affect certain features of the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">5. Third-Party Services</h2>
            <p>
              We may use third-party services to operate and improve the Service, including
              authentication providers (such as Google, X, and Facebook) and infrastructure
              providers (such as Supabase). These third parties may process your information in
              accordance with their own privacy policies.
            </p>
            <p className="mt-3">
              We are not responsible for the privacy practices of third-party services. We encourage
              you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">6. Data Retention</h2>
            <p>
              We retain your information for as long as your account is active or as needed to
              provide the Service, comply with legal obligations, resolve disputes, and enforce our
              agreements. When we no longer need your information, we will delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">7. Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your
              information from unauthorized access, alteration, disclosure, or destruction. However,
              no security system is impenetrable, and we cannot guarantee the absolute security of
              your information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">8. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, update, or
              delete the personal information we hold about you. You may also have the right to
              object to or restrict certain processing of your information.
            </p>
            <p className="mt-3">
              To exercise any of these rights, please contact us using the details in the
              &quot;Contact Us&quot; section below.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">9. Account Deletion</h2>
            <p>
              You may request the deletion of your account at any time. When you request account
              deletion, we will remove your account and associated personal information from the
              Service, subject to any legal obligations to retain certain data.
            </p>
            <p className="mt-3">
              To request account deletion, please contact us using the details in the &quot;Contact
              Us&quot; section below.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">
              10. Children&apos;s Privacy
            </h2>
            <p>
              The Service is not intended for children under the age of 18, and we do not knowingly
              collect personal information from children. If you believe a child has provided us
              with personal information, please contact us, and we will take steps to remove such
              information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">
              11. International Data Transfers
            </h2>
            <p>
              Your information may be processed and stored in countries other than your own,
              including through the use of third-party service providers such as Supabase. Where
              required by applicable law, we take steps to ensure that your information receives an
              adequate level of protection.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">
              12. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the
              &quot;Last Updated&quot; date at the top of this page. We encourage you to review this
              Privacy Policy periodically. Your continued use of the Service after any changes
              constitutes your acceptance of the revised Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">13. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or your personal information,
              please contact us at{' '}
              <a
                href="mailto:[Contact Email]"
                className="font-medium text-[#0971f9] hover:underline">
                [Contact Email]
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default PrivatyPolicyPage;
