import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
            Cookie Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                1. What Are Cookies
              </h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                2. How We Use Cookies
              </h2>
              <p className="text-muted-foreground mb-4">
                We use cookies for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Essential functionality and security</li>
                <li>Remembering your preferences and settings</li>
                <li>Analyzing site traffic and usage patterns</li>
                <li>Improving user experience</li>
                <li>Delivering relevant content and advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                3. Types of Cookies We Use
              </h2>
              
              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold mb-3">
                  Essential Cookies
                </h3>
                <p className="text-muted-foreground mb-2">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold mb-3">
                  Analytics Cookies
                </h3>
                <p className="text-muted-foreground mb-2">
                  We use Google Analytics to understand how visitors interact with our website. These cookies collect information about:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Pages visited and time spent on each page</li>
                  <li>Traffic sources and referral paths</li>
                  <li>Device and browser information</li>
                  <li>Geographic location (country/city level)</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold mb-3">
                  Functional Cookies
                </h3>
                <p className="text-muted-foreground mb-2">
                  These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced features.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold mb-3">
                  Marketing Cookies
                </h3>
                <p className="text-muted-foreground mb-2">
                  These cookies track your browsing habits to deliver advertisements that are relevant to you and your interests.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                4. Third-Party Cookies
              </h2>
              <p className="text-muted-foreground mb-4">
                We use services from third parties that may set their own cookies:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Social Media Platforms:</strong> For social media integration and sharing</li>
                <li><strong>Content Delivery Networks:</strong> For improved website performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                5. Managing Cookies
              </h2>
              <p className="text-muted-foreground mb-4">
                You can control and manage cookies in several ways:
              </p>
              
              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold mb-3">
                  Browser Settings
                </h3>
                <p className="text-muted-foreground mb-2">
                  Most browsers allow you to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>View what cookies are stored and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies from specific websites</li>
                  <li>Block all cookies from being set</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold mb-3">
                  Opt-Out Options
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                  <li>Advertising cookies: Visit <a href="http://www.aboutads.info/choices/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Your Ad Choices</a> or <a href="http://www.youronlinechoices.eu/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Your Online Choices</a></li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                6. Cookie Duration
              </h2>
              <p className="text-muted-foreground mb-4">
                We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period or until you delete them).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                7. Updates to This Policy
              </h2>
              <p className="text-muted-foreground mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-display text-2xl font-semibold mb-4">
                8. Contact Us
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies, please contact us:
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

export default CookiePolicy;
