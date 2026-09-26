import Container from '@/components/shared/Container';
import { FC } from 'react';

const TermsPage: FC = () => {
  return (
    <Container className="max-w-[860px]">
      <div className="py-10 sm:py-14">
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#0971f9]">
            Legal
          </p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-[-0.03em] text-[#0c1427]">
            Terms of Service
          </h1>
        </header>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#3a4a66]">
          <section>
            <p>
              Welcome to Arngren Store. These Terms of Service (&quot;Terms&quot;) govern your
              access to and use of the Arngren Store marketplace website and any related services
              (collectively, the &quot;Service&quot;), operated by{' '}
              <span className="font-medium text-[#0c1427]">[Company Legal Name]</span>{' '}
              (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
            </p>
            <p className="mt-4">
              By creating an account, browsing the marketplace, or otherwise using the Service, you
              agree to be bound by these Terms. If you do not agree to these Terms, please do not
              use the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">1. Eligibility</h2>
            <p>
              You must be at least 18 years old, or the age of legal majority in your jurisdiction,
              to create an account and use the Service. By using the Service, you represent that you
              meet this requirement.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">2. Accounts</h2>
            <p>
              To access certain features, you may be required to create an account. You agree to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Provide accurate, current, and complete information when creating your account.
              </li>
              <li>Keep your account credentials secure and confidential.</li>
              <li>Notify us promptly if you suspect any unauthorized use of your account.</li>
              <li>Be responsible for all activity that occurs under your account.</li>
            </ul>
            <p className="mt-3">
              You may register using an email address and password, or through supported third-party
              authentication providers such as Google, X (Twitter), and Facebook. When you use a
              third-party provider, you authorize us to access certain account information from that
              provider in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">3. Marketplace Listings</h2>
            <p>
              Arngren Store is an online marketplace that allows users to browse products and
              listings. Listings may be provided by sellers using the Service. We do not guarantee
              the accuracy, quality, safety, or legality of any listing, product, or seller.
            </p>
            <p className="mt-3">
              You are responsible for evaluating any listing or seller before making a purchase. We
              are not a party to any transaction between buyers and sellers unless expressly stated
              otherwise.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">4. Purchases and Payments</h2>
            <p>
              When you purchase a product through the Service, you agree to pay the applicable price
              and any associated fees. Payment processing may be handled by us or by third-party
              payment providers. Where payments are processed by a third party, your payment
              information is subject to that provider&apos;s terms and privacy policy.
            </p>
            <p className="mt-3">
              All prices are stated in the currency displayed at the time of purchase. We reserve
              the right to change prices at any time, subject to applicable law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">5. Sellers</h2>
            <p>If you list products for sale on the Service, you agree to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Provide accurate and truthful information about your products.</li>
              <li>Ensure that you have the legal right to sell the products you list.</li>
              <li>Comply with all applicable laws and regulations.</li>
              <li>Fulfill orders and communicate with buyers in a timely manner.</li>
              <li>Not engage in fraudulent, deceptive, or misleading practices.</li>
            </ul>
            <p className="mt-3">
              We may suspend or remove listings and accounts that violate these Terms or applicable
              law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">6. User Responsibilities</h2>
            <p>
              You agree to use the Service only for lawful purposes and in accordance with these
              Terms. You must not:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Violate any applicable law or regulation.</li>
              <li>Infringe the rights of others, including intellectual property rights.</li>
              <li>Upload or transmit malicious code, viruses, or harmful content.</li>
              <li>Attempt to gain unauthorized access to the Service or its systems.</li>
              <li>Interfere with or disrupt the operation of the Service.</li>
              <li>Impersonate any person or entity.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">7. Prohibited Activities</h2>
            <p>
              You may not use the Service to sell or offer any products that are illegal,
              counterfeit, stolen, or otherwise prohibited by applicable law. We reserve the right
              to remove any content or listing that we determine, in our sole discretion, violates
              these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">8. Intellectual Property</h2>
            <p>
              The Service, including its design, text, graphics, logos, and software, is owned by us
              or our licensors and is protected by intellectual property laws. You may not copy,
              modify, distribute, or create derivative works from any part of the Service without
              our prior written consent.
            </p>
            <p className="mt-3">
              You retain ownership of any content you submit to the Service. By submitting content,
              you grant us a non-exclusive, worldwide, royalty-free license to use, display, and
              distribute that content solely to operate and improve the Service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">
              9. Third-Party Authentication
            </h2>
            <p>
              The Service may allow you to sign in using third-party authentication providers such
              as Google, X (Twitter), and Facebook. Your use of these providers is subject to their
              own terms of service and privacy policies. We are not responsible for the practices of
              these third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">10. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service, in whole or in part, at any
              time and for any reason, including if we believe you have violated these Terms. You
              may stop using the Service at any time and may delete your account in accordance with
              our Privacy Policy.
            </p>
            <p className="mt-3">
              Upon termination, your right to use the Service will immediately cease. Provisions of
              these Terms that by their nature should survive termination will survive.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">11. Disclaimers</h2>
            <p>
              The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis,
              without warranties of any kind, whether express or implied, including but not limited
              to implied warranties of merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
            <p className="mt-3">
              We do not warrant that the Service will be uninterrupted, secure, or error-free, or
              that defects will be corrected.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">
              12. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, we shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, or any loss of
              profits or revenues, whether incurred directly or indirectly, or any loss of data,
              use, goodwill, or other intangible losses, resulting from your use of or inability to
              use the Service.
            </p>
            <p className="mt-3">
              Our total liability arising out of or relating to these Terms or your use of the
              Service shall not exceed the amount you paid to us, if any, during the twelve (12)
              months preceding the event giving rise to the liability.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">
              13. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. When we do, we will revise the &quot;Last
              Updated&quot; date at the top of this page. We encourage you to review these Terms
              periodically. Your continued use of the Service after any changes constitutes your
              acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              jurisdiction in which{' '}
              <span className="font-medium text-[#0c1427]">[Company Legal Name]</span> is
              established, without regard to its conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-[#0c1427]">15. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
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

export default TermsPage;
