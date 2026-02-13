import { useParams, useNavigate } from '@tanstack/react-router';
import { useLocalCirclesStore } from '../lib/localCirclesStore';
import GlassCard from '../components/zen/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Sparkles } from 'lucide-react';

export default function CircleDetail() {
  const { circleId } = useParams({ from: '/circles/$circleId' });
  const navigate = useNavigate();
  const { getCircle } = useLocalCirclesStore();
  
  const circle = getCircle(circleId);

  if (!circle) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Circle not found</h2>
        <Button onClick={() => navigate({ to: '/circles' })}>Back to Circles</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/circles' })}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Circles
      </Button>

      {/* Circle Header */}
      <GlassCard>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{circle.name}</h1>
                <p className="text-muted-foreground">{circle.description}</p>
              </div>
            </div>
            {circle.isDemo && <Badge variant="secondary">Demo</Badge>}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border/30">
            <span className="text-sm text-muted-foreground">
              {circle.members.length}/8 members
            </span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              Admin: {circle.admin}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Weekly Prompt */}
      <GlassCard>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">This Week's Reflection</h3>
            <p className="text-foreground">{circle.weeklyPrompt}</p>
          </div>
        </div>
      </GlassCard>

      {/* Members */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Circle Members</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {circle.members.map((member, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-moon to-zen-lavender" />
              <span className="text-sm font-medium">{member}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Circle Feed Placeholder */}
      <GlassCard>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Circle feed and voice notes coming soon...
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Members will be able to share voice reflections and support each other here.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

