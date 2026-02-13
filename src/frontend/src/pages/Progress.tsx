import GlassCard from '../components/zen/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Target, Heart } from 'lucide-react';

export default function ProgressDashboard() {
  const stats = {
    streak: 7,
    reflections: 12,
    empathyTrend: 78,
    communicationGrowth: 65
  };

  const recentReflections = [
    {
      date: Date.now() - 86400000,
      tone: 'Supportive',
      empathy: 82,
      insight: 'You showed great empathy in your recent conversations'
    },
    {
      date: Date.now() - 172800000,
      tone: 'Thoughtful',
      empathy: 75,
      insight: 'Your communication style is becoming more reflective'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Your Progress</h1>
        <p className="text-muted-foreground">Track your emotional growth journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.reflections}</p>
              <p className="text-sm text-muted-foreground">Reflections</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.empathyTrend}%</p>
              <p className="text-sm text-muted-foreground">Empathy Score</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.communicationGrowth}%</p>
              <p className="text-sm text-muted-foreground">Communication</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Growth Indicators */}
      <GlassCard>
        <h3 className="text-xl font-semibold mb-6">Growth Indicators</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Empathy Development</span>
              <span className="text-sm text-muted-foreground">{stats.empathyTrend}%</span>
            </div>
            <Progress value={stats.empathyTrend} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Communication Skills</span>
              <span className="text-sm text-muted-foreground">{stats.communicationGrowth}%</span>
            </div>
            <Progress value={stats.communicationGrowth} className="h-2" />
          </div>
        </div>
      </GlassCard>

      {/* Recent Reflections */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Reflections</h3>
        {recentReflections.map((reflection, i) => (
          <GlassCard key={i}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{reflection.tone}</Badge>
                <span className="text-sm text-muted-foreground">
                  {new Date(reflection.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Empathy Score:</span>
                <span className="text-lg font-bold text-zen-lavender">{reflection.empathy}%</span>
              </div>
              <p className="text-sm text-muted-foreground">{reflection.insight}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* No Vanity Metrics Notice */}
      <GlassCard>
        <div className="text-center py-6">
          <p className="text-muted-foreground">
            Your progress is measured by growth, not popularity. No follower counts, no like metrics—just authentic development.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

