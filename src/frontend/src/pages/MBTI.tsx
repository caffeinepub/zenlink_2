import { useState } from 'react';
import GlassCard from '../components/zen/GlassCard';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Brain, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const MBTI_QUESTIONS = [
  {
    question: 'At a party, do you:',
    options: [
      { text: 'Interact with many, including strangers', type: 'E' },
      { text: 'Interact with a few, known to you', type: 'I' }
    ]
  },
  {
    question: 'Are you more:',
    options: [
      { text: 'Realistic than speculative', type: 'S' },
      { text: 'Speculative than realistic', type: 'N' }
    ]
  },
  {
    question: 'Is it worse to:',
    options: [
      { text: 'Have your head in the clouds', type: 'S' },
      { text: 'Be in a rut', type: 'N' }
    ]
  },
  {
    question: 'Are you more impressed by:',
    options: [
      { text: 'Principles', type: 'T' },
      { text: 'Emotions', type: 'F' }
    ]
  },
  {
    question: 'Are you more drawn toward the:',
    options: [
      { text: 'Convincing', type: 'T' },
      { text: 'Touching', type: 'F' }
    ]
  },
  {
    question: 'Do you prefer to work:',
    options: [
      { text: 'To deadlines', type: 'J' },
      { text: 'Just whenever', type: 'P' }
    ]
  },
  {
    question: 'Do you tend to choose:',
    options: [
      { text: 'Rather carefully', type: 'J' },
      { text: 'Somewhat impulsively', type: 'P' }
    ]
  },
  {
    question: 'At parties do you:',
    options: [
      { text: 'Stay late, with increasing energy', type: 'E' },
      { text: 'Leave early, with decreased energy', type: 'I' }
    ]
  },
  {
    question: 'Are you more attracted to:',
    options: [
      { text: 'Sensible people', type: 'S' },
      { text: 'Imaginative people', type: 'N' }
    ]
  },
  {
    question: 'Are you more interested in:',
    options: [
      { text: 'What is actual', type: 'S' },
      { text: 'What is possible', type: 'N' }
    ]
  },
  {
    question: 'In judging others are you more swayed by:',
    options: [
      { text: 'Laws than circumstances', type: 'T' },
      { text: 'Circumstances than laws', type: 'F' }
    ]
  },
  {
    question: 'In approaching others is your inclination to be somewhat:',
    options: [
      { text: 'Objective', type: 'T' },
      { text: 'Personal', type: 'F' }
    ]
  },
  {
    question: 'Are you more:',
    options: [
      { text: 'Punctual', type: 'J' },
      { text: 'Leisurely', type: 'P' }
    ]
  },
  {
    question: 'Does it bother you more having things:',
    options: [
      { text: 'Incomplete', type: 'J' },
      { text: 'Completed', type: 'P' }
    ]
  },
  {
    question: 'In your social groups do you:',
    options: [
      { text: 'Keep abreast of others happenings', type: 'E' },
      { text: 'Get behind on the news', type: 'I' }
    ]
  },
  {
    question: 'In doing ordinary things are you more likely to:',
    options: [
      { text: 'Do it the usual way', type: 'S' },
      { text: 'Do it your own way', type: 'N' }
    ]
  },
  {
    question: 'Writers should:',
    options: [
      { text: 'Say what they mean and mean what they say', type: 'S' },
      { text: 'Express things more by use of analogy', type: 'N' }
    ]
  },
  {
    question: 'Which appeals to you more:',
    options: [
      { text: 'Consistency of thought', type: 'T' },
      { text: 'Harmonious human relationships', type: 'F' }
    ]
  },
  {
    question: 'Are you more comfortable in making:',
    options: [
      { text: 'Logical judgments', type: 'T' },
      { text: 'Value judgments', type: 'F' }
    ]
  },
  {
    question: 'Do you want things:',
    options: [
      { text: 'Settled and decided', type: 'J' },
      { text: 'Unsettled and undecided', type: 'P' }
    ]
  }
];

export default function MBTI() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const progress = ((currentQuestion + 1) / MBTI_QUESTIONS.length) * 100;

  const handleNext = () => {
    if (!selectedAnswer) {
      toast.error('Please select an answer');
      return;
    }

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer('');

    if (currentQuestion < MBTI_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers: string[]) => {
    const counts: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    allAnswers.forEach(answer => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    const type = 
      (counts.E > counts.I ? 'E' : 'I') +
      (counts.S > counts.N ? 'S' : 'N') +
      (counts.T > counts.F ? 'T' : 'F') +
      (counts.J > counts.P ? 'J' : 'P');

    setResult(type);
    toast.success(`Your MBTI type is ${type}!`);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setSelectedAnswer('');
  };

  if (result) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center mx-auto">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Your Personality Type</h1>
          <div className="text-6xl font-bold text-zen-lavender">{result}</div>
        </div>

        <GlassCard>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What This Means</h3>
            <p className="text-muted-foreground">
              Your MBTI type helps us match you with compatible users and circles. 
              This information is used to calculate compatibility percentages and suggest 
              meaningful connections based on personality traits.
            </p>
            <div className="flex gap-4">
              <Button onClick={handleRetake} variant="outline">
                Retake Test
              </Button>
              <Button onClick={() => window.history.back()}>
                Back to App
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">MBTI Personality Test</h1>
        <p className="text-muted-foreground">Answer honestly for accurate results</p>
      </div>

      <div className="space-y-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground text-center">
          Question {currentQuestion + 1} of {MBTI_QUESTIONS.length}
        </p>
      </div>

      <GlassCard>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">
            {MBTI_QUESTIONS[currentQuestion].question}
          </h3>

          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="space-y-4">
              {MBTI_QUESTIONS[currentQuestion].options.map((option, i) => (
                <div key={i} className="flex items-center space-x-3 glass-card rounded-xl p-4 cursor-pointer hover:bg-primary/10 zen-transition">
                  <RadioGroupItem value={option.type} id={`option-${i}`} />
                  <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <Button onClick={handleNext} className="w-full" size="lg">
            {currentQuestion < MBTI_QUESTIONS.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              'See Results'
            )}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}

