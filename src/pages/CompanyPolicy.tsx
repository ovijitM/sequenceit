import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CompanyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Company Policy & General Service Agreement
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            {/* 1. Engagement Terms */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                1. Engagement Terms
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Project Kickoff:</strong> Work commences only after
                  the signed Proposal/agreement and the required Advance Payment are
                  received.
                </li>
                <li>
                  <strong>Scope Definition:</strong> Any requirements added
                  after agreement signing are considered out of scope and will
                  be billed separately.
                </li>
              </ul>
            </section>

            {/* 2. Payment & Advance Policy */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                2. Payment & Advance Policy
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Advance Requirement:</strong> A non-refundable 30%
                  advance payment is required to initiate any project.
                </li>
                <li>
                  <strong>Milestone Payments:</strong> Payments are divided into
                  Phase I (Design), Phase II (MVP), and Phase III (Final
                  Delivery).
                </li>
                <li>
                  <strong>Sequential Progress:</strong> Each milestone must be
                  cleared before moving to the next phase.
                </li>
                <li>
                  <strong>Late Fees:</strong> Invoices overdue by more than 7
                  days are subject to a 5% service charge.
                </li>
              </ul>
            </section>

            {/* 3. Refund & Cancellation */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                3. Refund & Cancellation
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Work-Based Refunds:</strong> Payments for completed
                  milestones are strictly non-refundable.
                </li>
                <li>
                  <strong>Advance Retention:</strong> The 30% advance fee is
                  retained to cover resource allocation and initial setup costs.
                </li>
                <li>
                  <strong>Cancellation:</strong> Clients may cancel at any time
                  but remain liable for all work hours logged up to the
                  cancellation date.
                </li>
              </ul>
            </section>

            {/* 4. Infrastructure & Assets */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                4. Infrastructure & Assets
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>External Costs:</strong> Hosting, domains, third-party
                  services, and API keys are the financial responsibility of the
                  Client.
                </li>
                <li>
                  <strong>Third-Party Changes:</strong> SequenceIT is not liable
                  for price changes, service limitations, or policy updates from
                  external providers.
                </li>
              </ul>
            </section>

            {/* 5. Maintenance & Support */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                5. Maintenance & Support
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Grace Period:</strong> 30 days of free technical
                  support is provided post-launch for existing features only.
                </li>
                <li>
                  <strong>Support Limits:</strong> Support does not include new
                  features, redesigns, or scope changes.
                </li>
                <li>
                  <strong>Retainers:</strong> Ongoing maintenance is billed
                  monthly as defined in the signed Proposal.
                </li>
              </ul>
            </section>

            {/* 6. Ownership & Licensing */}
            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                6. Ownership & Licensing
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Rights Transfer:</strong> Intellectual Property rights
                  are transferred to the Client only after full payment (100%)
                  has been received.
                </li>
                <li>
                  <strong>Portfolio Use:</strong> SequenceIT may showcase the
                  project in portfolios unless restricted by an active NDA.
                </li>
                <li>
                  <strong>Exclusivity & Originality:</strong> All
                  project-specific code is original and exclusive to the Client.
                  SequenceIT will not replicate or resell the same solution to
                  third parties.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyPolicy;
