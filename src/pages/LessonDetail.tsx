import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, TrendingUp, PieChart, Scale, Brain,
  ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Send, 
  Lightbulb, MessageCircle, Wallet, BarChart3, Shield, Clock
} from "lucide-react";
import { LessonQuiz, QuizQuestion } from "@/components/learn/LessonQuiz";

const lessonsContent: Record<string, {
  icon: React.ElementType;
  title: string;
  color: string;
  sections: { title: string; content: string; analogy?: string }[];
  checkQuestion: { question: string; hint: string };
  quiz: QuizQuestion[];
}> = {
  company: {
    icon: Building2,
    title: "What is a Company?",
    color: "primary",
    sections: [
      {
        title: "Companies Create Value",
        content: "A company is a group of people working together to create something valuable — like products or services that people want to buy. When a company makes something people need, they're willing to pay for it!",
        analogy: "Think of a lemonade stand. You buy lemons, sugar, and cups. You mix them to create lemonade. People walking by want refreshing drinks, so they pay you for your lemonade. You've created value by turning simple ingredients into something people want!"
      },
      {
        title: "How Companies Make Money",
        content: "Companies earn money (called revenue) when customers buy their products or services. But they also have costs — like paying employees, buying materials, and renting buildings. The money left over after paying all costs is called profit.",
        analogy: "Back to the lemonade stand: if you sell 20 cups for $1 each, you earn $20. But you spent $5 on lemons and sugar. Your profit is $15 — that's what you actually get to keep!"
      },
      {
        title: "Why Companies Matter",
        content: "Companies are important because they create jobs, make products we use every day, and drive innovation. From the phone in your pocket to the food at your grocery store — companies made all of it!",
      }
    ],
    checkQuestion: {
      question: "If a company sells 100 products for $10 each but spends $500 on materials and $200 on other costs, is the company making a profit? Explain your thinking.",
      hint: "Try calculating total revenue (how much they earned) first, then subtract all costs."
    },
    quiz: [
      {
        id: "c1",
        question: "What is the money a company earns from selling products called?",
        options: ["Profit", "Revenue", "Expenses", "Value"],
        correctAnswer: 1,
        explanation: "Revenue is the total money earned from sales. Profit is what's left after subtracting costs from revenue."
      },
      {
        id: "c2",
        question: "If a lemonade stand sells 50 cups at $2 each and spends $30 on supplies, what's the profit?",
        options: ["$50", "$70", "$100", "$30"],
        correctAnswer: 1,
        explanation: "Revenue = 50 × $2 = $100. Profit = $100 - $30 = $70. Great math!"
      },
      {
        id: "c3",
        question: "Why do companies exist?",
        options: ["Only to make owners rich", "To create value by making products or services people want", "Just to give people jobs", "Because the government requires them"],
        correctAnswer: 1,
        explanation: "Companies create value by providing products or services that people need. Jobs and profits are results of successfully creating value."
      }
    ]
  },
  stock: {
    icon: TrendingUp,
    title: "What is a Stock?",
    color: "secondary",
    sections: [
      {
        title: "Owning a Piece of a Company",
        content: "A stock represents a tiny piece of ownership in a company. When you own a stock, you own a small fraction of everything that company has — its buildings, products, ideas, and profits!",
        analogy: "Imagine if you and 99 friends bought a pizza shop together. Each of you would own 1% of the shop. When the shop makes money, you get 1% of the profits. A stock works the same way, but with much smaller pieces!"
      },
      {
        title: "Why Stock Prices Change",
        content: "Stock prices go up when more people want to buy than sell — and down when more people want to sell than buy. If people think a company will do well in the future, they want to own part of it, so the price goes up.",
        analogy: "Think of trading cards. If everyone wants a rare card, its price goes up because it's in demand. If a card becomes less popular, its price drops. Stock prices work the same way!"
      },
      {
        title: "Stocks Are Not the Company",
        content: "Here's something important: a stock's price isn't the same as how good a company is. A $10 stock isn't worse than a $100 stock. The price depends on how many pieces the company is divided into!",
      }
    ],
    checkQuestion: {
      question: "Why might a stock price go up even if the company hasn't changed anything recently?",
      hint: "Think about what causes prices to change — it's about what people believe will happen, not just what's happening now."
    },
    quiz: [
      {
        id: "s1",
        question: "What does owning a stock mean?",
        options: ["You work for the company", "You own a small piece of the company", "You can control the company", "You loaned money to the company"],
        correctAnswer: 1,
        explanation: "A stock represents ownership. When you buy a stock, you become a partial owner of that company!"
      },
      {
        id: "s2",
        question: "What makes a stock price go up?",
        options: ["The company paints its building", "More people want to buy the stock than sell it", "The CEO gets a raise", "Nothing — stock prices never change"],
        correctAnswer: 1,
        explanation: "Stock prices are driven by supply and demand. When more people want to buy, prices rise!"
      },
      {
        id: "s3",
        question: "A $50 stock is always better than a $10 stock. True or false?",
        options: ["True — higher price means better company", "False — price depends on how many shares exist", "True — expensive things are always better", "False — lower prices are always better"],
        correctAnswer: 1,
        explanation: "Stock price alone doesn't tell you if a company is good. It depends on how many shares exist and what the company is worth in total."
      }
    ]
  },
  marketcap: {
    icon: PieChart,
    title: "What is Market Cap?",
    color: "accent",
    sections: [
      {
        title: "Measuring a Company's Total Value",
        content: "Market cap (short for market capitalization) tells you the total value of a company based on its stock price. It's calculated by multiplying the stock price by the total number of shares.",
        analogy: "If that pizza shop is divided into 1,000 shares and each share is worth $10, the whole shop is worth $10,000. That's the market cap!"
      },
      {
        title: "Why Price Alone Is Misleading",
        content: "A company with a $500 stock price might be worth less than a company with a $50 stock price! It all depends on how many shares exist. Market cap helps you compare companies fairly.",
        analogy: "Two pizzas cost the same — $12 each. One is cut into 6 slices ($2 per slice) and one is cut into 12 slices ($1 per slice). The price per slice is different, but the total pizza value is the same!"
      },
      {
        title: "Big, Medium, and Small Companies",
        content: "We often describe companies by their market cap: 'large-cap' companies are worth over $10 billion, 'mid-cap' companies are $2-10 billion, and 'small-cap' companies are under $2 billion.",
      }
    ],
    checkQuestion: {
      question: "Company A has 1,000 shares at $50 each. Company B has 10,000 shares at $10 each. Which company is worth more? Show your work!",
      hint: "Calculate the market cap for each company by multiplying shares × price."
    },
    quiz: [
      {
        id: "m1",
        question: "How do you calculate market cap?",
        options: ["Revenue minus costs", "Stock price × number of shares", "Number of employees × salary", "Company age × profit"],
        correctAnswer: 1,
        explanation: "Market cap = stock price × total shares outstanding. It tells you the total market value of a company."
      },
      {
        id: "m2",
        question: "Company A: 500 shares at $20 each. Company B: 1000 shares at $8 each. Which is worth more?",
        options: ["Company A ($10,000)", "Company B ($8,000)", "They're equal", "Can't tell from this info"],
        correctAnswer: 0,
        explanation: "Company A: 500 × $20 = $10,000. Company B: 1000 × $8 = $8,000. Company A has a higher market cap!"
      },
      {
        id: "m3",
        question: "A 'large-cap' company is worth at least:",
        options: ["$1 million", "$100 million", "$1 billion", "$10 billion"],
        correctAnswer: 3,
        explanation: "Large-cap companies are worth over $10 billion. These are often household names you'd recognize!"
      }
    ]
  },
  diversification: {
    icon: Scale,
    title: "What is Diversification?",
    color: "success",
    sections: [
      {
        title: "Don't Put All Eggs in One Basket",
        content: "Diversification means spreading your investments across different companies, industries, or types of assets. The idea is simple: if one investment goes down, others might go up, balancing out your overall results.",
        analogy: "Imagine carrying eggs to your kitchen. If you put all 12 eggs in one basket and drop it — you lose everything! But if you use 4 baskets with 3 eggs each, dropping one basket only loses 3 eggs."
      },
      {
        title: "How Diversification Protects You",
        content: "Different companies and industries face different challenges. A tech company might struggle when a food company thrives. By owning both, you're protected no matter what happens to either one.",
        analogy: "Think about having different friends for different activities. Your soccer friend might be busy, but your movie friend is free. Diversification in friendships means you always have someone to hang out with!"
      },
      {
        title: "The Trade-off",
        content: "Here's the honest truth: diversification also means you might miss out on big gains. If you only owned the one stock that went up 100%, you'd be rich! But you'd also be at risk if it went down 100%. Diversification trades huge wins for more stability.",
      }
    ],
    checkQuestion: {
      question: "If you could only invest in 3 companies, would you pick 3 tech companies or 1 tech, 1 food, and 1 healthcare company? Explain why.",
      hint: "Think about what happens if the tech industry has a bad year."
    },
    quiz: [
      {
        id: "d1",
        question: "What does diversification mean in investing?",
        options: ["Buying only one stock you really like", "Spreading investments across different companies/industries", "Selling all your investments", "Only investing in big companies"],
        correctAnswer: 1,
        explanation: "Diversification means spreading out your investments so you don't lose everything if one goes down."
      },
      {
        id: "d2",
        question: "Why is diversification sometimes called 'not putting all eggs in one basket'?",
        options: ["Because eggs are a good investment", "Because if you drop one basket, you don't lose everything", "Because baskets are expensive", "Because eggs represent money"],
        correctAnswer: 1,
        explanation: "If all your eggs (investments) are in one basket (company) and you drop it, you lose everything. Spreading them out protects you!"
      },
      {
        id: "d3",
        question: "What's a downside of diversification?",
        options: ["It's too expensive", "You might miss out on big gains from one winner", "It's illegal", "It always loses money"],
        correctAnswer: 1,
        explanation: "While diversification protects you from big losses, it also means you won't get huge gains if one stock does extremely well."
      }
    ]
  },
  etf: {
    icon: Brain,
    title: "What is an ETF?",
    color: "warning",
    sections: [
      {
        title: "A Bundle of Stocks",
        content: "ETF stands for Exchange-Traded Fund. Think of it as a basket that holds many different stocks. When you buy one share of an ETF, you're actually buying tiny pieces of all the companies inside it!",
        analogy: "It's like buying a variety pack of candy instead of individual bars. One purchase gives you a taste of everything — chocolate, gummy bears, lollipops — without having to buy each one separately!"
      },
      {
        title: "Instant Diversification",
        content: "ETFs make diversification easy. Instead of buying 500 different stocks yourself, you can buy one S&P 500 ETF that holds all 500 for you. This saves time, effort, and often money.",
        analogy: "Imagine trying to bake a cake from scratch — buying flour, eggs, sugar separately. Or you could buy a cake mix that has everything measured and ready. ETFs are like the cake mix of investing!"
      },
      {
        title: "Different Types of ETFs",
        content: "There are ETFs for almost everything: tech companies, healthcare, international stocks, even specific themes like clean energy. Each ETF follows a specific strategy or group of companies.",
      }
    ],
    checkQuestion: {
      question: "Why might someone choose to buy an ETF instead of picking individual stocks themselves?",
      hint: "Think about time, effort, risk, and diversification."
    },
    quiz: [
      {
        id: "e1",
        question: "What does ETF stand for?",
        options: ["Easy Trading Fund", "Exchange-Traded Fund", "Electronic Transfer Fee", "Every Transaction Free"],
        correctAnswer: 1,
        explanation: "ETF stands for Exchange-Traded Fund — a fund you can buy and sell on stock exchanges."
      },
      {
        id: "e2",
        question: "How does an ETF provide diversification?",
        options: ["By only holding one stock", "By holding many different stocks in one package", "By trading very fast", "By being expensive"],
        correctAnswer: 1,
        explanation: "An ETF holds many stocks, so buying one ETF share gives you exposure to all of them at once!"
      },
      {
        id: "e3",
        question: "An S&P 500 ETF holds stocks from how many companies?",
        options: ["5", "50", "500", "5000"],
        correctAnswer: 2,
        explanation: "The S&P 500 is an index of 500 large US companies. An S&P 500 ETF holds all of them!"
      }
    ]
  },
  // New lessons
  risk: {
    icon: Shield,
    title: "Understanding Risk",
    color: "destructive",
    sections: [
      {
        title: "What is Investment Risk?",
        content: "Risk means the chance that you could lose some or all of your money. Every investment has some level of risk — even keeping cash under your mattress (it could get stolen or lose value to inflation).",
        analogy: "Think of riding a bike. Going slow on a flat path is low risk — you probably won't fall. Racing downhill is high risk — exciting, but you might crash! Investing works the same way."
      },
      {
        title: "Risk and Reward Are Connected",
        content: "Generally, higher risk investments have the potential for higher rewards, but also bigger losses. Lower risk investments are safer but usually grow more slowly. This is called the risk-reward trade-off.",
        analogy: "It's like carnival games. The easy game gives small prizes. The hard game could win you a giant teddy bear — or nothing at all!"
      },
      {
        title: "Managing Your Risk",
        content: "Smart investors don't avoid risk completely — they manage it. This means understanding how much risk you can handle, diversifying your investments, and not investing money you'll need soon.",
      }
    ],
    checkQuestion: {
      question: "Why would someone choose a lower-risk investment even if it grows more slowly?",
      hint: "Think about when someone might need their money back."
    },
    quiz: [
      {
        id: "r1",
        question: "What does 'risk' mean in investing?",
        options: ["Guaranteed profit", "The chance you could lose money", "A type of stock", "A trading strategy"],
        correctAnswer: 1,
        explanation: "Risk is the possibility that you could lose some or all of your investment."
      },
      {
        id: "r2",
        question: "What is the risk-reward trade-off?",
        options: ["You can eliminate all risk", "Higher risk usually means potential for higher rewards (and losses)", "Low risk gives high rewards", "Risk and reward aren't connected"],
        correctAnswer: 1,
        explanation: "Higher risk investments can give bigger gains, but also bigger losses. It's a trade-off!"
      },
      {
        id: "r3",
        question: "Which is generally considered lower risk?",
        options: ["A single small company stock", "Government bonds", "Cryptocurrency", "A startup investment"],
        correctAnswer: 1,
        explanation: "Government bonds are backed by the government and are considered very low risk compared to individual stocks or crypto."
      }
    ]
  },
  compound: {
    icon: Clock,
    title: "The Magic of Compound Growth",
    color: "accent",
    sections: [
      {
        title: "What is Compound Growth?",
        content: "Compound growth is when you earn returns not just on your original investment, but also on the returns you've already earned. It's like a snowball rolling downhill — it gets bigger and bigger!",
        analogy: "Imagine you plant one apple tree. It gives you 10 apples. You plant seeds from those apples and get 10 more trees. Now you have 11 trees giving you 110 apples! That's compounding."
      },
      {
        title: "Time is Your Superpower",
        content: "The longer you invest, the more time compound growth has to work its magic. Starting early — even with small amounts — can lead to amazing results over decades.",
        analogy: "If you fold a piece of paper in half 42 times (theoretically), it would reach the moon! Each fold doubles the thickness. That's the power of compounding over time."
      },
      {
        title: "The Rule of 72",
        content: "Want to know how long it takes to double your money? Divide 72 by your annual return percentage. If you earn 8% per year, it takes about 9 years to double (72 ÷ 8 = 9).",
      }
    ],
    checkQuestion: {
      question: "Why is it better to start investing at age 20 than age 40, even if you invest the same total amount?",
      hint: "Think about how long compound growth has to work in each case."
    },
    quiz: [
      {
        id: "cg1",
        question: "What makes compound growth special?",
        options: ["You only earn on your original investment", "You earn returns on your returns", "It only works with large amounts", "It's the same as simple interest"],
        correctAnswer: 1,
        explanation: "Compound growth means earning returns on both your original investment AND your previous returns!"
      },
      {
        id: "cg2",
        question: "According to the Rule of 72, if you earn 6% per year, how long to double your money?",
        options: ["6 years", "12 years", "18 years", "72 years"],
        correctAnswer: 1,
        explanation: "72 ÷ 6 = 12 years. The Rule of 72 is a quick way to estimate doubling time!"
      },
      {
        id: "cg3",
        question: "Who benefits more from compound growth?",
        options: ["Someone who invests $1000 at age 40", "Someone who invests $1000 at age 20", "Both benefit equally", "Neither benefits from compounding"],
        correctAnswer: 1,
        explanation: "Starting at 20 gives 20 extra years for compound growth to work! Time is the secret ingredient."
      }
    ]
  },
  savings: {
    icon: Wallet,
    title: "Saving vs. Investing",
    color: "success",
    sections: [
      {
        title: "What's the Difference?",
        content: "Saving means putting money aside in a safe place, like a bank account. Investing means using money to buy things (like stocks) that might grow in value. Both are important, but they serve different purposes.",
        analogy: "Saving is like storing food in your refrigerator — it's safe and ready when you need it. Investing is like planting a garden — it takes time, has some risk, but could give you much more food later!"
      },
      {
        title: "When to Save",
        content: "Save money you'll need soon — like for an emergency fund, a vacation, or something you're planning to buy within a few years. Savings accounts are safe but don't grow much.",
        analogy: "Keep your umbrella savings handy for rainy days. You wouldn't want your emergency money locked up in something risky!"
      },
      {
        title: "When to Invest",
        content: "Invest money you won't need for many years — like for retirement or long-term goals. Investing has more risk, but over long periods, it historically grows more than savings accounts.",
      }
    ],
    checkQuestion: {
      question: "Should your emergency fund be in savings or investments? Why?",
      hint: "Think about when you might need emergency money and how quickly you'd need access to it."
    },
    quiz: [
      {
        id: "sv1",
        question: "What's the main difference between saving and investing?",
        options: ["There is no difference", "Saving is safer but grows slowly; investing has risk but can grow more", "Saving always loses money", "Investing is completely safe"],
        correctAnswer: 1,
        explanation: "Saving is low risk/low reward. Investing has more risk but potential for higher growth over time."
      },
      {
        id: "sv2",
        question: "Where should you keep money you need for an emergency?",
        options: ["All in stocks", "In a savings account", "Under your bed", "In cryptocurrency"],
        correctAnswer: 1,
        explanation: "Emergency funds should be easily accessible and safe — a savings account is perfect for this!"
      },
      {
        id: "sv3",
        question: "Money for retirement (30+ years away) is best:",
        options: ["Kept in cash", "Invested for growth", "Spent now", "Hidden in a safe"],
        correctAnswer: 1,
        explanation: "Long-term money benefits from investing because you have time to ride out ups and downs and let compound growth work."
      }
    ]
  },
  news: {
    icon: BarChart3,
    title: "How News Affects Stocks",
    color: "secondary",
    sections: [
      {
        title: "News Moves Markets",
        content: "Stock prices often change based on news. Good news about a company (strong sales, new products) usually makes its stock price rise. Bad news (lawsuits, falling sales) often makes prices fall.",
        analogy: "It's like your favorite sports team. When they win, more people want team merchandise. When they lose, interest drops. Companies work similarly!"
      },
      {
        title: "Not All News is Equal",
        content: "Some news is more important than others. Earnings reports (how much money a company made) are major events. A CEO leaving is big news. A small lawsuit might barely move the stock.",
        analogy: "Getting an A on a pop quiz is nice, but getting an A on the final exam matters much more for your grade!"
      },
      {
        title: "The Market Already Knows",
        content: "Often, stock prices move BEFORE news is officially announced because investors predict what might happen. When the news comes out, the price might not move much if it was expected.",
      }
    ],
    checkQuestion: {
      question: "If everyone expects a company to report great earnings and they do, why might the stock price not go up?",
      hint: "Think about whether the good news was already 'priced in' to the stock."
    },
    quiz: [
      {
        id: "n1",
        question: "A company announces record sales. What usually happens to its stock?",
        options: ["Price goes down", "Price goes up", "Price never changes from news", "The company closes"],
        correctAnswer: 1,
        explanation: "Good news like record sales usually makes more people want to own the stock, pushing the price up!"
      },
      {
        id: "n2",
        question: "Why might a stock not rise after good news is announced?",
        options: ["Good news never helps", "Investors already expected it (it was 'priced in')", "News doesn't affect stocks", "The market was closed"],
        correctAnswer: 1,
        explanation: "If everyone already expected good news, the price rose before the announcement. No surprise = no new price movement."
      },
      {
        id: "n3",
        question: "Which news would likely impact a stock price the most?",
        options: ["The CEO's birthday", "The company's quarterly earnings report", "A small employee promotion", "The company's logo color change"],
        correctAnswer: 1,
        explanation: "Earnings reports show how much money a company made — that's crucial information that moves stock prices!"
      }
    ]
  }
};

const LessonDetail = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const lesson = lessonId ? lessonsContent[lessonId] : null;

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
            <Link to="/learn">
              <Button>Back to Lessons</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = lesson.icon;
  const section = lesson.sections[currentSection];
  const isLastSection = currentSection === lesson.sections.length - 1;

  const colorClasses: Record<string, string> = {
    primary: "bg-primary-light text-primary",
    secondary: "bg-secondary-light text-secondary",
    accent: "bg-accent-lighter text-accent",
    success: "bg-success-light text-success",
    warning: "bg-warning-light text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setFeedback(
        "Great thinking! You're on the right track. The key insight here is understanding the relationship between " +
        "the concepts we discussed. Keep asking 'why' questions — that's how real learning happens! " +
        "Now let's test your knowledge with a quick quiz."
      );
      setIsSubmitting(false);
    }, 1500);
  };

  const handleQuizComplete = () => {
    setQuizComplete(true);
    setShowQuiz(false);
  };

  // Determine which lessons are available
  const lessonIds = Object.keys(lessonsContent);
  const currentIndex = lessonIds.indexOf(lessonId || "");
  const nextLessonId = currentIndex < lessonIds.length - 1 ? lessonIds[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Progress Bar */}
        <div className="border-b border-border bg-card">
          <div className="container py-4">
            <div className="flex items-center justify-between mb-2">
              <Link to="/learn" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Lessons
              </Link>
              <span className="text-sm text-muted-foreground">
                {showQuiz ? "Quiz" : showQuestion ? "Concept Check" : `Part ${currentSection + 1} of ${lesson.sections.length}`}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ 
                  width: showQuiz || quizComplete
                    ? '100%' 
                    : showQuestion 
                      ? '85%' 
                      : `${((currentSection + 1) / (lesson.sections.length + 2)) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <section className="py-12">
          <div className="container max-w-3xl">
            {showQuiz ? (
              <div className="animate-slide-up">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colorClasses[lesson.color]}`}>
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Knowledge Check</p>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      Quiz Time!
                    </h1>
                  </div>
                </div>
                <LessonQuiz 
                  questions={lesson.quiz} 
                  lessonTitle={lesson.title}
                  onComplete={handleQuizComplete}
                />
              </div>
            ) : quizComplete ? (
              <div className="animate-slide-up text-center py-12">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success/20 mb-6">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Lesson Complete! 🎉
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  You've finished "{lesson.title}"! Ready to learn more or practice in the simulator?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/learn">
                    <Button variant="outline" size="lg">
                      <ArrowLeft className="h-5 w-5" />
                      All Lessons
                    </Button>
                  </Link>
                  {nextLessonId && (
                    <Link to={`/learn/${nextLessonId}`} onClick={() => {
                      setCurrentSection(0);
                      setShowQuestion(false);
                      setShowQuiz(false);
                      setAnswer("");
                      setFeedback(null);
                      setQuizComplete(false);
                    }}>
                      <Button variant="hero" size="lg" className="group">
                        Next Lesson
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  )}
                  {!nextLessonId && (
                    <Link to="/simulator">
                      <Button variant="hero" size="lg" className="group">
                        Try the Simulator
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ) : !showQuestion ? (
              <div className="animate-slide-up">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colorClasses[lesson.color]}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{lesson.title}</p>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      {section.title}
                    </h1>
                  </div>
                </div>

                {/* Content */}
                <Card className="mb-6">
                  <CardContent className="p-8">
                    <p className="text-lg text-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>

                {/* Analogy */}
                {section.analogy && (
                  <Card variant="highlighted" className="mb-8 border-2 border-secondary/30">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-lighter flex-shrink-0">
                          <Lightbulb className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Think of it this way...</h3>
                          <p className="text-muted-foreground leading-relaxed">{section.analogy}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(prev => prev - 1)}
                    disabled={currentSection === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  {isLastSection ? (
                    <Button variant="hero" onClick={() => setShowQuestion(true)} className="group">
                      <CheckCircle2 className="h-5 w-5" />
                      Check Understanding
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  ) : (
                    <Button variant="hero" onClick={() => setCurrentSection(prev => prev + 1)} className="group">
                      Continue
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="animate-slide-up">
                {/* Question Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-lighter">
                    <MessageCircle className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Concept Check</p>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      Let's Think Together
                    </h1>
                  </div>
                </div>

                {/* Question Card */}
                <Card className="mb-6">
                  <CardContent className="p-8">
                    <p className="text-lg text-foreground leading-relaxed mb-6">
                      {lesson.checkQuestion.question}
                    </p>
                    
                    <div className="rounded-xl bg-muted/50 p-4 mb-6">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">💡 Hint:</strong> {lesson.checkQuestion.hint}
                      </p>
                    </div>

                    <Textarea
                      placeholder="Type your answer here... Don't worry about being perfect — explain your thinking!"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="min-h-[120px] mb-4"
                      disabled={!!feedback}
                    />

                    {!feedback && (
                      <Button 
                        variant="hero" 
                        onClick={handleSubmitAnswer}
                        disabled={!answer.trim() || isSubmitting}
                        className="w-full group"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Thinking...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Submit Answer
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* AI Feedback */}
                {feedback && (
                  <Card variant="highlighted" className="mb-8 border-2 border-success/30 animate-scale-in">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-light flex-shrink-0">
                          <Sparkles className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-success mb-2">Nice work! 🎉</h3>
                          <p className="text-muted-foreground leading-relaxed">{feedback}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Take Quiz Button */}
                {feedback && (
                  <div className="flex justify-center animate-slide-up">
                    <Button variant="hero" size="lg" onClick={() => setShowQuiz(true)} className="group">
                      Take the Quiz
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LessonDetail;
