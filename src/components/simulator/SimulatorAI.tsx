import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Sparkles, User, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

interface SimulatorAIProps {
  currentLevel: number;
  levelName: string;
  levelDescription: string;
  winConditions: any;
  maxDays: number;
  stocks: string[];
  showNews: boolean;
  showETF: boolean;
  currentDay?: number;
  portfolioValue?: number;
  allocations?: Record<string, number>;
  etfAllocation?: number;
  tradeCount?: number;
  maxDrawdown?: number;
  marketMood?: "bull" | "bear" | "sideways";
  newsInfluencedTrades?: number;
  minPortfolioValue?: number;
}

const getLevelSpecificGuidance = (level: number, winConditions: any): string => {
  switch (level) {
    case 1:
      return `Learning Objective: Understand basic market mechanics. The market has a slight upward bias to help you learn. Think about: What happens when you spread your money across multiple stocks vs putting it all in one?`;
    case 2:
      return `Learning Objective: Understand how information affects prices. Think about: When news says a company is doing well, what might happen to its stock price? How can you use this information?`;
    case 3:
      return `Learning Objective: Learn about risk management through diversification. Think about: What happens if you put all your money in one stock and it drops? How can spreading your investments help?`;
    case 4:
      return `Learning Objective: Learn patience and avoid overreacting. Think about: Is every piece of news worth acting on? What happens if you trade too frequently?`;
    case 5:
      return `Learning Objective: Learn to survive market crashes and preserve capital. Think about: What happens during a crash? Which stocks might be safer? You're limited to 3 trades per day - use them wisely.`;
    case 6:
      return `Learning Objective: Learn that consistency beats perfect timing. Think about: Is it better to make many trades trying to time the market, or fewer well-thought-out trades?`;
    case 7:
      return `Learning Objective: Understand true diversification across sectors. Think about: If all tech stocks drop together, is having 5 different tech stocks really diversified? What other sectors exist?`;
    case 8:
      return `Learning Objective: Learn to adapt strategy to market conditions. Think about: Should you use the same strategy in a bull market vs a bear market? How do you know what the market mood is?`;
    case 9:
      return `Learning Objective: Understand that big losses are hard to recover from. Think about: If you lose 50%, how much do you need to gain to break even? How can you protect against big drops?`;
    case 10:
      return `Learning Objective: Balance long-term conviction with flexibility. Think about: When should you hold a stock for a long time? When should you change your mind?`;
    case 11:
      return `Learning Objective: Recognize that "safe" investments aren't always optimal. Think about: What if the ETF underperforms? How can you tell? When might individual stocks be better?`;
    case 12:
      return `Learning Objective: Understand the power of compounding over time. Think about: What happens to small gains over 50 days? Does frequent trading help or hurt?`;
    default:
      return `Focus on understanding the concepts this level is teaching.`;
  }
};

export function SimulatorAI({
  currentLevel,
  levelName,
  levelDescription,
  winConditions,
  maxDays,
  stocks,
  showNews,
  showETF,
  currentDay = 0,
  portfolioValue,
  allocations = {},
  etfAllocation = 0,
  tradeCount = 0,
  maxDrawdown = 0,
  marketMood,
  newsInfluencedTrades = 0,
  minPortfolioValue,
}: SimulatorAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your Level ${currentLevel} tutor. 🎓\n\nI'm here to help you LEARN and understand this level, not just give you answers. I'll:\n- Guide you to think through problems\n- Explain concepts and strategies\n- Help you understand what each level is teaching\n- Walk through the level with you step-by-step\n\nWhat would you like to understand better about this level?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const messageText = input.trim();
    if (!messageText || isLoading) return;

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      toast({
        title: "API key not configured",
        description: "Please add VITE_OPENAI_API_KEY to your .env file",
        variant: "destructive",
      });
      return;
    }

    // Add user message
    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Build context about current level and progress
    const levelGuidance = getLevelSpecificGuidance(currentLevel, winConditions);
    const winConditionsText = JSON.stringify(winConditions, null, 2);
    
    const currentProgress = portfolioValue !== undefined 
      ? `Current portfolio value: $${portfolioValue.toLocaleString()}. Day ${currentDay} of ${maxDays}.`
      : `Day ${currentDay} of ${maxDays}.`;
    
    const allocationsText = Object.entries(allocations)
      .filter(([_, amount]) => amount > 0)
      .map(([id, amount]) => `${id}: $${amount.toLocaleString()}`)
      .join(", ") || "No allocations yet";
    
    const contextInfo = `
Level ${currentLevel}: ${levelName}
Description: ${levelDescription}
${levelGuidance}

Win Conditions: ${winConditionsText}

Available Stocks: ${stocks.join(", ")}
Has News: ${showNews ? "Yes" : "No"}
Has ETF: ${showETF ? "Yes" : "No"}
${currentProgress}
Current Allocations: ${allocationsText}
ETF Allocation: $${etfAllocation.toLocaleString()}
Total Trades: ${tradeCount}
${maxDrawdown > 0 ? `Max Drawdown: ${(maxDrawdown * 100).toFixed(1)}%` : ""}
${marketMood ? `Market Mood: ${marketMood.toUpperCase()}` : ""}
${newsInfluencedTrades > 0 ? `News-Influenced Trades: ${newsInfluencedTrades}` : ""}
${minPortfolioValue !== undefined ? `Minimum Portfolio Value: $${minPortfolioValue.toLocaleString()}` : ""}
`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a helpful, educational AI tutor for a stock market simulator game. Your primary goal is to ANSWER the user's questions directly and clearly, while also teaching them concepts.

IMPORTANT RULES:
1. ALWAYS answer the user's question directly - don't avoid it or give vague responses
2. If they ask "what is X?", explain what X is clearly
3. If they ask "how do I do Y?", explain the steps or approach
4. If they ask "why does Z happen?", explain the reasoning
5. After answering, you can add educational context to help them understand the concept
6. Be specific and actionable - give real guidance they can use
7. Don't just ask questions back - answer their question first, then guide if helpful

TEACHING APPROACH:
- Answer questions directly and clearly
- Explain concepts with examples
- Break down complex ideas into understandable parts
- Help them understand game mechanics when asked
- Guide them on strategy while explaining the reasoning
- Walk them through the level step-by-step when they need help

RESPONSE STYLE:
- Be direct and helpful (2-5 sentences typically)
- Answer the question first, then add educational context
- Use examples from the current level when relevant
- Be encouraging and supportive
- Explain WHY, not just WHAT

Current Level Context:
${contextInfo}

Example good responses:
- User: "What is diversification?" → "Diversification means spreading your investments across different stocks or sectors to reduce risk. If one stock drops, others might not, protecting your portfolio. In this level, you need to diversify across sectors (tech, finance, retail, healthcare) - not just different tech stocks."
- User: "How do I beat this level?" → "To beat this level, you need to reach $10,850 AND keep no single sector above 40% of your portfolio. Start by understanding which stocks belong to which sectors, then spread your $10,000 across multiple sectors. The key is true diversification - tech stocks often move together, so having 5 tech stocks isn't really diversified."
- User: "What does max sector mean?" → "Max sector refers to the largest percentage of your portfolio allocated to any single sector. For example, if you invest $4,000 in tech stocks and $6,000 in other sectors, your max sector is 40% (tech). This level requires you to keep that below 40%."

Remember: Answer their questions directly, then teach them the concepts!`,
            },
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            userMessage,
          ],
          temperature: 0.7,
          max_tokens: 400,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get response from AI assistant";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      // Remove the user message if there was an error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What is this level trying to teach me?",
    "How should I think about this level's goals?",
    "What does diversification mean?",
    "How do I approach this strategically?",
  ];

  return (
    <Card className="h-[500px] flex flex-col overflow-hidden">
      <CardHeader className="pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Level {currentLevel} Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 p-4 pt-0 min-h-0 overflow-hidden">
        {/* Messages */}
        <ScrollArea className="flex-1 min-h-0" ref={scrollRef}>
          <div className="space-y-4 pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2 break-words overflow-wrap-anywhere",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 shrink-0">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInput(question);
                  setTimeout(() => handleSend(), 100);
                }}
              >
                {question}
              </Button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 shrink-0">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about this level..."
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
