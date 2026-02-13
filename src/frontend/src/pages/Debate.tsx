import { useState } from 'react';
import GlassCard from '../components/zen/GlassCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Heart, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function Debate() {
  const [response, setResponse] = useState('');

  const weeklyTopic = {
    title: 'How do you balance personal growth with self-acceptance?',
    description: 'Share your perspective on the tension between wanting to improve yourself and accepting who you are right now.'
  };

  const responses = [
    {
      id: '1',
      author: 'MoonWalker',
      content: 'I think growth and acceptance aren\'t opposites. Accepting yourself means acknowledging where you are, and growth is about choosing where you want to go. Both can coexist.',
      timestamp: Date.now() - 86400000,
      likes: 12
    }
  ];

  const handlePost = () => {
    if (!response.trim()) {
      toast.error('Please write a response');
      return;
    }

    toast.success('Response posted!');
    setResponse('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Weekly Debate</h1>
        <p className="text-muted-foreground">Share your perspective on this week's topic</p>
      </div>

      {/* Topic */}
      <GlassCard>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-zen-lavender" />
            <Badge variant="secondary">This Week</Badge>
          </div>
          <h2 className="text-2xl font-bold">{weeklyTopic.title}</h2>
          <p className="text-muted-foreground">{weeklyTopic.description}</p>
        </div>
      </GlassCard>

      {/* Response Composer */}
      <GlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Share Your Opinion</h3>
          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="What's your perspective on this topic?"
            rows={4}
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{response.length}/500</span>
            <Button onClick={handlePost}>Post Response</Button>
          </div>
        </div>
      </GlassCard>

      {/* Responses */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Community Responses</h3>
        {responses.map((resp) => (
          <GlassCard key={resp.id}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow" />
                <div>
                  <p className="font-medium">{resp.author}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(resp.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">{resp.content}</p>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4 mr-1" />
                {resp.likes} likes
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

