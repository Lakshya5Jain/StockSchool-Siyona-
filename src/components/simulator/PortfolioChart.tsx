import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PortfolioChartProps {
  data: { day: number; value: number }[];
  startingValue: number;
}

export function PortfolioChart({ data, startingValue }: PortfolioChartProps) {
  const currentValue = data[data.length - 1]?.value || startingValue;
  const change = currentValue - startingValue;
  const changePercent = ((change / startingValue) * 100).toFixed(1);
  const isPositive = change >= 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Current Investment Value</CardTitle>
            <CardDescription>Track how your money changes over time</CardDescription>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-foreground">
              {currentValue.toLocaleString()}
            </p>
            <p className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {isPositive ? "+" : ""}{change.toLocaleString()} ({isPositive ? "+" : ""}{changePercent}%)
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <XAxis 
                dataKey="day" 
                tickFormatter={(v) => `Day ${v}`}
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                domain={['dataMin - 50', 'dataMax + 50']}
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(v) => v.toLocaleString()}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const val = payload[0].value as number;
                  return (
                    <div className="rounded-lg bg-popover px-3 py-2 shadow-lg border border-border">
                      <p className="text-sm font-medium text-foreground">
                        Day {payload[0].payload.day}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Value: <span className="font-semibold text-foreground">{val.toLocaleString()}</span>
                      </p>
                    </div>
                  );
                }}
              />
              <ReferenceLine 
                y={startingValue} 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="5 5" 
                strokeOpacity={0.5}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
