import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search, TrendingUp, DollarSign, BarChart3, Users, Zap, Shield, Sparkles } from 'lucide-react';
import MarketingLayout from '@/components/marketing/MarketingLayout';
import SocialProofStrip from '@/components/marketing/SocialProofStrip';
import HowItWorks from '@/components/marketing/HowItWorks';

export default function HomePage() {
  const navigate = useNavigate();

  const howItWorksSteps = [
    {
      number: 1,
      title: "Sign Up & Create Your Profile",
      description: "Join Collabsy in minutes. Whether you're a brand or creator, set up your profile and start exploring opportunities immediately."
    },
    {
      number: 2,
      title: "Discover Perfect Matches",
      description: "Brands find creators that align with their values. Creators get discovered by brands looking for their unique voice and audience."
    },
    {
      number: 3,
      title: "Collaborate & Create",
      description: "Connect, negotiate terms, and launch campaigns. Our platform streamlines communication and project management."
    },
    {
      number: 4,
      title: "Track Results & Get Paid",
      description: "Monitor campaign performance with real-time analytics. Secure payments processed instantly through our platform."
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  <span>The Future of Influencer Marketing</span>
                </div>
                
                <h1 className="marketing-hero-title">
                  Connect Brands with Creators on <span className="text-primary">Collabsy</span>
                </h1>
                
                <p className="marketing-hero-subtitle">
                  The all-in-one platform for authentic influencer partnerships. Discover creators, launch campaigns, and measure success—all in one place.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    onClick={() => navigate({ to: '/signup' })}
                    className="marketing-cta-primary group"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate({ to: '/for-brands' })}
                    className="marketing-cta-secondary"
                  >
                    Learn More
                  </Button>
                </div>

                <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Verified Creators</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Instant Payments</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl" />
                <img
                  src="/assets/generated/collabsy-hero-collage.dim_1600x900.png"
                  alt="Collabsy Platform"
                  className="relative rounded-2xl shadow-2xl border border-border/40 w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <SocialProofStrip />

        <section className="marketing-section bg-card/30">
          <div className="marketing-content">
            <div className="text-center mb-16 space-y-4">
              <h2 className="marketing-heading">Why Choose Collabsy?</h2>
              <p className="marketing-subheading max-w-3xl mx-auto">
                Everything you need to run successful influencer marketing campaigns, all in one powerful platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Search className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Smart Discovery</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Find the perfect creators with AI-powered matching. Filter by platform, audience, engagement, and pricing.
                  </p>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Verified Community</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Work with confidence. All creators are verified with authentic metrics and engagement data.
                  </p>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Real-Time Analytics</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Track campaign performance, monitor spending, and measure ROI with comprehensive dashboards.
                  </p>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <DollarSign className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Secure Payments</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Process payments safely with integrated payment processing. Instant transfers and complete transaction history.
                  </p>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <TrendingUp className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Campaign Management</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Manage all collaborations from one dashboard. Track status, deadlines, and deliverables effortlessly.
                  </p>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Zap className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Lightning Fast</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Launch campaigns in minutes, not days. Streamlined workflows get you results faster.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <HowItWorks steps={howItWorksSteps} />

        <section className="marketing-cta-section">
          <div className="marketing-content">
            <div className="marketing-cta-box">
              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Ready to Transform Your Influencer Marketing?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join thousands of brands and creators already using Collabsy to power their partnerships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={() => navigate({ to: '/signup' })}
                    className="marketing-cta-primary group"
                  >
                    Start Free Today
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate({ to: '/for-brands' })}
                    className="marketing-cta-secondary"
                  >
                    See How It Works
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
