import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface NewsItem {
  id: string;
  headline: string;
  description: string;
  impact: "positive" | "negative" | "neutral";
  affectedStocks: string[];
  day: number;
}

interface NewsSectionProps {
  news: NewsItem[];
  currentDay: number;
  isPreview?: boolean;
}

export function NewsSection({ news, currentDay, isPreview = false }: NewsSectionProps) {
  const visibleNews = isPreview ? news : news.filter((n) => n.day <= currentDay);

  return (
    <Card className={isPreview ? "border-2 border-secondary/30" : ""}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Newspaper className="h-5 w-5 text-primary" />
          {isPreview ? "Upcoming News (Read Before Investing!)" : "Market News"}
        </CardTitle>
        {isPreview && (
          <p className="text-xs text-muted-foreground mt-1">
            These news events will affect stock prices during the simulation. Use this to make smarter investment choices!
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
        {visibleNews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No news yet. Start the simulation to see market updates!
          </p>
        ) : (
          visibleNews.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg border p-3 transition-colors ${
                item.impact === "positive"
                  ? "border-success/30 bg-success/5"
                  : item.impact === "negative"
                  ? "border-destructive/30 bg-destructive/5"
                  : "border-border bg-muted/30"
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`mt-0.5 rounded-full p-1 ${
                    item.impact === "positive"
                      ? "bg-success/20 text-success"
                      : item.impact === "negative"
                      ? "bg-destructive/20 text-destructive"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.impact === "positive" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : item.impact === "negative" ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : (
                    <Minus className="h-3 w-3" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-snug">
                    {item.headline}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.affectedStocks.map((stock) => (
                      <Badge key={stock} variant="secondary" className="text-xs">
                        {stock}
                      </Badge>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  Day {item.day}
                </span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
