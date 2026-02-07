import { Users, TrendingUp, Award } from 'lucide-react';

export default function SocialProofStrip() {
  return (
    <div className="marketing-section bg-accent/30">
      <div className="marketing-content">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold">2,500+</div>
            <div className="text-sm text-muted-foreground">Active Creators</div>
          </div>
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold">8,000+</div>
            <div className="text-sm text-muted-foreground">Successful Campaigns</div>
          </div>
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-3xl md:text-4xl font-bold">150+</div>
            <div className="text-sm text-muted-foreground">Trusted Brands</div>
          </div>
        </div>
      </div>
    </div>
  );
}
