import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Coins, TrendingUp, TrendingDown, 
  Zap, Gamepad2, AlertCircle, Lock, CheckCircle2,
  RefreshCw, Sparkles, ArrowRight, PieChart, Play, Pause,
  Smartphone, Car, Cpu, Building2, Globe, ShoppingCart, MessageCircle,
  Briefcase, Wallet, Pill, Store, Film, CreditCard
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PortfolioChart } from "@/components/simulator/PortfolioChart";
import { NewsSection, NewsItem } from "@/components/simulator/NewsSection";
import { SimulatorAI } from "@/components/simulator/SimulatorAI";

// All available stocks
const allCompanies = [
  {
    id: "aapl",
    name: "Apple",
    ticker: "AAPL",
    icon: Smartphone,
    description: "Technology company - smartphones, computers, and devices",
    color: "primary",
    currentValue: 175,
    volatility: 0.18,
    riskLevel: "medium",
    sector: "tech",
  },
  {
    id: "tsla",
    name: "Tesla",
    ticker: "TSLA",
    icon: Car,
    description: "Electric vehicles and clean energy",
    color: "secondary",
    currentValue: 240,
    volatility: 0.3,
    riskLevel: "high",
    sector: "automotive",
  },
  {
    id: "nvda",
    name: "Nvidia",
    ticker: "NVDA",
    icon: Cpu,
    description: "Graphics processors and AI chips",
    color: "primary",
    currentValue: 450,
    volatility: 0.25,
    riskLevel: "high",
    sector: "tech",
  },
  {
    id: "msft",
    name: "Microsoft",
    ticker: "MSFT",
    icon: Building2,
    description: "Software, cloud services, and enterprise solutions",
    color: "primary",
    currentValue: 380,
    volatility: 0.16,
    riskLevel: "medium",
    sector: "tech",
  },
  {
    id: "googl",
    name: "Alphabet",
    ticker: "GOOGL",
    icon: Globe,
    description: "Internet search, cloud computing, and advertising",
    color: "primary",
    currentValue: 140,
    volatility: 0.2,
    riskLevel: "medium",
    sector: "tech",
  },
  {
    id: "amzn",
    name: "Amazon",
    ticker: "AMZN",
    icon: ShoppingCart,
    description: "E-commerce, cloud computing, and streaming",
    color: "warning",
    currentValue: 150,
    volatility: 0.22,
    riskLevel: "medium",
    sector: "tech",
  },
  {
    id: "meta",
    name: "Meta",
    ticker: "META",
    icon: MessageCircle,
    description: "Social media, virtual reality, and digital advertising",
    color: "primary",
    currentValue: 480,
    volatility: 0.28,
    riskLevel: "high",
    sector: "tech",
  },
  {
    id: "jpm",
    name: "JPMorgan Chase",
    ticker: "JPM",
    icon: Briefcase,
    description: "Banking and financial services",
    color: "success",
    currentValue: 160,
    volatility: 0.15,
    riskLevel: "medium",
    sector: "finance",
  },
  {
    id: "v",
    name: "Visa",
    ticker: "V",
    icon: CreditCard,
    description: "Payment processing and financial services",
    color: "success",
    currentValue: 270,
    volatility: 0.14,
    riskLevel: "low",
    sector: "finance",
  },
  {
    id: "jnj",
    name: "Johnson & Johnson",
    ticker: "JNJ",
    icon: Pill,
    description: "Pharmaceuticals and healthcare products",
    color: "success",
    currentValue: 155,
    volatility: 0.12,
    riskLevel: "low",
    sector: "healthcare",
  },
  {
    id: "wmt",
    name: "Walmart",
    ticker: "WMT",
    icon: Store,
    description: "Retail and e-commerce",
    color: "warning",
    currentValue: 165,
    volatility: 0.13,
    riskLevel: "low",
    sector: "retail",
  },
  {
    id: "nflx",
    name: "Netflix",
    ticker: "NFLX",
    icon: Film,
    description: "Streaming entertainment and content",
    color: "destructive",
    currentValue: 420,
    volatility: 0.24,
    riskLevel: "high",
    sector: "entertainment",
  },
  {
    id: "amd",
    name: "AMD",
    ticker: "AMD",
    icon: Zap,
    description: "Semiconductors and processors",
    color: "primary",
    currentValue: 135,
    volatility: 0.26,
    riskLevel: "high",
    sector: "tech",
  },
];

// Level configurations
const levelConfig = {
  1: {
    name: "Basics",
    description: "Learn mechanics without stress",
    maxDays: 10,
    stocks: ["aapl", "tsla", "nvda"],
    showNews: true, // Enable news so users can see why prices move
    showETF: false,
    volatilityMultiplier: 0.3, // Very calm movements
    winConditions: {
      portfolioValue: 10500, // Portfolio ≥ $10,500
      orSurvive: true, // OR finish without going bankrupt
    },
  },
  2: {
    name: "News & Volatility",
    description: "React intelligently to information",
    maxDays: 15,
    stocks: ["aapl", "tsla", "nvda", "msft", "googl"],
    showNews: true,
    showETF: false,
    volatilityMultiplier: 0.6,
    winConditions: {
      portfolioValue: 10200, // Portfolio ≥ $10,200
    },
  },
  3: {
    name: "Diversification",
    description: "Manage risk, not chase returns",
    maxDays: 20,
    stocks: ["aapl", "tsla", "nvda", "msft", "googl", "amzn", "meta", "jpm"],
    showNews: true,
    showETF: true,
    volatilityMultiplier: 0.8,
    winConditions: {
      portfolioValue: 10800, // Final portfolio ≥ $10,800
      maxDrawdown: 0.10, // Maximum drawdown ≤ 10%
    },
  },
  4: {
    name: "Signal vs Noise",
    description: "Avoid overreacting",
    maxDays: 20,
    stocks: ["aapl", "tsla", "nvda", "msft", "googl", "amzn", "meta", "jpm", "v", "jnj"],
    showNews: true,
    showETF: true,
    volatilityMultiplier: 1.0,
    winConditions: {
      outperformETF: true, // Portfolio ≥ ETF value
      maxTrades: 10, // Total trades ≤ 10
    },
  },
  5: {
    name: "Pressure & Regimes",
    description: "Adapt under constraints",
    maxDays: 30,
    stocks: ["aapl", "tsla", "nvda", "msft", "googl", "amzn", "meta", "jpm", "v", "jnj", "wmt"],
    showNews: true,
    showETF: true,
    volatilityMultiplier: 1.2,
    showMarketMood: true,
    marketRegime: "random",
    transactionFee: 0.01,
    winConditions: {
      bullPortfolioValue: 11000, // Bull: Portfolio ≥ $11,000
      bearPortfolioValue: 9800, // Bear: Portfolio ≥ $9,800
      minPortfolioValue: 7500, // Never drop below $7,500
      maxStockAllocation: 0.40, // No single stock > 40% of portfolio
    },
  },
  6: {
    name: "True Diversification",
    description: "Beyond timing and correlation",
    maxDays: 35,
    stocks: ["aapl", "tsla", "nvda", "msft", "googl", "amzn", "meta", "amd", "jpm", "v", "wmt", "jnj", "nflx"],
    showNews: true,
    showETF: true,
    volatilityMultiplier: 1.0,
    showSectors: true,
    showCorrelation: true,
    showTimeline: true,
    winConditions: {
      portfolioValue: 10800, // Portfolio ≥ $10,800
      maxSectorAllocation: 0.40, // No sector > 40%
    },
  },
  7: {
    name: "Master Level",
    description: "Advanced risk & strategy",
    maxDays: 45,
    stocks: ["aapl", "tsla", "nvda", "msft", "googl", "amzn", "meta", "jpm", "v", "jnj", "wmt", "nflx", "amd"],
    showNews: true,
    showETF: true,
    volatilityMultiplier: 1.1,
    showDrawdown: true,
    showHoldings: true,
    mutedRisks: true,
    emphasizeCompounding: true,
    winConditions: {
      portfolioValue: 11200, // Portfolio ≥ $11,200
      maxDrawdown: 0.15, // Max drawdown ≤ 15%
      outperformETFBy: 0.015, // Outperform ETF by ≥ 1.5%
    },
  },
};

// News scenarios for levels 2+
const newsScenarios: Record<number, NewsItem[][]> = {
  2: [
    [
      { id: "n1", day: 1, headline: "Apple announces new iPhone", description: "Strong pre-orders expected.", impact: "positive", affectedStocks: ["Apple"] },
      { id: "n2", day: 2, headline: "Tech sector rallies", description: "Major tech stocks surge together.", impact: "positive", affectedStocks: ["Apple", "Tesla", "Nvidia"] },
      { id: "n3", day: 3, headline: "Tesla delivers record vehicles", description: "Production beats expectations.", impact: "positive", affectedStocks: ["Tesla"] },
      { id: "n4", day: 5, headline: "Nvidia reports AI chip demand", description: "Data center orders surge.", impact: "positive", affectedStocks: ["Nvidia"] },
      { id: "n5", day: 8, headline: "Microsoft cloud growth slows", description: "Enterprise adoption moderates.", impact: "negative", affectedStocks: ["Microsoft"] },
      { id: "n6", day: 12, headline: "Google faces ad revenue decline", description: "Digital advertising market softens.", impact: "negative", affectedStocks: ["Alphabet"] },
    ],
  ],
  3: [
    [
      { id: "n1", day: 1, headline: "Tech sector rallies", description: "Broad tech gains across the board.", impact: "positive", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta", "Nvidia"] },
      { id: "n2", day: 4, headline: "Tesla misses delivery targets", description: "Production challenges emerge.", impact: "negative", affectedStocks: ["Tesla"] },
      { id: "n3", day: 7, headline: "Banking sector gains", description: "Interest rates favor banks.", impact: "positive", affectedStocks: ["JPMorgan Chase"] },
      { id: "n4", day: 11, headline: "Market correction hits tech", description: "Tech stocks pull back broadly.", impact: "negative", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta", "Nvidia"] },
      { id: "n5", day: 16, headline: "Sector rotation continues", description: "Investors move to value stocks.", impact: "negative", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta"] },
    ],
  ],
  4: [
    [
      { id: "n1", day: 1, headline: "Apple announces strong earnings", description: "Revenue exceeds expectations.", impact: "positive", affectedStocks: ["Apple"] },
      { id: "n2", day: 3, headline: "Previous Apple report was overstated", description: "Earnings restated lower.", impact: "negative", affectedStocks: ["Apple"] },
      { id: "n3", day: 5, headline: "Tech stocks surge", description: "Broad sector rally continues.", impact: "positive", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta", "Nvidia"] },
      { id: "n4", day: 8, headline: "Market moves without clear reason", description: "Prices shift on low volume.", impact: "neutral", affectedStocks: ["Apple", "Microsoft", "Alphabet"] },
      { id: "n5", day: 12, headline: "Analysts disagree on outlook", description: "Mixed signals from experts.", impact: "neutral", affectedStocks: ["Tesla", "Nvidia"] },
      { id: "n6", day: 16, headline: "Tech correction continues", description: "Valuation concerns mount.", impact: "negative", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta"] },
    ],
  ],
  5: [
    [
      { id: "n1", day: 1, headline: "Markets start strong", description: "Positive sentiment drives gains.", impact: "positive", affectedStocks: ["Apple", "Microsoft", "Alphabet"] },
      { id: "n2", day: 5, headline: "Volatility increases", description: "Uncertainty grows in markets.", impact: "negative", affectedStocks: ["Tesla", "Nvidia", "Meta"] },
      { id: "n3", day: 10, headline: "Market crash begins", description: "Sharp decline across all sectors.", impact: "negative", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta", "Tesla", "Nvidia", "JPMorgan Chase", "Visa"] },
      { id: "n4", day: 15, headline: "Recovery starts", description: "Markets begin to stabilize.", impact: "positive", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon"] },
      { id: "n5", day: 22, headline: "Strong earnings reports", description: "Companies beat expectations.", impact: "positive", affectedStocks: ["JPMorgan Chase", "Visa", "Johnson & Johnson"] },
    ],
  ],
  6: [
    [
      { id: "n1", day: 2, headline: "Apple earnings beat expectations", description: "Price jumps after hours.", impact: "positive", affectedStocks: ["Apple"] },
      { id: "n2", day: 5, headline: "Tesla announces new model", description: "Stock rallies early, then cools.", impact: "neutral", affectedStocks: ["Tesla"] },
      { id: "n3", day: 8, headline: "Tech stocks surge midday", description: "Late buyers miss the move.", impact: "positive", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta", "Nvidia"] },
      { id: "n4", day: 12, headline: "Market moves without clear catalyst", description: "Prices shift after news.", impact: "neutral", affectedStocks: ["Apple", "Microsoft", "Alphabet"] },
      { id: "n5", day: 16, headline: "Best trade window closes quickly", description: "Opportunities fade fast.", impact: "neutral", affectedStocks: ["Tesla", "Nvidia"] },
    ],
  ],
  7: [
    [
      { id: "n1", day: 1, headline: "Tech sector rallies together", description: "All tech stocks move in sync.", impact: "positive", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta", "Nvidia", "AMD"] },
      { id: "n2", day: 4, headline: "Tech correction hits all", description: "Sector-wide decline.", impact: "negative", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta", "Nvidia", "AMD"] },
      { id: "n3", day: 8, headline: "Finance sector moves independently", description: "Banking stocks diverge from tech.", impact: "positive", affectedStocks: ["JPMorgan Chase", "Visa"] },
      { id: "n4", day: 14, headline: "Correlated moves continue", description: "Similar stocks react together.", impact: "neutral", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta"] },
      { id: "n5", day: 20, headline: "Sector risk becomes apparent", description: "Diversification challenge emerges.", impact: "neutral", affectedStocks: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta", "Nvidia"] },
    ],
  ],
};

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const Simulator = () => {
  // Level management
  const [currentLevel, setCurrentLevel] = useState<Level>(1);
  const [completedLevels, setCompletedLevels] = useState<Level[]>([]);
  const [showLevelSelect, setShowLevelSelect] = useState(false);

  // Game state
  const [cash, setCash] = useState(10000);
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [etfAllocation, setEtfAllocation] = useState(0);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [portfolioHistory, setPortfolioHistory] = useState<{ day: number; value: number }[]>([]);
  const [stockPrices, setStockPrices] = useState<Record<string, number>>({});
  const [previousPrices, setPreviousPrices] = useState<Record<string, number>>({});
  const [tradeCount, setTradeCount] = useState(0);
  const [dailyTradeCount, setDailyTradeCount] = useState(0);
  const [maxDrawdown, setMaxDrawdown] = useState(0);
  const [marketMood, setMarketMood] = useState<"bull" | "bear" | "sideways">("bull");
  const [holdingPeriods, setHoldingPeriods] = useState<Record<string, number>>({});
  const [portfolioPeak, setPortfolioPeak] = useState(0);
  const [newsInfluencedTrades, setNewsInfluencedTrades] = useState(0);
  const [minPortfolioValue, setMinPortfolioValue] = useState(10000);
  
  // Get level-specific companies
  const levelCompanies = levelConfig[currentLevel].stocks.map(id => 
    allCompanies.find(c => c.id === id)!
  );

  // Initialize allocations based on current level
  useEffect(() => {
    const initialAllocations: Record<string, number> = {};
    levelCompanies.forEach(c => {
      initialAllocations[c.id] = 0;
    });
    setAllocations(initialAllocations);
    setStockPrices(Object.fromEntries(levelCompanies.map(c => [c.id, c.currentValue])));
  }, [currentLevel]);

  // Generate daily news dynamically
  const generateDailyNews = (day: number): NewsItem | null => {
    if (!config.showNews || day === 0) return null;
    
    const newsTemplates: {
      headline: string;
      description: string;
      impact: "positive" | "negative" | "neutral";
      affectedStocks: string[];
    }[] = [
      // Positive news
      { headline: "Strong earnings beat expectations", description: "Better-than-expected quarterly results.", impact: "positive", affectedStocks: levelCompanies.slice(0, Math.min(3, levelCompanies.length)).map(c => c.name) },
      { headline: "Product launch drives investor interest", description: "New offering generates excitement.", impact: "positive", affectedStocks: levelCompanies.filter(c => c.sector === "tech").slice(0, 2).map(c => c.name) },
      { headline: "Market rally continues", description: "Broad gains across major sectors.", impact: "positive", affectedStocks: levelCompanies.slice(0, Math.min(5, levelCompanies.length)).map(c => c.name) },
      { headline: "Positive analyst upgrade", description: "Institutional investors increase positions.", impact: "positive", affectedStocks: levelCompanies.slice(0, Math.min(2, levelCompanies.length)).map(c => c.name) },
      
      // Negative news
      { headline: "Earnings miss expectations", description: "Weaker-than-expected quarterly results.", impact: "negative", affectedStocks: levelCompanies.slice(0, Math.min(3, levelCompanies.length)).map(c => c.name) },
      { headline: "Regulatory concerns weigh on markets", description: "Uncertainty creates selling pressure.", impact: "negative", affectedStocks: levelCompanies.filter(c => c.sector === "tech" || c.sector === "finance").slice(0, 3).map(c => c.name) },
      { headline: "Market correction deepens", description: "Selling pressure intensifies across sectors.", impact: "negative", affectedStocks: levelCompanies.slice(0, Math.min(5, levelCompanies.length)).map(c => c.name) },
      { headline: "Economic data disappoints", description: "Concerns about growth prospects.", impact: "negative", affectedStocks: levelCompanies.slice(0, Math.min(4, levelCompanies.length)).map(c => c.name) },
      
      // Neutral news
      { headline: "Markets trade in narrow range", description: "Mixed signals keep prices stable.", impact: "neutral", affectedStocks: levelCompanies.slice(0, Math.min(3, levelCompanies.length)).map(c => c.name) },
      { headline: "Sector rotation continues", description: "Investors shift allocations between industries.", impact: "neutral", affectedStocks: levelCompanies.slice(0, Math.min(4, levelCompanies.length)).map(c => c.name) },
      { headline: "Low volume trading session", description: "Markets move quietly on limited activity.", impact: "neutral", affectedStocks: levelCompanies.slice(0, Math.min(2, levelCompanies.length)).map(c => c.name) },
    ];
    
    // Randomly select a news template
    const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
    if (!template) return null;
    
    return {
      id: `news-day-${day}`,
      day: day,
      headline: template.headline,
      description: template.description,
      impact: template.impact,
      affectedStocks: template.affectedStocks.length > 0 ? template.affectedStocks : [],
    };
  };

  // Get news for current level (legacy - now used only for initial setup)
  const getNewsForLevel = () => {
    if (!levelConfig[currentLevel].showNews || !newsScenarios[currentLevel]) {
      return [];
    }
    const scenarios = newsScenarios[currentLevel];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  // Calculate total allocated - sum all allocations and ETF, rounding to avoid floating point issues
  const allocationsSum = Object.values(allocations).reduce((sum, val) => sum + (val || 0), 0);
  const totalAllocated = Math.round((allocationsSum + (etfAllocation || 0)) * 100) / 100;
  const remainingCash = Math.round((cash - totalAllocated) * 100) / 100;
  const config = levelConfig[currentLevel];

  const calculatePortfolioValue = (prices: Record<string, number>) => {
    let total = 0;
    // Only count stocks you actually own (amount > 0)
    // Use a stricter threshold to avoid floating point errors
    Object.entries(allocations).forEach(([id, amount]) => {
      if (amount > 0.01) { // Use 0.01 threshold to avoid rounding issues
        const company = levelCompanies.find(c => c.id === id);
        if (company && prices[id] && prices[id] > 0 && company.currentValue > 0) {
        const priceChange = prices[id] / company.currentValue;
        total += amount * priceChange;
        }
      }
    });
    // ETF only counts if you actually allocated to it
    // Note: ETF tracks the average of ALL stocks in the level, including ones you didn't invest in individually
    // For Level 7, ETF goes down because it includes tech stocks
    if (etfAllocation > 1 && config.showETF) { // Stricter check: must have at least $1 in ETF
      let avgChange = levelCompanies.reduce((sum, company) => {
        if (prices[company.id] && company.currentValue > 0) {
          return sum + (prices[company.id] / company.currentValue);
        }
        return sum;
      }, 0) / levelCompanies.length;
      
      // For Level 7, ETF should go down because it includes tech stocks
      if (currentLevel === 7) {
        // ETF tracks all stocks, but tech stocks dominate, so ETF goes down
        avgChange = avgChange * 0.98 - 0.01; // ETF loses ~2-3% per day on Level 7
      }
      
      total += etfAllocation * avgChange;
    }
    return Math.round(total);
  };

  const handleAllocationChange = (companyId: string, value: number[]) => {
    // Round to nearest dollar to avoid floating point precision issues
    const newValue = Math.round(value[0] || 0);
    const oldValue = allocations[companyId] || 0;
    
    if (simulationStarted) {
      // During simulation: calculate cost at CURRENT market prices
      const company = levelCompanies.find(c => c.id === companyId);
      if (company && stockPrices[companyId] && company.currentValue > 0) {
        // Calculate the difference in allocation value at current prices
        const allocationDifference = newValue - oldValue;
        // Cost at current price = (allocation difference) * (current price / original price)
        const priceRatio = stockPrices[companyId] / company.currentValue;
        
        // If buying (increasing allocation), need cash
        // If selling (decreasing allocation), get cash back
        if (allocationDifference > 0) {
          // Buying: calculate cost at current market price
          const costAtCurrentPrice = allocationDifference * priceRatio;
          // Check if we have enough cash
          if (costAtCurrentPrice > cash + 0.01) {
            // Not enough cash - don't update
            return;
          }
          
          // For Level 5: Check max stock allocation (no single stock > 40% of total portfolio value)
          // During simulation, use current portfolio value (cash + portfolio value) as the base
          if (currentLevel === 5) {
            const currentPortfolioValue = calculatePortfolioValue(stockPrices);
            const totalPortfolioValue = cash + currentPortfolioValue;
            const maxSingleStockAllocation = totalPortfolioValue * 0.40; // 40% of total portfolio
            
            // Calculate what the new allocation value would be at current prices
            const newAllocationValue = newValue * priceRatio;
            
            if (newAllocationValue > maxSingleStockAllocation + 0.01) {
              return; // Don't allow allocation if it exceeds 40% of total portfolio
            }
          }
          
          // Subtract cash when buying
          setCash(prev => Math.max(0, prev - costAtCurrentPrice));
          
          if (Math.abs(allocationDifference) > 0.01) {
            setTradeCount(prev => prev + 1);
            setDailyTradeCount(prev => prev + 1);
          }
        } else if (allocationDifference < 0) {
          // Selling: calculate cash back at current market price
          // oldValue is the original allocation amount, we need to calculate its current value
          // The current value of the position = oldValue * priceRatio
          // We're selling (oldValue - newValue) of the original allocation
          const soldOriginalAmount = Math.abs(allocationDifference); // Original $ amount being sold
          const currentValueOfSoldAmount = soldOriginalAmount * priceRatio; // Current value at market price
          // Add cash back when selling (round to avoid floating point issues)
          setCash(prev => {
            const newCash = prev + currentValueOfSoldAmount;
            return Math.round(newCash * 100) / 100;
          });
          
          if (Math.abs(allocationDifference) > 0.01) {
            setTradeCount(prev => prev + 1);
            setDailyTradeCount(prev => prev + 1);
          }
        } else {
          // No change - don't update anything
          return;
        }
        
        // Only update allocations if we successfully processed the transaction
        setAllocations(prev => ({ ...prev, [companyId]: newValue }));
        return; // Exit early to avoid duplicate allocation update
      } else {
        // Company/price check failed - don't update
        return;
      }
    } else {
      // Before simulation: use simple cash check
    const otherAllocations = Object.entries(allocations)
      .filter(([id]) => id !== companyId)
        .reduce((sum, [, val]) => sum + (val || 0), 0) + (etfAllocation || 0);
      
      // Check if new total allocation would exceed cash
      if (newValue + otherAllocations > cash + 0.01) {
        return;
      }
      
      // For Level 5: Check max stock allocation (no single stock > 40% of total cash/portfolio)
      // Use total cash (10000) as the base, not current allocations
      if (currentLevel === 5) {
        const maxSingleStockAllocation = 10000 * 0.40; // 40% of starting cash
        if (newValue > maxSingleStockAllocation + 0.01) {
          return; // Don't allow allocation if it exceeds 40% of total cash
        }
      }
      
      if (Math.abs(oldValue - newValue) > 0.01) {
        setTradeCount(prev => prev + 1);
        setDailyTradeCount(prev => prev + 1);
      }
    }
      
      // Track news-influenced trades for level 2
      // Counts if you have a position in a stock with POSITIVE news (even if allocated before news)
      if (currentLevel === 2) {
        // Check for news on current day, previous day, or next day
        const todayNews = news.find(n => 
          n.day === currentDay || 
          n.day === currentDay - 1 || 
          n.day === currentDay + 1
        );
        const company = levelCompanies.find(c => c.id === companyId);
        
        // Only count if:
        // 1. News exists and affects this stock
        // 2. News is POSITIVE (impact === "positive")
        // 3. You have a position in this stock (newValue > 0)
        // 4. Either you're increasing your position OR this is your first allocation
        const isPositiveNews = todayNews && todayNews.impact === "positive";
        const hasPosition = newValue > 0;
        const isNewInvestment = oldValue === 0 && newValue > 0;
        const isIncreasingPosition = newValue > oldValue;
        
        console.log(`Level 2 Trade Check: day=${currentDay}, company=${company?.name}, oldValue=${oldValue}, newValue=${newValue}`);
        console.log(`  todayNews=`, todayNews, `impact=${todayNews?.impact}, affectedStocks=`, todayNews?.affectedStocks);
        console.log(`  isPositiveNews=${isPositiveNews}, hasPosition=${hasPosition}, isNewInvestment=${isNewInvestment}, isIncreasingPosition=${isIncreasingPosition}`);
        
        if (todayNews && company && todayNews.affectedStocks.includes(company.name) && isPositiveNews && hasPosition && (isNewInvestment || isIncreasingPosition)) {
          setNewsInfluencedTrades(prev => {
            // Only increment if we haven't already counted this stock for this news item
            const alreadyCounted = prev > 0; // Simple check - could be improved
            if (!alreadyCounted || isNewInvestment || isIncreasingPosition) {
              const newCount = prev + 1;
              console.log(`✅ News-influenced trade detected! Investing in ${company.name} with POSITIVE news on day ${currentDay} (news day: ${todayNews.day}). Total: ${newCount}`);
              return newCount;
            }
            return prev;
          });
        } else {
          console.log(`❌ Not counted: hasNews=${!!todayNews}, isPositiveNews=${isPositiveNews}, hasPosition=${hasPosition}, affected=${todayNews?.affectedStocks?.includes(company?.name || "")}`);
        }
      }
      
      // Store rounded value to avoid precision issues (only for pre-simulation)
      setAllocations(prev => ({ ...prev, [companyId]: newValue }));
  };

  const handleEtfChange = (value: number[]) => {
    // Round to nearest dollar to avoid floating point precision issues
    const newValue = Math.round(value[0] || 0);
    const oldValue = etfAllocation || 0;
    
    if (simulationStarted) {
      // During simulation: ETF tracks average of all stocks, so use average price ratio
      const avgPriceRatio = levelCompanies.reduce((sum, company) => {
        if (stockPrices[company.id] && company.currentValue > 0) {
          return sum + (stockPrices[company.id] / company.currentValue);
        }
        return sum;
      }, 0) / levelCompanies.length;
      
      const allocationDifference = newValue - oldValue;
      const costAtCurrentPrice = allocationDifference * avgPriceRatio;
      
      // If buying (increasing allocation), need cash
      // If selling (decreasing allocation), get cash back
      if (costAtCurrentPrice > 0) {
        // Buying: check if we have enough cash
        if (costAtCurrentPrice > cash + 0.01) {
          // Not enough cash - don't update
          return;
        }
        // Subtract cash when buying
        setCash(prev => Math.max(0, prev - costAtCurrentPrice));
      } else if (costAtCurrentPrice < 0) {
        // Selling: add cash back
        setCash(prev => prev + Math.abs(costAtCurrentPrice));
      }
      
      if (Math.abs(oldValue - newValue) > 0.01) {
        setTradeCount(prev => prev + 1);
        setDailyTradeCount(prev => prev + 1);
      }
      setEtfAllocation(newValue);
    } else {
      // Before simulation: use simple cash check
      const companyTotal = Object.values(allocations).reduce((sum, val) => sum + (val || 0), 0);
      
      if (newValue + companyTotal <= cash + 0.01) {
        if (Math.abs(oldValue - newValue) > 0.01) {
          setTradeCount(prev => prev + 1);
          setDailyTradeCount(prev => prev + 1);
        }
        setEtfAllocation(newValue);
      }
    }
  };

const startSimulation = () => {
    if (totalAllocated > 0) {
      // Calculate cash: starting cash (10000) minus what was allocated
      // This ensures cash reflects only uninvested money
      const remainingCash = 10000 - totalAllocated;
      
      // Start with empty news - will be generated daily
      setNews([]);
      setSimulationStarted(true);
      setCurrentDay(0);
      setTradeCount(0);
      setDailyTradeCount(0);
      setMaxDrawdown(0);
      setPortfolioHistory([{ day: 0, value: totalAllocated }]);
      setStockPrices(Object.fromEntries(levelCompanies.map(c => [c.id, c.currentValue])));
      setPortfolioPeak(totalAllocated);
      setNewsInfluencedTrades(0);
      setMinPortfolioValue(totalAllocated);
      // Set cash correctly at simulation start
      setCash(remainingCash);
      
      // For Level 2: News-influenced trades are now checked dynamically during simulation
      // News is generated daily, so we can't check at start anymore
      
      // Initialize market mood for level 5 (Pressure & Regimes)
      if (currentLevel === 5) {
        const moods: ("bull" | "bear" | "sideways")[] = ["bull", "bear", "sideways"];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        setMarketMood(randomMood);
      } else {
        setMarketMood("bull");
      }
      
      // Initialize holding periods
      const initialHoldings: Record<string, number> = {};
      Object.keys(allocations).forEach(id => {
        if (allocations[id] > 0) {
          initialHoldings[id] = 1;
        }
      });
      if (etfAllocation > 0) {
        initialHoldings["etf"] = 1;
      }
      setHoldingPeriods(initialHoldings);
    }
  };

  const nextDay = () => {
    if (currentDay >= config.maxDays) return;

    const nextDayNum = currentDay + 1;
    setCurrentDay(nextDayNum);
    setDailyTradeCount(0); // Reset daily trade count

    // Generate news for this day BEFORE updating prices
    let todayNews: NewsItem | null = null;
    if (config.showNews) {
      todayNews = generateDailyNews(nextDayNum);
      if (todayNews) {
        // Add news immediately so it's available for price calculations and display
        setNews(prev => [...prev, todayNews!]);
      }
    }

    // Update stock prices using today's news
      const newPrices = { ...stockPrices };

    levelCompanies.forEach(company => {
      // Base movement with level-specific volatility
      const volatility = company.volatility * config.volatilityMultiplier;
      let baseChange = (Math.random() - 0.5) * 2 * volatility * 10;
      
      // For level 1, add slight upward bias to make it beatable with equal allocation
      // This ensures the market has a gentle positive drift, making 33% allocation viable
      if (currentLevel === 1) {
        baseChange += 1.5 + Math.random() * 1; // Add ~1.5-2.5 upward bias per day
      }
      
      // For level 5, market mood affects base movement
      if (currentLevel === 5) {
        if (marketMood === "bear") {
          // In bear market, strong downward bias - stocks should go down
          baseChange -= 2.5 + Math.random() * 1.5; // -2.5 to -4.0 downward bias per day
        } else if (marketMood === "bull") {
          // In bull market, upward bias
          baseChange += 2.0 + Math.random() * 1.0; // +2.0 to +3.0 upward bias per day
        }
        // Sideways has no additional bias (just normal volatility)
      }
      
      // For level 6, tech stocks and ETF should go down significantly
      // Non-tech stocks get strong upward bias - only way to beat the level
        let newsImpact = 0;

        if (todayNews && todayNews.affectedStocks.includes(company.name)) {
        if (todayNews.impact === "positive") {
          newsImpact = 8 + Math.random() * 7;
        } else if (todayNews.impact === "negative") {
          newsImpact = -(8 + Math.random() * 7);
        }
        // Neutral news has no impact
      }
      
      // For level 5, reduce positive news impact in bear market
      if (currentLevel === 5 && marketMood === "bear" && newsImpact > 0) {
        newsImpact = newsImpact * 0.3; // Positive news has much less impact in bear market
      }
      
      if (currentLevel === 6) {
        if (company.sector === "tech") {
          // Tech stocks have very strong downward bias - investing in them will lose money
          // Even positive news can't overcome the strong downward trend
          baseChange -= 4.0 + Math.random() * 2.0; // -4.0 to -6.0 downward bias per day
          // Severely reduce the impact of positive news for tech stocks on Level 7
          if (newsImpact > 0) {
            newsImpact = newsImpact * 0.2 - 2; // Positive news gives only 20% impact and then subtracts 2 more
          }
        } else {
          // Non-tech stocks (finance, retail, healthcare, entertainment) get moderate upward bias
          // This is the only way to reach $10,800+ and beat the level, but it should be challenging
          baseChange += 1.0 + Math.random() * 0.5; // +1.0 to +1.5 upward bias per day (reduced from 2.5-3.5)
        }
      }

      const newPrice = newPrices[company.id] + baseChange + newsImpact;
        // Ensure price never goes below 10% of original value to prevent zero portfolio issues
        // This prevents catastrophic losses while still allowing realistic price movements
        const minPrice = Math.max(1, company.currentValue * 0.1);
        newPrices[company.id] = Math.max(minPrice, newPrice);
      });

      // Store previous prices before updating
      setPreviousPrices(stockPrices);
      setStockPrices(newPrices);
      const newValue = calculatePortfolioValue(newPrices);
    
    // Track minimum portfolio value for level 5
    if (currentLevel === 5) {
      setMinPortfolioValue(prev => Math.min(prev, newValue));
    }
    
    // Track max drawdown for levels 3, 7
    if (currentLevel === 3 || currentLevel === 7) {
      const currentPeak = Math.max(...portfolioHistory.map(p => p.value), portfolioPeak, totalAllocated);
      if (newValue > currentPeak) {
        setPortfolioPeak(newValue);
      }
      const drawdown = currentPeak > 0 ? (currentPeak - newValue) / currentPeak : 0;
      if (drawdown > maxDrawdown) {
        setMaxDrawdown(drawdown);
      }
    }
    
    // Update holding periods for level 7
    if (currentLevel === 7 && simulationStarted) {
      setHoldingPeriods(prev => {
        const updated = { ...prev };
        Object.keys(allocations).forEach(id => {
          if (allocations[id] > 0) {
            updated[id] = (updated[id] || 0) + 1;
          } else {
            // Reset if position is closed
            delete updated[id];
          }
        });
        if (etfAllocation > 0) {
          updated["etf"] = (updated["etf"] || 0) + 1;
        } else {
          delete updated["etf"];
        }
        return updated;
      });
    }

    setPortfolioHistory(prev => [...prev, { day: nextDayNum, value: newValue }]);
  };

  const checkWinConditions = (): boolean => {
    if (!simulationStarted) {
      return false;
    }
    
    // Calculate final value - use the latest from portfolioHistory, or calculate current value
    let finalValue: number;
    if (portfolioHistory.length > 0) {
      finalValue = portfolioHistory[portfolioHistory.length - 1]?.value || totalAllocated;
    } else {
      // Fallback: calculate current portfolio value
      finalValue = calculatePortfolioValue(stockPrices);
    }
    
    const startingValue = portfolioHistory[0]?.value || totalAllocated;
    const winCond = config.winConditions;

    if (currentLevel === 1) {
      // Portfolio > $10,500 OR finish without going bankrupt
      if (winCond.portfolioValue && finalValue > winCond.portfolioValue) {
        return true;
      }
      if (winCond.orSurvive && finalValue > 0 && currentDay >= config.maxDays) {
        return true;
      }
    } else if (currentLevel === 2) {
      // Portfolio ≥ $10,200
      const targetValue = winCond.portfolioValue || 10200;
      return finalValue >= targetValue;
    } else if (currentLevel === 3) {
      // Final portfolio ≥ $10,800 AND maximum drawdown ≤ 10%
      const meetsPortfolioTarget = finalValue >= (winCond.portfolioValue || 10800);
      const withinMaxDrawdown = maxDrawdown <= (winCond.maxDrawdown || 0.10);
      return meetsPortfolioTarget && withinMaxDrawdown;
    } else if (currentLevel === 4) {
      // Portfolio ≥ ETF value AND total trades ≤ 10
      const etfReturn = levelCompanies.reduce((sum, company) => {
        const returnPercent = (stockPrices[company.id] - company.currentValue) / company.currentValue;
        return sum + returnPercent;
      }, 0) / levelCompanies.length;
      const etfValue = startingValue * (1 + etfReturn);
      const portfolioMeetsETF = finalValue >= etfValue;
      const withinTradeLimit = tradeCount <= (winCond.maxTrades || 10);
      return portfolioMeetsETF && withinTradeLimit;
    } else if (currentLevel === 5) {
      // Bull market: Portfolio ≥ $11,000 OR Bear market: Portfolio ≥ $9,800
      // AND never drop below $7,500
      // AND no single stock > 40% of portfolio
      const meetsMinValue = minPortfolioValue >= (winCond.minPortfolioValue || 7500);
      const portfolioTarget = marketMood === "bear" 
        ? (winCond.bearPortfolioValue || 9800)
        : (winCond.bullPortfolioValue || 11000);
      const meetsPortfolioTarget = finalValue >= portfolioTarget;
      
      // Check max stock allocation: no single stock > 40% of total portfolio value
      // Calculate each stock's current value and check percentage
      const stockCurrentValues: Record<string, number> = {};
      let totalPortfolioValueCheck = cash;
      Object.entries(allocations).forEach(([id, originalAmount]) => {
        if (originalAmount > 0 && stockPrices[id] && levelCompanies.find(c => c.id === id)?.currentValue) {
          const company = levelCompanies.find(c => c.id === id)!;
          const priceRatio = stockPrices[id] / company.currentValue;
          stockCurrentValues[id] = originalAmount * priceRatio;
          totalPortfolioValueCheck += stockCurrentValues[id];
        }
      });
      
      // Also add ETF value
      if (etfAllocation > 0) {
        const avgReturn = levelCompanies.reduce((sum, company) => {
          if (stockPrices[company.id] && company.currentValue > 0) {
            return sum + (stockPrices[company.id] / company.currentValue - 1);
          }
          return sum;
        }, 0) / levelCompanies.length;
        totalPortfolioValueCheck += etfAllocation * (1 + avgReturn);
      }
      
      const maxStockPercent = totalPortfolioValueCheck > 0
        ? Math.max(...Object.values(stockCurrentValues).map(val => (val / totalPortfolioValueCheck) * 100), 0)
        : 0;
      const withinStockAllocationLimit = maxStockPercent <= ((winCond.maxStockAllocation || 0.40) * 100);
      
      return meetsPortfolioTarget && meetsMinValue && withinStockAllocationLimit;
    } else if (currentLevel === 6) {
      // Final portfolio ≥ $10,800 AND no sector > 40% allocation
      const meetsPortfolioTarget = finalValue >= (winCond.portfolioValue || 10800);
      const sectorAllocations: Record<string, number> = {};
      Object.entries(allocations).forEach(([id, amount]) => {
        if (amount > 0) {
          const company = levelCompanies.find(c => c.id === id);
          if (company) {
            sectorAllocations[company.sector] = (sectorAllocations[company.sector] || 0) + amount;
          }
        }
      });
      // Use original total allocated amount, not startingValue which can change after price movements
      const totalAllocatedForSectors = Object.values(allocations).reduce((sum, val) => sum + val, 0);
      const maxSectorPercent = totalAllocatedForSectors > 0 
        ? Math.max(...Object.values(sectorAllocations).map(amt => (amt / totalAllocatedForSectors) * 100), 0)
        : 0;
      const withinSectorLimit = maxSectorPercent <= ((winCond.maxSectorAllocation || 0.40) * 100);
      return meetsPortfolioTarget && withinSectorLimit;
    } else if (currentLevel === 7) {
      // Portfolio ≥ $11,200 AND max drawdown ≤ 15% AND outperform ETF by ≥ 1.5%
      const meetsPortfolioTarget = finalValue >= (winCond.portfolioValue || 11200);
      const withinMaxDrawdown = maxDrawdown <= (winCond.maxDrawdown || 0.15);
      const etfReturn = levelCompanies.reduce((sum, company) => {
        const returnPercent = (stockPrices[company.id] - company.currentValue) / company.currentValue;
        return sum + returnPercent;
      }, 0) / levelCompanies.length;
      const portfolioReturn = (finalValue - startingValue) / startingValue;
      const outperformsBy = portfolioReturn - etfReturn;
      const beatsETFByEnough = outperformsBy >= (winCond.outperformETFBy || 0.015);
      return meetsPortfolioTarget && withinMaxDrawdown && beatsETFByEnough;
    }

    return false;
  };

  const resetSimulation = () => {
    setSimulationStarted(false);
    setCurrentDay(0);
    setNews([]);
    setPortfolioHistory([]);
    setTradeCount(0);
    setDailyTradeCount(0);
    setMaxDrawdown(0);
    setPortfolioPeak(0);
    setMarketMood("bull");
    setHoldingPeriods({});
    setNewsInfluencedTrades(0);
    setMinPortfolioValue(10000);
    // Reset cash back to starting amount
    setCash(10000);
    const initialAllocations: Record<string, number> = {};
    levelCompanies.forEach(c => {
      initialAllocations[c.id] = 0;
    });
    setAllocations(initialAllocations);
    setEtfAllocation(0);
    setStockPrices(Object.fromEntries(levelCompanies.map(c => [c.id, c.currentValue])));
  };

  const selectLevel = (level: Level) => {
    // First hide level selection
    setShowLevelSelect(false);
    // Then set the level - this will trigger useEffect to reset allocations
    setCurrentLevel(level);
    // Reset simulation state immediately
    setSimulationStarted(false);
    setCurrentDay(0);
    setNews([]);
    setPortfolioHistory([]);
    setTradeCount(0);
    setDailyTradeCount(0);
    setMaxDrawdown(0);
    setPortfolioPeak(0);
    setMarketMood("bull");
    setHoldingPeriods({});
    setNewsInfluencedTrades(0);
    setMinPortfolioValue(10000);
    // Reset cash back to starting amount when changing levels
    setCash(10000);
    setEtfAllocation(0);
    // Allocations and stock prices will be reset by useEffect when currentLevel changes
  };

  // Check win condition when day changes
  useEffect(() => {
    if (simulationStarted && currentDay >= config.maxDays) {
      const won = checkWinConditions();
      if (won && !completedLevels.includes(currentLevel)) {
        setCompletedLevels(prev => [...prev, currentLevel]);
      }
    }
  }, [currentDay, simulationStarted]);

  const finalValue = portfolioHistory.length > 0 ? (portfolioHistory[portfolioHistory.length - 1]?.value || totalAllocated) : totalAllocated;
  // Only check win conditions if we've completed all days
  const hasWon = currentDay >= config.maxDays && checkWinConditions();
  const levelUnlocked = (level: Level) => true; // All levels are accessible

  // Level Selection Screen
  if (showLevelSelect) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero py-12 md:py-16">
          <div className="container">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-lighter px-4 py-2 text-sm font-medium text-accent-dark mb-4">
                <Gamepad2 className="h-4 w-4" />
                Educational Simulation
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Market Simulator
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Learn to invest through progressive levels. Each level teaches a new concept.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(Object.keys(levelConfig).map(Number) as Level[]).map((level) => {
                  const config = levelConfig[level];
                  const completed = completedLevels.includes(level);
                  
                  return (
                    <Card 
                      key={level} 
                      variant="interactive"
                      className="cursor-pointer"
                      onClick={() => selectLevel(level)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            Level {level}: {config.name}
                          </CardTitle>
                          {completed && <CheckCircle2 className="h-5 w-5 text-success" />}
                        </div>
                        <CardDescription>{config.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• {config.maxDays} days</p>
                          <p>• {config.stocks.length} stocks</p>
                          {config.showNews && <p>• News events</p>}
                          {config.showETF && <p>• ETF available</p>}
                          {level === 5 && <p>• Max 40% per stock</p>}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-12 md:py-16">
          <div className="container">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-lighter px-4 py-2 text-sm font-medium text-accent-dark mb-4">
                <Gamepad2 className="h-4 w-4" />
                Level {currentLevel}: {config.name}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Market Simulator
              </h1>
              <p className="text-lg text-muted-foreground">
                {config.description}
              </p>
            </div>
          </div>
        </section>

        {/* Cash Display */}
        <section className="border-b border-border bg-card">
          <div className="container py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-lighter">
                  <Coins className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Cash</p>
                  <p className="font-display text-2xl font-bold text-foreground">${Math.max(0, cash).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {simulationStarted ? "Portfolio Value" : "Allocated"}
                  </p>
                  <p className="font-semibold text-foreground">
                    ${simulationStarted ? finalValue.toLocaleString() : totalAllocated.toLocaleString()}
                  </p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {simulationStarted ? "Available Cash" : "Remaining"}
                  </p>
                  <p className={`font-semibold ${(simulationStarted ? Math.max(0, cash) : remainingCash) > 0 ? "text-success" : "text-muted-foreground"}`}>
                    ${simulationStarted ? Math.max(0, cash).toLocaleString() : remainingCash.toLocaleString()}
                  </p>
                </div>
                {currentLevel === 5 && (
                  <>
                    <div className="h-8 w-px bg-border" />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Max Stock</p>
                      {(() => {
                        const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + (val || 0), 0) + (etfAllocation || 0);
                        const maxStockPercent = totalAllocation > 0
                          ? Math.max(...Object.values(allocations).map(amt => (amt / totalAllocation) * 100), 0)
                          : 0;
                        const exceedsLimit = maxStockPercent > 40.01;
                        return (
                          <p className={`font-semibold ${exceedsLimit ? "text-destructive" : maxStockPercent > 35 ? "text-warning" : "text-foreground"}`}>
                            {maxStockPercent.toFixed(0)}% / 40%
                          </p>
                        );
                      })()}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container">
            {!simulationStarted ? (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Companies */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Choose Your Investments
                    </h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowLevelSelect(true)}>
                        Change Level
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {levelCompanies.map((company) => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        allocation={allocations[company.id] || 0}
                        maxCash={cash}
                        onAllocationChange={(value) => handleAllocationChange(company.id, value)}
                      />
                    ))}
                  </div>

                  {/* ETF Option */}
                  {config.showETF && (
                  <Card variant="highlighted">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                          <PieChart className="h-7 w-7" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                            Diversified Bundle (ETF)
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                              Automatically spreads your cash across all stocks equally — lower risk!
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Allocation</span>
                                <span className="font-semibold text-foreground">${etfAllocation}</span>
                            </div>
                            <Slider
                              value={[etfAllocation]}
                              onValueChange={handleEtfChange}
                                max={cash}
                              step={10}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Your Portfolio</CardTitle>
                      <CardDescription>How your cash is distributed</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(allocations).map(([id, amount]) => {
                        const company = levelCompanies.find(c => c.id === id)!;
                        const percentage = cash > 0 ? (amount / cash) * 100 : 0;
                        return amount > 0 ? (
                          <div key={id} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-foreground">{company.ticker}</span>
                              <span className="text-muted-foreground">{percentage.toFixed(0)}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        ) : null;
                      })}
                      {etfAllocation > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground">ETF Bundle</span>
                            <span className="text-muted-foreground">{((etfAllocation / cash) * 100).toFixed(0)}%</span>
                          </div>
                          <Progress value={(etfAllocation / cash) * 100} className="h-2" />
                        </div>
                      )}
                      {totalAllocated < 0.01 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Start allocating cash to see your portfolio
                        </p>
                      )}
                    </CardContent>
                  </Card>


                  {/* AI Assistant */}
                  <SimulatorAI
                    currentLevel={currentLevel}
                    levelName={config.name}
                    levelDescription={config.description}
                    winConditions={config.winConditions}
                    maxDays={config.maxDays}
                    stocks={config.stocks}
                    showNews={config.showNews}
                    showETF={config.showETF}
                    currentDay={currentDay}
                    portfolioValue={totalAllocated}
                    allocations={allocations}
                    etfAllocation={etfAllocation}
                    tradeCount={tradeCount}
                    maxDrawdown={maxDrawdown}
                    marketMood={marketMood}
                    newsInfluencedTrades={newsInfluencedTrades}
                    minPortfolioValue={minPortfolioValue}
                  />

                  {/* Level Goals */}
                  <Card key={`level-goals-${currentLevel}`} className="border-2 border-primary/30 bg-primary/5">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2">📊 Level {currentLevel} Goal</h4>
                      {(() => {
                        switch (currentLevel) {
                          case 1:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Learn mechanics without stress
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 10 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Portfolio ≥ <strong className="text-foreground">$10,500</strong>, OR</li>
                                  <li>Finish all days without going bankrupt</li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> This level is intentionally forgiving.
                                </p>
                              </>
                            );
                          case 2:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> React intelligently to information
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 15 days
                                </p>
                                  <p className="text-xs text-muted-foreground mb-2">
                                    Pass if:
                                  </p>
                                  <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                    <li>Portfolio ≥ <strong className="text-foreground">$10,200</strong></li>
                                  </ul>
                                  <p className="text-xs text-muted-foreground mb-2">
                                    <strong className="text-foreground">Note:</strong> React to news and market volatility to grow your portfolio.
                                  </p>
                              </>
                            );
                          case 3:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Manage risk, not chase returns
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 20 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Final portfolio ≥ <strong className="text-foreground">$10,800</strong></li>
                                  <li>AND maximum drawdown ≤ <strong className="text-foreground">10%</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Lower money target, higher discipline.
                                </p>
                              </>
                            );
                          case 4:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Avoid overreacting
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 20 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Portfolio ≥ <strong className="text-foreground">ETF value</strong></li>
                                  <li>AND total trades ≤ <strong className="text-foreground">10</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> This is a thinking level, not a trading level.
                                </p>
                              </>
                            );
                          case 5:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Adapt under constraints
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 30 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li><strong className="text-success">Bull market</strong>: Portfolio ≥ <strong className="text-foreground">$11,000</strong></li>
                                  <li><strong className="text-destructive">Bear market</strong>: Portfolio ≥ <strong className="text-foreground">$9,800</strong></li>
                                  <li>Never drop below <strong className="text-foreground">$7,500</strong></li>
                                  <li>No single stock &gt; <strong className="text-foreground">40%</strong> of portfolio</li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Adapt to market conditions while maintaining diversification.
                                </p>
                              </>
                            );
                          case 6:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> True diversification
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 35 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Final portfolio ≥ <strong className="text-foreground">$10,800</strong></li>
                                  <li>AND no sector &gt; <strong className="text-foreground">40%</strong> allocation</li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Money + structure.
                                </p>
                              </>
                            );
                          case 7:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> True diversification
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 30 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Final portfolio ≥ <strong className="text-foreground">$10,800</strong></li>
                                  <li>AND no sector &gt; <strong className="text-foreground">40%</strong> allocation</li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Money + structure.
                                </p>
                              </>
                            );
                          case 8:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Adapt to conditions
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 30 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li><strong className="text-success">Bull market</strong>: Portfolio ≥ <strong className="text-foreground">$11,200</strong></li>
                                  <li><strong className="text-destructive">Bear market</strong>: Portfolio ≥ <strong className="text-foreground">$9,800</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Different goals for different realities.
                                </p>
                              </>
                            );
                          case 9:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Protect against big losses
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 35 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Max drawdown ≤ <strong className="text-foreground">12%</strong></li>
                                  <li>AND final portfolio ≥ <strong className="text-foreground">$10,500</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> This is where players start thinking like pros.
                                </p>
                              </>
                            );
                          case 10:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Balance holding & adapting
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 40 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Hold at least one stock ≥ <strong className="text-foreground">70%</strong> of level</li>
                                  <li>Final portfolio ≥ <strong className="text-foreground">$11,100</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Rewards long-term conviction.
                                </p>
                              </>
                            );
                          case 11:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Recognize hidden underperformance
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 40 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Portfolio ≥ <strong className="text-foreground">$11,000</strong></li>
                                  <li>AND ETF underperformed your portfolio</li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Beating "safe" isn't easy.
                                </p>
                              </>
                            );
                          case 12:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Let compounding work
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 50 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Portfolio ≥ <strong className="text-foreground">$11,700</strong></li>
                                  <li>AND outperform ETF by ≥ <strong className="text-foreground">2%</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> This is the capstone level.
                                </p>
                              </>
                            );
                          default:
                            return <p className="text-xs text-muted-foreground">Level {currentLevel} goals coming soon...</p>;
                        }
                      })()}
                    </CardContent>
                  </Card>

                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full group"
                    onClick={startSimulation}
                    disabled={totalAllocated < 0.01}
                  >
                    <Play className="h-5 w-5" />
                    Start Simulation
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    {config.maxDays} days • {levelCompanies.length} stocks
                    {config.showNews && " • News events"}
                    {config.showETF && " • ETF available"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Main simulation area */}
                <div className="lg:col-span-2 space-y-6">
                {/* Day indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Day {currentDay} of {config.maxDays}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {currentDay >= config.maxDays 
                        ? hasWon ? "Level Complete! 🎉" : "Simulation complete"
                        : "In progress"}
                    </p>
                    {simulationStarted && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {(() => {
                          const startingValue = portfolioHistory[0]?.value || totalAllocated;
                          const returnPercent = startingValue > 0 ? ((finalValue - startingValue) / startingValue) * 100 : 0;
                          
                          if (currentLevel === 1) {
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className="text-success">$10,500+</strong>
                                </p>
                                <p className={finalValue >= 10500 ? "text-success" : ""}>
                                  Status: {finalValue >= 10500 ? "Pass ✓" : "Need $10,500 or survive"}
                                </p>
                              </>
                            );
                          } else if (currentLevel === 2) {
                            const portfolioMeets = finalValue >= 10200;
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className={portfolioMeets ? "text-success" : "text-foreground"}>$10,200+</strong>
                                  {portfolioMeets ? " ✓" : ""}
                                </p>
                              </>
                            );
                          } else if (currentLevel === 3) {
                            const maxLossPercent = maxDrawdown * 100;
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className="text-success">$10,800+</strong>
                                </p>
                                <p>
                                  Max Drawdown: <strong className={maxLossPercent <= 10 ? "text-success" : "text-destructive"}>{maxLossPercent.toFixed(1)}%</strong> (need ≤10%)
                                </p>
                              </>
                            );
                          } else if (currentLevel === 4) {
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Trades: <strong className={tradeCount <= 10 ? "text-success" : "text-destructive"}>{tradeCount}</strong>/10
                                </p>
                                <p className={returnPercent > 0 ? "text-success" : ""}>
                                  Need: Portfolio ≥ ETF value
                                </p>
                              </>
                            );
                          } else if (currentLevel === 5) {
                            const targetValue = marketMood === "bull" ? 11000 : 9800;
                            const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + (val || 0), 0) + (etfAllocation || 0);
                            const maxStockPercent = totalAllocation > 0
                              ? Math.max(...Object.values(allocations).map(amt => (amt / totalAllocation) * 100), 0)
                              : 0;
                            const meetsTarget = finalValue >= targetValue;
                            const withinStockLimit = maxStockPercent <= 40.01;
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className={meetsTarget ? "text-success" : "text-foreground"}>${targetValue.toLocaleString()}+</strong>
                                </p>
                                <p>
                                  Min Value: <strong className={minPortfolioValue >= 7500 ? "text-success" : "text-destructive"}>${minPortfolioValue.toLocaleString()}</strong> (need ≥$7,500) • 
                                  Max Stock: <strong className={withinStockLimit ? "text-success" : "text-destructive"}>{maxStockPercent.toFixed(0)}%</strong> (need ≤40%)
                                </p>
                              </>
                            );
                          } else if (currentLevel === 6) {
                            const sectorAllocations: Record<string, number> = {};
                            Object.entries(allocations).forEach(([id, amount]) => {
                              if (amount > 0) {
                                const company = levelCompanies.find(c => c.id === id);
                                if (company) {
                                  sectorAllocations[company.sector] = (sectorAllocations[company.sector] || 0) + amount;
                                }
                              }
                            });
                            const totalAllocatedForSectors = Object.values(allocations).reduce((sum, val) => sum + val, 0);
                            const maxSectorPercent = totalAllocatedForSectors > 0 
                              ? Math.max(...Object.values(sectorAllocations).map(amt => (amt / totalAllocatedForSectors) * 100), 0)
                              : 0;
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className={finalValue >= 10800 ? "text-success" : "text-foreground"}>$10,800+</strong>
                                </p>
                                <p>
                                  Max Sector: <strong className={maxSectorPercent <= 40 ? "text-success" : "text-destructive"}>{maxSectorPercent.toFixed(0)}%</strong> (need ≤40%)
                                </p>
                              </>
                            );
                          } else if (currentLevel === 7) {
                            const sectorAllocations: Record<string, number> = {};
                            Object.entries(allocations).forEach(([id, amount]) => {
                              if (amount > 0) {
                                const company = levelCompanies.find(c => c.id === id);
                                if (company) {
                                  sectorAllocations[company.sector] = (sectorAllocations[company.sector] || 0) + amount;
                                }
                              }
                            });
                            // Use original total allocated amount, not startingValue which can change after price movements
                            const totalAllocatedForSectors = Object.values(allocations).reduce((sum, val) => sum + val, 0);
                            const maxSectorPercent = totalAllocatedForSectors > 0
                              ? Math.max(...Object.values(sectorAllocations).map(amt => (amt / totalAllocatedForSectors) * 100), 0)
                              : 0;
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className="text-success">$10,800+</strong>
                                </p>
                                <p>
                                  Max Sector: <strong className={maxSectorPercent <= 40 ? "text-success" : "text-destructive"}>{maxSectorPercent.toFixed(0)}%</strong> (need ≤40%)
                                </p>
                              </>
                            );
                          } else if (currentLevel === 8) {
                            const targetValue = marketMood === "bull" ? 11200 : 9800;
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className={marketMood === "bull" ? "text-success" : "text-destructive"}>${targetValue.toLocaleString()}+</strong>
                                </p>
                                <p>
                                  Market: <strong className={marketMood === "bull" ? "text-success" : marketMood === "bear" ? "text-destructive" : "text-warning"}>{marketMood.toUpperCase()}</strong>
                                </p>
                              </>
                            );
                          } else if (currentLevel === 9) {
                            const maxLossPercent = maxDrawdown * 100;
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className="text-success">$10,500+</strong>
                                </p>
                                <p>
                                  Max Drawdown: <strong className={maxLossPercent <= 12 ? "text-success" : "text-destructive"}>{maxLossPercent.toFixed(1)}%</strong> (need ≤12%)
                                </p>
                              </>
                            );
                          } else if (currentLevel === 10) {
                            const maxHoldingDays = Math.max(...Object.values(holdingPeriods), 0);
                            const minHoldingPercent = (maxHoldingDays / config.maxDays) * 100;
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className="text-success">$11,100+</strong>
                                </p>
                                <p>
                                  Longest Hold: <strong className={minHoldingPercent >= 70 ? "text-success" : ""}>{minHoldingPercent.toFixed(0)}%</strong> of level (need ≥70%)
                                </p>
                              </>
                            );
                          } else if (currentLevel === 11) {
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className="text-success">$11,000+</strong>
                                </p>
                                <p className={returnPercent > 0 ? "text-success" : ""}>
                                  Need: Beat ETF performance
                                </p>
                              </>
                            );
                          } else if (currentLevel === 12) {
                            const etfReturn = levelCompanies.reduce((sum, company) => {
                              const returnPercent = (stockPrices[company.id] - company.currentValue) / company.currentValue;
                              return sum + returnPercent;
                            }, 0) / levelCompanies.length;
                            const outperformsBy = returnPercent - (etfReturn * 100);
                            return (
                              <>
                                <p>
                                  Current: <strong className="text-foreground">${finalValue.toLocaleString()}</strong> • 
                                  Target: <strong className="text-success">$11,700+</strong>
                                </p>
                                <p>
                                  Outperform ETF: <strong className={outperformsBy >= 2 ? "text-success" : ""}>{outperformsBy >= 0 ? "+" : ""}{outperformsBy.toFixed(2)}%</strong> (need ≥2%)
                                </p>
                              </>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {currentDay < config.maxDays ? (
                      currentLevel === 1 ? (
                        <Button variant="hero" onClick={nextDay}>
                          Next Day
                      </Button>
                      ) : (
                        <Button variant="hero" onClick={nextDay}>
                          Next Day
                        </Button>
                      )
                    ) : null}
                    <Button variant="outline" size="sm" onClick={resetSimulation}>
                      <RefreshCw className="h-4 w-4" />
                      Reset
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowLevelSelect(true)}>
                      Change Level
                    </Button>
                  </div>
                </div>

                {/* Progress bar */}
                <Progress value={(currentDay / config.maxDays) * 100} className="h-2" />

                {/* Trading Controls During Simulation */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Trade Stocks (Day {currentDay})
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Buy/sell at current market prices
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {levelCompanies.map((company) => {
                      const currentPrice = stockPrices[company.id] || company.currentValue;
                      const priceChange = currentPrice - company.currentValue;
                      const priceChangePercent = company.currentValue > 0 
                        ? ((priceChange / company.currentValue) * 100).toFixed(2)
                        : "0.00";
                      const Icon = company.icon;
                      
                      return (
                        <Card key={company.id} variant="interactive">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3 mb-4">
                              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-accent-lighter text-accent`}>
                                <Icon className="h-6 w-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-display font-semibold text-foreground">{company.name}</h3>
                                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{company.ticker}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm font-semibold text-foreground">${currentPrice.toFixed(2)}</span>
                                  <span className={`text-xs ${priceChange >= 0 ? "text-success" : "text-destructive"}`}>
                                    {priceChange >= 0 ? "↑" : "↓"} {Math.abs(parseFloat(priceChangePercent))}%
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Your allocation</span>
                                <span className="font-semibold text-foreground">${(allocations[company.id] || 0).toLocaleString()}</span>
                              </div>
                              <Slider
                                value={[allocations[company.id] || 0]}
                                onValueChange={(value) => handleAllocationChange(company.id, value)}
                                max={Math.max(10000, (allocations[company.id] || 0) + Math.max(0, cash) + 1000)}
                                step={10}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span className={company.riskLevel === "low" ? "text-success" : company.riskLevel === "medium" ? "text-warning" : "text-destructive"}>
                                  Risk: {company.riskLevel}
                                </span>
                                <span>Original: ${company.currentValue}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* ETF Option During Simulation */}
                  {config.showETF && (
                    <Card variant="highlighted">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                            <PieChart className="h-7 w-7" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                              Diversified Bundle (ETF)
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Automatically spreads your cash across all stocks equally — lower risk!
                            </p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Allocation</span>
                                <span className="font-semibold text-foreground">${etfAllocation.toLocaleString()}</span>
                              </div>
                              <Slider
                                value={[etfAllocation]}
                                onValueChange={handleEtfChange}
                                max={Math.max(10000, (etfAllocation || 0) + Math.max(0, cash) + 1000)}
                                step={10}
                                className="w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Main content */}
                <div className={`lg:col-span-2 grid gap-6 ${config.showNews ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
                  {/* Chart */}
                  <PortfolioChart data={portfolioHistory} startingValue={totalAllocated} />

                  {/* News */}
                  {config.showNews && (
                  <NewsSection 
                    news={news} 
                    currentDay={currentDay} 
                    stockPrices={stockPrices}
                    previousPrices={previousPrices}
                    levelCompanies={levelCompanies.map(c => ({ id: c.id, name: c.name, ticker: c.ticker }))}
                  />
                  )}
                </div>

                {/* Sidebar with Goals */}
                <div className="space-y-6">
                  {/* AI Assistant */}
                  <SimulatorAI
                    currentLevel={currentLevel}
                    levelName={config.name}
                    levelDescription={config.description}
                    winConditions={config.winConditions}
                    maxDays={config.maxDays}
                    stocks={config.stocks}
                    showNews={config.showNews}
                    showETF={config.showETF}
                    currentDay={currentDay}
                    portfolioValue={finalValue}
                    allocations={allocations}
                    etfAllocation={etfAllocation}
                    tradeCount={tradeCount}
                    maxDrawdown={maxDrawdown}
                    marketMood={marketMood}
                    newsInfluencedTrades={newsInfluencedTrades}
                    minPortfolioValue={minPortfolioValue}
                  />

                  {/* Level Goals during simulation */}
                  <Card key={`level-goals-sim-${currentLevel}`} className="border-2 border-primary/30 bg-primary/5">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2">📊 Level {currentLevel} Goal</h4>
                      {(() => {
                        switch (currentLevel) {
                          case 1:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Learn mechanics without stress
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 10 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Portfolio ≥ <strong className="text-foreground">$10,500</strong>, OR</li>
                                  <li>Finish all days without going bankrupt</li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> This level is intentionally forgiving.
                                </p>
                              </>
                            );
                          case 2:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> React intelligently to information
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 15 days
                                </p>
                                  <p className="text-xs text-muted-foreground mb-2">
                                    Pass if:
                                  </p>
                                  <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                    <li>Portfolio ≥ <strong className="text-foreground">$10,200</strong></li>
                                  </ul>
                                  <p className="text-xs text-muted-foreground mb-2">
                                    <strong className="text-foreground">Note:</strong> React to news and market volatility to grow your portfolio.
                                  </p>
                              </>
                            );
                          case 3:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Manage risk, not chase returns
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 20 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Final portfolio ≥ <strong className="text-foreground">$10,800</strong></li>
                                  <li>AND maximum drawdown ≤ <strong className="text-foreground">10%</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Lower money target, higher discipline.
                                </p>
                              </>
                            );
                          case 4:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Avoid overreacting
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 20 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Portfolio ≥ <strong className="text-foreground">ETF value</strong></li>
                                  <li>AND total trades ≤ <strong className="text-foreground">10</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> This is a thinking level, not a trading level.
                                </p>
                              </>
                            );
                          case 5:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Adapt under constraints
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 30 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li><strong className="text-success">Bull market</strong>: Portfolio ≥ <strong className="text-foreground">$11,000</strong></li>
                                  <li><strong className="text-destructive">Bear market</strong>: Portfolio ≥ <strong className="text-foreground">$9,800</strong></li>
                                  <li>Never drop below <strong className="text-foreground">$7,500</strong></li>
                                  <li>No single stock &gt; <strong className="text-foreground">40%</strong> of portfolio</li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Adapt to market conditions while maintaining diversification.
                                </p>
                              </>
                            );
                          case 6:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> True diversification
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 35 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Final portfolio ≥ <strong className="text-foreground">$10,800</strong></li>
                                  <li>AND no sector &gt; <strong className="text-foreground">40%</strong> allocation</li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Money + structure.
                                </p>
                              </>
                            );
                          case 7:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> True diversification
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 30 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Final portfolio ≥ <strong className="text-foreground">$10,800</strong></li>
                                  <li>AND no sector &gt; <strong className="text-foreground">40%</strong> allocation</li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Money + structure.
                                </p>
                              </>
                            );
                          case 8:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Adapt to conditions
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 30 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li><strong className="text-success">Bull market</strong>: Portfolio ≥ <strong className="text-foreground">$11,200</strong></li>
                                  <li><strong className="text-destructive">Bear market</strong>: Portfolio ≥ <strong className="text-foreground">$9,800</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Different goals for different realities.
                                </p>
                              </>
                            );
                          case 9:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Protect against big losses
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 35 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Max drawdown ≤ <strong className="text-foreground">12%</strong></li>
                                  <li>AND final portfolio ≥ <strong className="text-foreground">$10,500</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> This is where players start thinking like pros.
                                </p>
                              </>
                            );
                          case 10:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Balance holding & adapting
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 40 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Hold at least one stock ≥ <strong className="text-foreground">70%</strong> of level</li>
                                  <li>Final portfolio ≥ <strong className="text-foreground">$11,100</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Rewards long-term conviction.
                                </p>
                              </>
                            );
                          case 11:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Recognize hidden underperformance
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 40 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Portfolio ≥ <strong className="text-foreground">$11,000</strong></li>
                                  <li>AND ETF underperformed your portfolio</li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> Beating "safe" isn't easy.
                                </p>
                              </>
                            );
                          case 12:
                            return (
                              <>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Goal:</strong> Let compounding work
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Duration:</strong> 50 days
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">
                                  Pass if:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
                                  <li>Portfolio ≥ <strong className="text-foreground">$11,700</strong></li>
                                  <li>AND outperform ETF by ≥ <strong className="text-foreground">2%</strong></li>
                                </ul>
                                <p className="text-xs text-muted-foreground mb-2">
                                  <strong className="text-foreground">Note:</strong> This is the capstone level.
                                </p>
                              </>
                            );
                          default:
                            return <p className="text-xs text-muted-foreground">Level {currentLevel} goals coming soon...</p>;
                        }
                      })()}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Stock prices - spans full width below grid */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Stock Prices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {levelCompanies.map(company => {
                        const currentPrice = stockPrices[company.id];
                        const change = currentPrice - company.currentValue;
                        const changePercent = ((change / company.currentValue) * 100).toFixed(1);
                        const isUp = change >= 0;
                        const Icon = company.icon;
                        
                        // Check if news affects this stock today
                        const todayNews = news.find(n => n.day === currentDay);
                        const isAffected = todayNews && todayNews.affectedStocks.includes(company.name);
                        const newsImpact = todayNews?.impact || "neutral";
                        
                        return (
                          <div 
                            key={company.id} 
                            className={`flex items-center gap-3 p-3 rounded-lg bg-muted/50 transition-colors ${
                              isAffected && newsImpact === "positive" ? "bg-success/10 border border-success/30" :
                              isAffected && newsImpact === "negative" ? "bg-destructive/10 border border-destructive/30" :
                              ""
                            }`}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
                              <Icon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-foreground">{company.ticker}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">${currentPrice.toFixed(0)}</span>
                                <span className={`text-xs flex items-center ${isUp ? "text-success" : "text-destructive"}`}>
                                  {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                  {isUp ? "+" : ""}{changePercent}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Completion message */}
                {currentDay >= config.maxDays && (
                  <Card className={`border-2 ${hasWon ? "border-success/30" : "border-destructive/30"}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${hasWon ? "bg-success/20" : "bg-destructive/20"}`}>
                          {hasWon ? (
                            <CheckCircle2 className="h-6 w-6 text-success" />
                          ) : (
                            <AlertCircle className="h-6 w-6 text-destructive" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                            {hasWon ? "Level Complete! 🎉" : "Level Not Passed"}
                          </h3>
                          <div className="text-muted-foreground space-y-2">
                            <p>
                              You started with <strong>${totalAllocated}</strong> and ended with <strong>${finalValue}</strong>.
                            </p>
                            {currentLevel === 2 && (
                              <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                                <p>
                                  <strong>Your Return:</strong> {(((finalValue - totalAllocated) / totalAllocated) * 100).toFixed(2)}%
                                </p>
                                {(() => {
                                  const avgStockReturn = levelCompanies.reduce((sum, company) => {
                                    const returnPercent = (stockPrices[company.id] - company.currentValue) / company.currentValue;
                                    return sum + returnPercent;
                                  }, 0) / levelCompanies.length;
                                  return (
                                    <p>
                                      <strong>Market Average:</strong> {(avgStockReturn * 100).toFixed(2)}%
                                    </p>
                                  );
                                })()}
                                <p className="text-xs mt-2">
                                  Tip: Use news to identify which stocks will perform well!
                                </p>
                              </div>
                            )}
                            {hasWon ? (
                              <>
                                <p>Great job! You've learned: {config.description}</p>
                                {currentLevel < 5 && (
                                  <Button 
                                    variant="hero" 
                                    className="mt-4"
                                    onClick={() => selectLevel((currentLevel + 1) as Level)}
                                  >
                                    Continue to Level {currentLevel + 1}
                                  </Button>
                                )}
                              </>
                            ) : (
                              <div>
                                <p className="mb-2">Try again to meet the level objectives!</p>
                                {currentLevel === 2 && (
                            <p className="text-sm">
                                    Strategy tip: Pay attention to news headlines. Stocks with positive news tend to go up, while negative news causes drops. Try to invest more in stocks with positive news!
                            </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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

function CompanyCard({ 
  company, 
  allocation, 
  maxCash,
  onAllocationChange 
}: { 
  company: typeof allCompanies[0]; 
  allocation: number;
  maxCash: number;
  onAllocationChange: (value: number[]) => void;
}) {
  const Icon = company.icon;
  
  const colorClasses: Record<string, string> = {
    primary: "bg-accent-lighter text-accent",
    secondary: "bg-accent-lighter text-accent",
    accent: "bg-accent-lighter text-accent",
    success: "bg-accent-lighter text-accent",
    warning: "bg-accent-lighter text-accent",
    destructive: "bg-accent-lighter text-accent",
  };

  const riskColors: Record<string, string> = {
    low: "text-success",
    medium: "text-warning",
    high: "text-destructive",
  };

  return (
    <Card variant="interactive">
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[company.color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-foreground">{company.name}</h3>
              <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{company.ticker}</span>
            </div>
            <p className="text-sm text-muted-foreground">{company.description}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Your allocation</span>
            <span className="font-semibold text-foreground">${allocation}</span>
          </div>
          <Slider
            value={[allocation]}
            onValueChange={onAllocationChange}
            max={maxCash}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className={riskColors[company.riskLevel]}>Risk: {company.riskLevel}</span>
            <span>Price: ${company.currentValue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Simulator;
