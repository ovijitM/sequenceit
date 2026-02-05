import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using SequenceIT's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                2. Use License
              </h2>
              <p className="text-muted-foreground mb-4">
                Permission is granted to temporarily access our services for personal, non-commercial use only. This license does not include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Modifying or copying our materials</li>
                <li>Using materials for commercial purposes</li>
                <li>Attempting to reverse engineer any software</li>
                <li>Removing copyright or proprietary notations</li>
                <li>Transferring materials to another person</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                3. Services Description
              </h2>
              <p className="text-muted-foreground mb-4">
                SequenceIT provides technology consulting, software development, AI & machine learning solutions, blockchain development, and cloud services. We reserve the right to modify, suspend, or discontinue any service at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                4. User Responsibilities
              </h2>
              <p className="text-muted-foreground mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Use our services in compliance with all applicable laws</li>
                <li>Not interfere with or disrupt our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-muted-foreground mb-4">
                All content, features, and functionality of our services are owned by SequenceIT and are protected by international copyright, trademark, and other intellectual property laws. Unless otherwise specified in a contract, all work product created for clients remains the intellectual property of SequenceIT until full payment is received.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                6. Payment Terms
              </h2>
              <p className="text-muted-foreground mb-4">
                Payment terms will be specified in individual service agreements. Late payments may result in:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Suspension of services</li>
                <li>Late payment fees as specified in contracts</li>
                <li>Legal action to recover outstanding amounts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-muted-foreground mb-4">
                SequenceIT shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                8. Warranties and Disclaimers
              </h2>
              <p className="text-muted-foreground mb-4">
                Our services are provided "as is" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                9. Termination
              </h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any reason, including breach of these Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                10. Governing Law
              </h2>
              <p className="text-muted-foreground mb-4">
                These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which SequenceIT operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                12. Contact Information
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none text-muted-foreground space-y-2">
                <li>Email: legal@sequenceit.com</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
