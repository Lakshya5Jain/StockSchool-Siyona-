import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles, TrendingUp, PieChart, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 video-mint-filter"
        >
          <source src="/stock-market-video.mp4" type="video/mp4" />
          <source src="/stock-market-video.webm" type="video/webm" />
        </video>
        {/* Overlay for better text readability and color harmony */}
        <div className="absolute inset-0 bg-white/40" />
        <div className="absolute inset-0 bg-accent-lighter/20" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-slide-up">
            Learn How Investing Works Through Lessons and Simulations
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 animate-slide-up stagger-1">
            Discover stocks, ETFs, and smart investing concepts through interactive lessons and safe simulations. Built for curious minds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up stagger-2">
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
        </div>

        {/* Floating Cards Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
          <FeaturePreview
            icon={BookOpen}
            title="Learn Concepts"
            description="AI explains stocks, ETFs, and diversification using fun analogies"
            color="primary"
            delay="stagger-1"
          />
          <FeaturePreview
            icon={TrendingUp}
            title="Simulate Markets"
            description="Practice with virtual tokens and fictional companies"
            color="secondary"
            delay="stagger-2"
          />
          <FeaturePreview
            icon={Sparkles}
            title="Get Feedback"
            description="AI reflects on your decisions and helps you improve"
            color="accent"
            delay="stagger-3"
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
  color?: "primary" | "secondary" | "accent";
  delay: string;
}) {
  return (
    <div className={`group rounded-lg bg-accent-lighter border-0 p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up ${delay}`}>
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-accent-dark mb-6 transition-transform group-hover:scale-110`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display font-semibold text-lg text-accent-dark mb-3">{title}</h3>
      <p className="text-sm text-accent-dark/80">{description}</p>
    </div>
  );
}
