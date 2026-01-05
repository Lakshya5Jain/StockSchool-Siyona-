import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, AlertCircle, Heart, GraduationCap, 
  Lock, Users, BookOpen, CheckCircle2, XCircle 
} from "lucide-react";

const Safety = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-success-light to-background py-12 md:py-16">
          <div className="container">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-success/10 border border-success/20 px-4 py-2 text-sm font-medium text-success mb-4">
                <Shield className="h-4 w-4" />
                Your Safety Matters
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Safety & Ethics
              </h1>
              <p className="text-lg text-muted-foreground">
                MarketMinds is built with student safety as our top priority. 
                Learn about how we keep you safe while you learn about markets.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Key Principles */}
              <div className="grid gap-6 md:grid-cols-2">
                <SafetyCard
                  icon={AlertCircle}
                  title="No Real Money"
                  description="Everything on MarketMinds uses virtual tokens. You cannot deposit, withdraw, or risk any real money. This is purely educational."
                  color="warning"
                />
                <SafetyCard
                  icon={Heart}
                  title="No Financial Advice"
                  description="We teach concepts, not investment tips. MarketMinds never recommends specific stocks or tells you what to buy or sell."
                  color="destructive"
                />
                <SafetyCard
                  icon={GraduationCap}
                  title="Age-Appropriate Content"
                  description="All content is designed for middle school students. We use simple language, fun examples, and focus on understanding."
                  color="primary"
                />
                <SafetyCard
                  icon={Lock}
                  title="Privacy Protected"
                  description="We don't collect personal financial information. Your learning journey stays private and secure."
                  color="success"
                />
              </div>

              {/* What We Do / Don't Do */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-success/30">
                  <CardHeader className="bg-success-light border-b border-success/20">
                    <CardTitle className="flex items-center gap-2 text-success">
                      <CheckCircle2 className="h-5 w-5" />
                      What We Do
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {[
                        "Teach market concepts with fun analogies",
                        "Use fictional companies for simulations",
                        "Provide virtual tokens for practice",
                        "Explain why diversification reduces risk",
                        "Encourage critical thinking",
                        "Focus on long-term understanding",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-destructive/30">
                  <CardHeader className="bg-destructive/5 border-b border-destructive/20">
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <XCircle className="h-5 w-5" />
                      What We Never Do
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {[
                        "Recommend real stocks or investments",
                        "Use real company names in simulations",
                        "Encourage real investing for students",
                        "Create competitive leaderboards",
                        "Promote get-rich-quick thinking",
                        "Collect financial information",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* For Parents & Teachers */}
              <Card variant="highlighted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    For Parents & Teachers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    MarketMinds is designed to be used in educational settings and at home. 
                    Here's what you should know:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-muted/50 p-4">
                      <h4 className="font-semibold text-foreground mb-2">Supervised Learning</h4>
                      <p className="text-sm text-muted-foreground">
                        While MarketMinds is safe for independent use, we encourage adults to 
                        discuss concepts with students and reinforce that this is educational only.
                      </p>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-4">
                      <h4 className="font-semibold text-foreground mb-2">Classroom Ready</h4>
                      <p className="text-sm text-muted-foreground">
                        Teachers can use MarketMinds to introduce financial literacy concepts 
                        in a safe, engaging way without any real-world risk.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Disclaimer */}
              <Card className="border-2 border-warning/30 bg-warning-light">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning text-warning-foreground flex-shrink-0">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        Important Disclaimer
                      </h3>
                      <p className="text-muted-foreground">
                        MarketMinds is an educational platform designed to teach middle school students 
                        about market concepts. <strong>This is not a trading platform.</strong> We do not 
                        provide investment advice, and nothing on this platform should be considered a 
                        recommendation to buy, sell, or hold any securities. All simulations use 
                        fictional companies and virtual currency that has no real-world value. 
                        Always consult a qualified financial advisor for real investment decisions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <div className="text-center">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Questions or Concerns?
                </h3>
                <p className="text-muted-foreground">
                  If you have any questions about our safety practices or content, 
                  please reach out to your teacher or school administrator.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

function SafetyCard({ 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  color: "primary" | "success" | "warning" | "destructive";
}) {
  const colorClasses: Record<string, string> = {
    primary: "bg-primary-light text-primary",
    success: "bg-success-light text-success",
    warning: "bg-warning-light text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <Card variant="interactive">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[color]} flex-shrink-0`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Safety;
