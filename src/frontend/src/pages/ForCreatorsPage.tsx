import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, Calendar, Bell, PieChart, Sparkles, ArrowRight, CheckCircle2, Users, Zap } from 'lucide-react';
import MarketingLayout from '@/components/marketing/MarketingLayout';
import SocialProofStrip from '@/components/marketing/SocialProofStrip';
import HowItWorks from '@/components/marketing/HowItWorks';

export default function ForCreatorsPage() {
  const navigate = useNavigate();

  const creatorSteps = [
    {
      number: 1,
      title: "Build Your Creator Profile",
      description: "Create a compelling profile showcasing your social media stats, content style, and audience demographics across all platforms. Set your rates and availability."
    },
    {
      number: 2,
      title: "Get Discovered by Brands",
      description: "Brands actively searching for creators will discover your profile. Receive collaboration requests that match your niche, audience, and content style."
    },
    {
      number: 3,
      title: "Accept & Collaborate",
      description: "Review campaign details, negotiate terms, and accept opportunities that align with your brand. Manage all collaborations from your dashboard."
    },
    {
      number: 4,
      title: "Create Content & Get Paid",
      description: "Deliver amazing content, complete campaigns, and receive instant payments through secure payment processing. Track your earnings and grow your business."
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
                <Sparkles className="h-4 w-4" />
                <span>For Content Creators</span>
              </div>
              
              <h1 className="marketing-hero-title">
                Turn Your Influence into Income with <span className="text-primary">Collabsy</span>
              </h1>
              
              <p className="marketing-hero-subtitle max-w-3xl mx-auto">
                Connect with top brands, manage collaborations seamlessly, and grow your creator business. Get paid for what you love to do.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: '/signup' })}
                  className="marketing-cta-primary group"
                >
                  Join as Creator
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ to: '/' })}
                  className="marketing-cta-secondary"
                >
                  Learn More
                </Button>
              </div>

              <div className="mt-12">
                <img
                  src="/assets/generated/creator-avatar-set-1.dim_768x256.png"
                  alt="Creator Community"
                  className="rounded-xl shadow-lg border border-border/40 w-full max-w-2xl mx-auto h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <SocialProofStrip />

        <section className="marketing-section bg-card/30">
          <div className="marketing-content">
            <div className="text-center mb-16 space-y-4">
              <h2 className="marketing-heading">Everything You Need to Succeed</h2>
              <p className="marketing-subheading max-w-3xl mx-auto">
                Powerful tools designed to help creators monetize their influence and grow their business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Brand Partnerships</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Get discovered by brands actively looking for creators in your niche. Receive collaboration requests that match your audience.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Quality brand matches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Direct opportunities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <DollarSign className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Set Your Own Rates</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You're in control. Set your own pricing for reels, posts, and videos. Update your rates anytime as your audience grows.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Flexible pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Update anytime</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Calendar className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Campaign Management</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Manage all your brand collaborations in one place. Track campaign status, deadlines, and deliverables effortlessly.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Centralized dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Deadline tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Bell className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Real-time Notifications</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Never miss an opportunity. Get instant notifications when brands send collaboration requests or update campaign status.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Instant alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Status updates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <TrendingUp className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Earnings Dashboard</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Track your earnings, view payment history, and monitor your growth with comprehensive financial analytics.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Income tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Payment history</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="marketing-card group">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <PieChart className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Performance Insights</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Understand your value with detailed analytics on campaign performance, engagement rates, and audience demographics.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Campaign analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Growth metrics</span>
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
              <div className="order-2 lg:order-1">
                <img
                  src="/assets/generated/marketplace-ui-illustration.dim_1200x750.png"
                  alt="Creator Dashboard"
                  className="rounded-2xl shadow-xl border border-border/40 w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="marketing-heading">Why Creators Love Collabsy</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From emerging influencers to established creators, Collabsy provides the platform and tools you need to monetize your influence and build a sustainable creator business.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Quality Partnerships</h4>
                      <p className="text-sm text-muted-foreground">Work with brands that value your content and respect your creative vision.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Instant Payments</h4>
                      <p className="text-sm text-muted-foreground">Get paid quickly and securely. No waiting, no hassle.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Grow Your Business</h4>
                      <p className="text-sm text-muted-foreground">Access tools and insights to help you scale your creator business.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks steps={creatorSteps} title="Your Journey to Success" />

        <section className="marketing-cta-section">
          <div className="marketing-content">
            <div className="marketing-cta-box">
              <div className="text-center space-y-6 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Start Growing Your Creator Business Today
                </h2>
                <p className="text-xl text-muted-foreground">
                  Join thousands of creators already earning through brand partnerships on Collabsy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={() => navigate({ to: '/signup' })}
                    className="marketing-cta-primary group"
                  >
                    Create Your Profile
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate({ to: '/for-brands' })}
                    className="marketing-cta-secondary"
                  >
                    For Brands
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
