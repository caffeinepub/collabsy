import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, MessageSquare, CreditCard, BarChart3, Shield, ArrowRight, CheckCircle2, Target, Zap } from 'lucide-react';
import MarketingLayout from '@/components/marketing/MarketingLayout';
import SocialProofStrip from '@/components/marketing/SocialProofStrip';
import HowItWorks from '@/components/marketing/HowItWorks';

export default function ForBrandsPage() {
  const navigate = useNavigate();

  const brandSteps = [
    {
      number: 1,
      title: "Create Your Brand Profile",
      description: "Sign up in minutes and tell us about your brand, industry, and campaign goals. Set up your profile to start discovering creators."
    },
    {
      number: 2,
      title: "Discover Perfect Creators",
      description: "Browse thousands of verified creators across Instagram, YouTube, TikTok, and more. Use advanced filters to find influencers that match your brand values and target audience."
    },
    {
      number: 3,
      title: "Launch Your Campaign",
      description: "Send collaboration requests with detailed campaign briefs. Negotiate terms, finalize agreements, and kick off your influencer marketing campaigns."
    },
    {
      number: 4,
      title: "Track & Optimize",
      description: "Monitor campaign performance in real-time. Process secure payments, analyze ROI, and optimize your influencer marketing strategy for maximum impact."
    }
  ];

  return (
    <MarketingLayout>
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ 
            backgroundImage: 'url(/assets/generated/dark-grain-texture.dim_1024x1024.png)',
            backgroundRepeat: 'repeat'
          }}
        />

        <section className="marketing-hero relative">
          <div className="marketing-content">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Target className="h-4 w-4" />
                <span>For Brands & Agencies</span>
              </div>
              
              <h1 className="marketing-hero-title">
                Scale Your Influencer Marketing with <span className="text-primary">Collabsy</span>
              </h1>
              
              <p className="marketing-hero-subtitle max-w-3xl mx-auto">
                Find verified creators, launch data-driven campaigns, and measure real results. Everything you need to succeed with influencer marketing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: '/signup' })}
                  className="marketing-cta-primary group"
                >
                  Start Your Campaign
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ to: '/' })}
                  className="marketing-cta-secondary"
                >
                  See Platform Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <SocialProofStrip />

        <section className="marketing-section bg-card/30">
          <div className="marketing-content">
            <div className="text-center mb-16 space-y-4">
              <h2 className="marketing-heading">Powerful Features for Brands</h2>
              <p className="marketing-subheading max-w-3xl mx-auto">
                Everything you need to run successful influencer campaigns at scale.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Search className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Creator Discovery</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Browse thousands of verified creators across all major platforms. Find influencers that perfectly align with your brand.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Multi-platform search</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Verified metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Filter className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Advanced Filtering</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Filter by platform, follower count, engagement rate, pricing, category, and niche to find exactly what you need.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Custom filters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Save searches</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <MessageSquare className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Campaign Management</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Send collaboration requests, negotiate terms, and manage all campaigns from a single, intuitive dashboard.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Real-time updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Collaboration tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <CreditCard className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Secure Payments</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Process payments securely with UPI integration. Track all transactions and maintain complete payment history.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Instant transfers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Transaction history</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Analytics & Insights</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Monitor campaign performance, track spending, and measure ROI with comprehensive analytics and reporting tools.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Real-time dashboards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>ROI tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Verified Creators</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Work with confidence knowing all creators are verified with authentic follower counts and engagement metrics.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Identity verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Authentic metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="marketing-section">
          <div className="marketing-content">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="marketing-heading">Why Brands Choose Collabsy</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From startups to enterprise brands, Collabsy provides the tools and insights you need to run successful influencer marketing campaigns at any scale.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Launch Faster</h4>
                      <p className="text-sm text-muted-foreground">Set up campaigns in minutes, not weeks. Our streamlined workflow gets you results faster.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Better Targeting</h4>
                      <p className="text-sm text-muted-foreground">Find creators whose audience perfectly matches your target demographic.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Measure Everything</h4>
                      <p className="text-sm text-muted-foreground">Track performance metrics and ROI with comprehensive analytics dashboards.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/assets/generated/marketplace-ui-illustration.dim_1200x750.png"
                  alt="Brand Dashboard"
                  className="rounded-2xl shadow-xl border border-border/40 w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <HowItWorks steps={brandSteps} title="How Collabsy Works for Brands" />

        <section className="marketing-cta-section">
          <div className="marketing-content">
            <div className="marketing-cta-box">
              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Ready to Scale Your Influencer Marketing?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join leading brands using Collabsy to connect with creators and drive real results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={() => navigate({ to: '/signup' })}
                    className="marketing-cta-primary group"
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate({ to: '/for-creators' })}
                    className="marketing-cta-secondary"
                  >
                    For Creators
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
