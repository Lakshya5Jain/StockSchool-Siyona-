import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown } from "lucide-react";
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
  stockPrices?: Record<string, number>;
  previousPrices?: Record<string, number>;
  levelCompanies?: Array<{ id: string; name: string; ticker: string }>;
}

export function NewsSection({ news, currentDay, isPreview = false, stockPrices = {}, previousPrices = {}, levelCompanies = [] }: NewsSectionProps) {
  const visibleNews = isPreview ? news : news.filter((n) => n.day <= currentDay);
  const todayNews = visibleNews.filter((n) => n.day === currentDay);
  const pastNews = visibleNews.filter((n) => n.day < currentDay);

  // Calculate price changes for today's news
  const getPriceChange = (stockName: string) => {
    // Find stock by name or ticker
    const company = levelCompanies.find(c => 
      c.name.toLowerCase() === stockName.toLowerCase() || 
      c.ticker.toLowerCase() === stockName.toLowerCase()
    );
    
    if (company && stockPrices[company.id] && previousPrices[company.id]) {
      const change = stockPrices[company.id] - previousPrices[company.id];
      const percentChange = (change / previousPrices[company.id]) * 100;
      return { change, percentChange, ticker: company.ticker };
    }
    return null;
  };

  return (
    <Card className={isPreview ? "border-2 border-secondary/30" : ""}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Newspaper className="h-5 w-5 text-accent" />
          {isPreview ? "Upcoming News (Read Before Investing!)" : currentDay > 0 ? `Day ${currentDay} News` : "Market News"}
        </CardTitle>
        {!isPreview && currentDay > 0 && todayNews.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Today's news affecting stock prices:
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
        {visibleNews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            {currentDay === 0 ? "Start the simulation to see market news!" : "No news for today yet. Click 'Next Day' to see updates."}
          </p>
        ) : (
          <>
            {/* Today's News - Highlighted */}
            {!isPreview && currentDay > 0 && todayNews.length > 0 && (
              <div className="space-y-3 pb-3 border-b border-border">
                {todayNews.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg border-2 p-4 transition-colors ${
                      item.impact === "positive"
                        ? "border-success/50 bg-success/10"
                        : item.impact === "negative"
                        ? "border-destructive/50 bg-destructive/10"
                        : "border-primary/50 bg-primary/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 rounded-full p-1.5 ${
                          item.impact === "positive"
                            ? "bg-success/30 text-success"
                            : item.impact === "negative"
                            ? "bg-destructive/30 text-destructive"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.impact === "positive" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : item.impact === "negative" ? (
                          <ArrowDown className="h-4 w-4" />
                        ) : (
                          <Minus className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-foreground leading-snug">
                            {item.headline}
                          </p>
                          <Badge variant="outline" className="text-xs shrink-0">
                            Today
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.affectedStocks.map((stock) => {
                            const priceInfo = getPriceChange(stock);
                            return (
                              <Badge 
                                key={stock} 
                                variant={item.impact === "positive" ? "default" : item.impact === "negative" ? "destructive" : "secondary"} 
                                className="text-xs flex items-center gap-1"
                              >
                                {priceInfo?.ticker || stock}
                                {priceInfo && (
                                  <span className={priceInfo.change >= 0 ? "text-success font-semibold" : "text-destructive font-semibold"}>
                                    {priceInfo.change >= 0 ? "↑" : "↓"} {Math.abs(priceInfo.percentChange).toFixed(1)}%
                                  </span>
                                )}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Past News */}
            {(isPreview || pastNews.length > 0) && (
              <div className="space-y-2">
                {!isPreview && pastNews.length > 0 && (
                  <p className="text-xs font-medium text-muted-foreground mb-2">Previous Days:</p>
                )}
                {(isPreview ? visibleNews : pastNews).map((item) => (
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
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
