import { Shield, AlertCircle, Heart, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function SafetyBanner() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="rounded-3xl bg-gradient-to-br from-primary-light via-card to-secondary-light border border-border p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-success-light text-success mb-6">
              <Shield className="h-8 w-8" />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Safe Learning
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              MarketMinds is designed specifically for middle school students to learn about markets in a safe, educational environment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <SafetyPoint
                icon={AlertCircle}
                title="No Real Money"
                description="Virtual tokens only — no financial risk"
              />
              <SafetyPoint
                icon={Heart}
                title="No Financial Advice"
                description="Educational content, not investment tips"
              />
              <SafetyPoint
                icon={GraduationCap}
                title="Age-Appropriate"
                description="Content designed for young learners"
              />
            </div>

            <Link to="/safety">
              <Button variant="outline" className="gap-2">
                <Shield className="h-4 w-4" />
                Learn More About Safety
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SafetyPoint({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-card shadow-sm mb-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
