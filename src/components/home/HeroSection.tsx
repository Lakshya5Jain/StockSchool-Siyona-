import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles, TrendingUp, PieChart, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/3 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-2 text-sm font-medium text-primary mb-8 animate-slide-up">
            <Sparkles className="h-4 w-4" />
            Educational Platform for Students
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up stagger-1">
            Learn How Markets Work
            <span className="block text-gradient-primary mt-2">Without Real Money</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up stagger-2">
            Discover stocks, ETFs, and smart investing concepts through interactive lessons and safe simulations. Built for curious middle school minds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-3">
            <Link to="/learn">
              <Button variant="hero" size="xl" className="group">
                <BookOpen className="h-5 w-5" />
                Start Learning
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/simulator">
              <Button variant="hero-secondary" size="xl">
                <TrendingUp className="h-5 w-5" />
                Try Simulator
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-slide-up stagger-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-success" />
              <span>No Real Money</span>
            </div>
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              <span>Fictional Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              <span>Age-Appropriate</span>
            </div>
          </div>
        </div>

        {/* Floating Cards Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <FeaturePreview
            icon={BookOpen}
            title="Learn Concepts"
            description="AI explains stocks, ETFs, and diversification using fun analogies"
            color="primary"
            delay="stagger-2"
          />
          <FeaturePreview
            icon={TrendingUp}
            title="Simulate Markets"
            description="Practice with virtual tokens and fictional companies"
            color="secondary"
            delay="stagger-3"
          />
          <FeaturePreview
            icon={Sparkles}
            title="Get Feedback"
            description="AI reflects on your decisions and helps you improve"
            color="accent"
            delay="stagger-4"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturePreview({ 
  icon: Icon, 
  title, 
  description, 
  color,
  delay
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  color: "primary" | "secondary" | "accent";
  delay: string;
}) {
  const colorClasses = {
    primary: "bg-primary-light text-primary border-primary/20",
    secondary: "bg-secondary-light text-secondary border-secondary/20",
    accent: "bg-accent-light text-accent border-accent/20",
  };

  return (
    <div className={`group rounded-2xl bg-card border shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up ${delay}`}>
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[color]} mb-4 transition-transform group-hover:scale-110`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
