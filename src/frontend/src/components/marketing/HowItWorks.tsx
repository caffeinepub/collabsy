import { CheckCircle2 } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps: Step[];
  title?: string;
}

export default function HowItWorks({ steps, title = "How It Works" }: HowItWorksProps) {
  return (
    <div className="marketing-section">
      <div className="marketing-content">
        <h2 className="marketing-heading text-center mb-16">{title}</h2>
        <div className="max-w-4xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-6 items-start group">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="hidden md:block flex-shrink-0 pt-3">
                <CheckCircle2 className="h-6 w-6 text-primary/40 group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
