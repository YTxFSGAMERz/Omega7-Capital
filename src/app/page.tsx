import Image from "next/image";
import SiteShell from "@/components/site-shell";
import FAQSection, { faqs } from "@/components/faq-section";
import { FaqSearch } from "@/components/faq-search";
import StatsCounter from "@/components/stats-counter";
import ResearchAreas from "@/components/research-areas";
import Testimonials from "@/components/testimonials";
import ValuesSection from "@/components/values-section";
import MethodologySection from "@/components/methodology-section";
import TeamSection from "@/components/team-section";
import PublicationsSection from "@/components/publications-section";
import PhilosophySection from "@/components/philosophy-section";
import NewsletterForm from "@/components/newsletter-form";
import ContactForm from "@/components/contact-form";
import SiteFooter from "@/components/site-footer";
import LoadingSkeleton from "@/components/loading-skeleton";
import HeroTypewriter from "@/components/hero-typewriter";
import ProgramsTimeline from "@/components/programs-timeline";
import EventsSection from "@/components/events-section";
import { ActivityFeed } from "@/components/activity-feed";
import { ImpactMetrics } from "@/components/impact-metrics";
import NetworkMap from "@/components/network-map";
import PartnersSection from "@/components/partners-section";
import MarqueeTicker from "@/components/marquee-ticker";
import MouseSpotlight from "@/components/mouse-spotlight";
import QuickActions from "@/components/quick-actions";
import ScrollReveal from "@/components/scroll-reveal";
import { SocialProofSection } from "@/components/social-proof-section";
import { DisciplinesChart } from "@/components/disciplines-chart";
import FundingCategories from "@/components/funding-categories";
import { ResourcesHub } from "@/components/resources-hub";
import { ResearchPipeline } from "@/components/research-pipeline";
import { JoinCTABanner } from "@/components/join-cta-banner";
import LogoTicker from "@/components/logo-ticker";
import CareerOpportunities from "@/components/career-opportunities";
import InvestmentThesis from "@/components/investment-thesis";
import { FundingPipeline } from "@/components/funding-pipeline";
import { PortfolioShowcase } from "@/components/portfolio-showcase";
import { HowWeWork } from "@/components/how-we-work";
import { ResearchInsights } from "@/components/research-insights";
import { AwardsRecognition } from "@/components/awards-recognition";
import { InvestmentCalculator } from "@/components/investment-calculator";
import { ExitIntent } from "@/components/exit-intent";
import { SectionProgress } from "@/components/section-progress";
import { ContactInfoCards } from "@/components/contact-info-cards";
import { StatsHighlights } from "@/components/stats-highlights";
import { AnimatedTextReveal } from "@/components/animated-text-reveal";
import { TiltCard } from "@/components/tilt-card";
import { SectionDividerObserver } from "@/components/section-divider-observer";
import { PageTransition } from "@/components/page-transition";
import { ScrollToHash } from "@/components/scroll-to-hash";

export default function Home() {
  return (
    <SiteShell>
      {/* Scroll to hash on mount after page transition */}
      <ScrollToHash />

      {/* Loading skeleton - shows during initial hydration */}
      <LoadingSkeleton />

      {/* Section divider scroll animation observer */}
      <SectionDividerObserver />

      {/* Mouse spotlight effect — desktop only */}
      <MouseSpotlight />

      {/* Section progress indicator — desktop only */}
      <SectionProgress />

      {/* Exit intent newsletter popup — desktop only */}
      <ExitIntent />

      {/* Quick actions floating toolbar */}
      <QuickActions />

      {/* Skip navigation for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:border focus:border-gray-300 focus:rounded"
      >
        Skip to main content
      </a>

      {/* Main Content */}
      <PageTransition>
      <main id="main-content" className="site-main" role="main">
        {/* Hero Section */}
        <section className="hero-section" aria-label="Omega7 Capital introduction">
          <Image
            src="/omega7-logo.webp"
            alt="Omega7 Capital venture capital firm logo — quantitative finance research collective"
            width={483}
            height={483}
            className="hero-logo"
            priority
            loading="eager"
            sizes="(max-width: 600px) 253px, 483px"
          />
          <a
            href="#about"
            className="hero-badge"
            aria-label="Learn more about Omega7 Capital"
          >
            <span className="hero-badge-tag">Est. 2024</span>
            Venture Capital &amp; Quantitative Finance
          </a>

          {/* Typewriter effect */}
          <HeroTypewriter />

          {/* Mobile scroll hint — CSS-only bouncing chevron */}
          <div className="hero-scroll-hint" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* Decorative separator between hero and content */}
        <div className="hero-separator" aria-hidden="true" />

        {/* Marquee Ticker — scrolling research keywords */}
        <MarqueeTicker />

        {/* About Section */}
        <section id="about" className="body-content" aria-label="About Omega7 Capital">
          <h1>
            <span className="heading-accent">Omega7 Capital</span> — Quantitative Finance Research Collective
          </h1>

          <p>
            Omega7 Capital is an international{" "}
            <strong>quantitative finance</strong> research collective,
            bringing together exceptional students from universities across
            Europe, Africa, Asia, and beyond. We are united by a shared
            commitment to advancing knowledge in quantitative and
            mathematical finance through rigorous scientific inquiry.
          </p>

          <p>
            Our work is grounded in the belief that high-quality research
            requires both depth and discipline. Members are expected to
            engage seriously with the mathematical and statistical
            foundations of modern finance, to think carefully, and to
            produce results that meet the standards of the broader
            academic and scientific community.
          </p>

          <div className="content-divider" aria-hidden="true" />

          <p>
            We learn together and we build together. Seminars, reading
            groups, and collaborative working sessions form the backbone
            of our intellectual life. We study the foundational texts of
            quantitative finance, engage with current literature, and
            translate theory into practice through rigorous,
            well-documented projects.
          </p>

          <h2>
            <em>What we believe</em>
          </h2>

          <p>
            Scientific progress in finance requires openness,
            collaboration, and honest engagement with difficulty. We
            believe that the best work emerges not from shortcuts, but
            from patience, precision, and a genuine commitment to
            understanding. Every output produced under the Omega7 name is
            held to that standard.
          </p>

          <p>
            Membership is earned, not given. Candidates are selected
            solely on the basis of demonstrated technical ability,
            intellectual curiosity, and the willingness to contribute.
          </p>

          {/* Core Values */}
          <ValuesSection />

          {/* Philosophy */}
          <PhilosophySection />

          {/* Stats Counter */}
          <ScrollReveal>
            <StatsCounter />
          </ScrollReveal>

          {/* Impact Metrics — animated progress rings */}
          <ImpactMetrics />

          {/* Programs & Milestones Timeline */}
          <ScrollReveal>
            <ProgramsTimeline />
          </ScrollReveal>

          {/* Methodology / Process Timeline */}
          <ScrollReveal>
            <MethodologySection />
          </ScrollReveal>

          {/* Research Pipeline */}
          <ScrollReveal>
            <ResearchPipeline />
          </ScrollReveal>

          {/* How We Work — process steps */}
          <HowWeWork />

          {/* Team / Leadership */}
          <ScrollReveal>
            <TeamSection />
          </ScrollReveal>

          {/* Research Focus Areas */}
          <ScrollReveal>
            <div id="research">
              <ResearchAreas />
            </div>
          </ScrollReveal>

          {/* Academic Disciplines Chart */}
          <ScrollReveal>
            <DisciplinesChart />
          </ScrollReveal>

          {/* Funding Focus Areas */}
          <ScrollReveal>
            <FundingCategories />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Research Insights / Blog Previews */}
          <ResearchInsights />

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Resources Hub */}
          <ScrollReveal>
            <ResourcesHub />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Research Highlights / Publications */}
          <ScrollReveal>
            <PublicationsSection />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Network Map — university partnerships */}
          <ScrollReveal>
            <NetworkMap />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Investment Thesis */}
          <ScrollReveal>
            <InvestmentThesis />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Funding Pipeline */}
          <ScrollReveal>
            <FundingPipeline />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Investment Calculator */}
          <ScrollReveal>
            <InvestmentCalculator />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Awards & Recognition */}
          <AwardsRecognition />

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Portfolio Showcase */}
          <ScrollReveal>
            <PortfolioShowcase />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Academic Partners */}
          <ScrollReveal>
            <PartnersSection />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Upcoming Events */}
          <ScrollReveal>
            <EventsSection />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Recent Activity */}
          <ScrollReveal>
            <ActivityFeed />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Testimonials */}
          <Testimonials />

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Social Proof */}
          <ScrollReveal>
            <SocialProofSection />
          </ScrollReveal>

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* Logo Ticker — trusted institutions */}
          <LogoTicker />

          {/* Section Divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* FAQ Section */}
          <ScrollReveal>
            <div id="faq">
              <FaqSearch items={faqs} />
              <FAQSection />
            </div>
          </ScrollReveal>

          {/* Newsletter */}
          <ScrollReveal>
            <NewsletterForm />
          </ScrollReveal>

          <div className="content-divider" aria-hidden="true" />

          {/* Join CTA Banner — before Join section */}
          <JoinCTABanner />

          <h2 id="join" className="join-heading">
            <em>Join us</em>
          </h2>

          <p>
            We are building a collective of students who want to do
            serious work in quantitative and mathematical finance. If you
            are motivated by rigour, driven by curiosity, and ready to
            contribute to something larger than yourself, we want to hear
            from you.
          </p>

          <div className="join-cta-group">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd1mtbzN7T2-OlGWXmWPss4AsIl2jfSq2o9HdXs3qRH9PWRKA/viewform"
              className="join-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply for membership &rarr;
            </a>
          </div>

          {/* Contact Info Cards */}
          <ScrollReveal>
            <ContactInfoCards />
          </ScrollReveal>

          {/* Stats Highlights — animated key metrics */}
          <ScrollReveal>
            <StatsHighlights />
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal>
            <ContactForm />
          </ScrollReveal>

          {/* Career Opportunities / Open Positions */}
          <ScrollReveal>
            <CareerOpportunities />
          </ScrollReveal>

        </section>

        {/* Footer */}
        <SiteFooter />
      </main>
      </PageTransition>
    </SiteShell>
  );
}
