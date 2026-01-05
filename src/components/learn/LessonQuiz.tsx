import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ArrowRight, Trophy, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface LessonQuizProps {
  questions: QuizQuestion[];
  lessonTitle: string;
  onComplete: () => void;
}

export function LessonQuiz({ questions, lessonTitle, onComplete }: LessonQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    setHasAnswered(true);
    if (index === question.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setCorrectCount(0);
    setShowResults(false);
  };

  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= 70;

  if (showResults) {
    return (
      <Card className="animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className={cn(
            "flex h-20 w-20 mx-auto items-center justify-center rounded-full mb-6",
            passed ? "bg-success/20" : "bg-warning/20"
          )}>
            {passed ? (
              <Trophy className="h-10 w-10 text-success" />
            ) : (
              <RefreshCw className="h-10 w-10 text-warning" />
            )}
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            {passed ? "Great job! 🎉" : "Keep learning!"}
          </h2>
          <p className="text-muted-foreground mb-4">
            You scored <span className="font-bold text-foreground">{correctCount}</span> out of{" "}
            <span className="font-bold text-foreground">{questions.length}</span> ({score}%)
          </p>
          {passed ? (
            <p className="text-success mb-6">
              You've mastered the basics of "{lessonTitle}"!
            </p>
          ) : (
            <p className="text-muted-foreground mb-6">
              Review the lesson and try again. You need 70% to pass.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!passed && (
              <Button variant="outline" onClick={handleRetry} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            <Button variant="hero" onClick={onComplete} className="gap-2 group">
              {passed ? "Continue" : "Back to Lesson"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <span>{correctCount} correct</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-primary transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === question.correctAnswer;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={hasAnswered}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  "hover:border-primary/50 hover:bg-muted/50",
                  !hasAnswered && "cursor-pointer",
                  hasAnswered && "cursor-default",
                  isSelected && !hasAnswered && "border-primary bg-primary/5",
                  hasAnswered && isCorrectOption && "border-success bg-success/10",
                  hasAnswered && isSelected && !isCorrectOption && "border-destructive bg-destructive/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 font-medium",
                    !hasAnswered && isSelected && "border-primary bg-primary text-primary-foreground",
                    !hasAnswered && !isSelected && "border-muted-foreground/30",
                    hasAnswered && isCorrectOption && "border-success bg-success text-success-foreground",
                    hasAnswered && isSelected && !isCorrectOption && "border-destructive bg-destructive text-destructive-foreground"
                  )}>
                    {hasAnswered && isCorrectOption ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : hasAnswered && isSelected && !isCorrectOption ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className="text-foreground">{option}</span>
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Explanation */}
      {hasAnswered && (
        <Card className={cn(
          "animate-scale-in border-2",
          isCorrect ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"
        )}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={cn(
                "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
                isCorrect ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
              )}>
                {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              </div>
              <div>
                <p className={cn(
                  "font-semibold mb-1",
                  isCorrect ? "text-success" : "text-warning"
                )}>
                  {isCorrect ? "Correct!" : "Not quite!"}
                </p>
                <p className="text-muted-foreground text-sm">{question.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Button */}
      {hasAnswered && (
        <Button 
          variant="hero" 
          onClick={handleNext} 
          className="w-full group animate-scale-in"
        >
          {isLastQuestion ? "See Results" : "Next Question"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      )}
    </div>
  );
}
