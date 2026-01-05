import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, XCircle, CheckCircle2, Lightbulb, TrendingUp, Clock, Building2 } from "lucide-react";

const commonMistakes = [
  {
    icon: TrendingUp,
    mistake: "High price means better company",
    reality: "A stock's price doesn't tell you if a company is good or valuable. A $10 stock could be a better investment than a $1,000 stock!",
    explanation: "Price depends on how many shares exist. A pizza cut into 8 slices costs less per slice than one cut into 4 slices — but it's the same pizza!",
    tip: "Look at market cap (total value) instead of just the stock price.",
  },
  {
    icon: Building2,
    mistake: "One company is safer than many",
    reality: "Putting all your money in one company is actually riskier! If that company has problems, you lose everything.",
    explanation: "Imagine only having one friend — if they're busy, you have no one to hang out with. Having multiple friends means you always have options!",
    tip: "Diversification (spreading investments) helps reduce risk.",
  },
  {
    icon: Clock,
    mistake: "Short-term results mean success",
    reality: "Just because something went up last week doesn't mean it will keep going up. Markets change all the time!",
    explanation: "If your sports team won yesterday, does that guarantee they'll win tomorrow? Past results don't predict the future.",
    tip: "Think long-term and focus on understanding, not quick wins.",
  },
  {
    icon: TrendingUp,
    mistake: "You need to 'beat' the market",
    reality: "Professional investors often can't beat simple index funds. Learning is more important than winning.",
    explanation: "Even experts who study markets all day often get it wrong. The goal is to learn how things work, not to get rich quick.",
    tip: "Focus on understanding concepts, not picking winners.",
  },
  {
    icon: Building2,
    mistake: "Popular companies are always good investments",
    reality: "A company you love using might not be a smart investment. Being popular and being undervalued are different things.",
    explanation: "You might love a pizza shop, but if everyone already knows it's great, its stock might be expensive!",
    tip: "Separate what you like as a customer from what's a good investment.",
  },
  {
    icon: Clock,
    mistake: "News always tells you what to do",
    reality: "By the time news reaches you, investors have usually already acted. Headlines can be misleading.",
    explanation: "If everyone reads the same news and acts the same way, the opportunity is already gone.",
    tip: "Use news to learn and understand, not to make quick decisions.",
  },
];

const Mistakes = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-warning-light to-background py-12 md:py-16">
          <div className="container">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-warning/10 border border-warning/20 px-4 py-2 text-sm font-medium text-warning mb-4">
                <AlertTriangle className="h-4 w-4" />
                Learn From Others
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Common Mistakes to Avoid
              </h1>
              <p className="text-lg text-muted-foreground">
                Even smart people make these mistakes when learning about markets. 
                Understanding these misconceptions will make you a better learner!
              </p>
            </div>
          </div>
        </section>

        {/* Mistakes Grid */}
        <section className="py-12">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2">
              {commonMistakes.map((item, index) => (
                <MistakeCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <Card variant="highlighted" className="max-w-3xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-success-light text-success">
                    <Lightbulb className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground mb-3">
                      The Key Takeaway
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Understanding how markets work is more valuable than trying to "win" at investing. 
                      The best investors aren't the ones who get lucky — they're the ones who understand 
                      risk, diversification, and long-term thinking. Focus on learning, ask questions, 
                      and don't believe everything sounds too good to be true!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

function MistakeCard({ item, index }: { item: typeof commonMistakes[0]; index: number }) {
  const Icon = item.icon;

  return (
    <Card className="overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardHeader className="bg-destructive/5 border-b border-destructive/10">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-lg text-destructive">
              "{item.mistake}"
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Reality */}
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm text-success mb-1">Reality:</p>
            <p className="text-foreground">{item.reality}</p>
          </div>
        </div>

        {/* Explanation */}
        <div className="rounded-xl bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Think of it this way:</strong> {item.explanation}
          </p>
        </div>

        {/* Tip */}
        <div className="flex items-start gap-2">
          <Lightbulb className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
          <p className="text-sm font-medium text-foreground">
            <span className="text-secondary">Tip:</span> {item.tip}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Mistakes;
