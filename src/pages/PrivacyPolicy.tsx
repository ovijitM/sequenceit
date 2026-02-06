import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company information</li>
                <li>Project details and requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you updates and marketing communications</li>
                <li>Analyze usage and trends to improve user experience</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                3. Information Sharing and Disclosure
              </h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and property</li>
                <li>With service providers who assist us in operating our business</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                4. Data Security
              </h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                5. Your Rights
              </h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                7. Changes to This Privacy Policy
              </h2>
              <p className="text-muted-foreground mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                8. Contact Us
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none text-muted-foreground space-y-2">
                <li>Email: query.sequenceit@gmail.com</li>
                <li>Phone: +8801540515959</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
