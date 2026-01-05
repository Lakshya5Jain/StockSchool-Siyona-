import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Sparkles, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tutor`;

const suggestedQuestions = [
  "What is a stock?",
  "Why do stock prices go up and down?",
  "What is an ETF?",
  "How does diversification help?",
];

export function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your StockSchool AI tutor. 👋 I'm here to help you understand how the stock market works. Ask me anything about stocks, companies, ETFs, or investing concepts. What would you like to learn about today?",
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

  const streamChat = async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (resp.status === 429) {
      throw new Error("Too many requests. Please wait a moment.");
    }
    if (resp.status === 402) {
      throw new Error("Service temporarily unavailable.");
    }
    if (!resp.ok || !resp.body) {
      throw new Error("Failed to connect to AI tutor");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1) {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMsg: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages.slice(1)); // Skip initial greeting
    } catch (error) {
      console.error("AI tutor error:", error);
      toast({
        title: "Oops!",
        description: error instanceof Error ? error.message : "Something went wrong. Try again!",
        variant: "destructive",
      });
      // Remove the user message if streaming failed before any response
      setMessages((prev) => {
        const lastAssistant = prev.filter(m => m.role === "assistant").pop();
        if (lastAssistant && lastAssistant.content === messages[0].content) {
          return prev.slice(0, -1);
        }
        return prev;
      });
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

  return (
    <Card variant="highlighted" className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          AI Tutor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 p-4 pt-0">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-secondary-light text-secondary"
                      : "bg-primary-light text-primary"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2.5 max-w-[85%] ${
                    msg.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-2xl px-4 py-2.5 bg-muted">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 py-3">
            {suggestedQuestions.map((q) => (
              <Button
                key={q}
                variant="outline"
                size="sm"
                onClick={() => handleSend(q)}
                className="text-xs"
              >
                {q}
              </Button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 pt-3 border-t border-border mt-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about stocks..."
            className="min-h-[44px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
