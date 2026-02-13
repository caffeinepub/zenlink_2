import { useNavigate } from '@tanstack/react-router';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import GlassCard from '../components/zen/GlassCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, Radio, Target, TrendingUp, Award } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { data: userProfile } = useGetCallerUserProfile();

  const dailyChallenge = {
    title: 'Share Your Perspective',
    description: 'Post a meaningful thought on the Wall today',
    progress: 0
  };

  const weeklyHighlights = [
    { title: 'Overcoming Anxiety', category: 'Mental Health', engagement: 42 },
    { title: 'Building Confidence', category: 'Personal Growth', engagement: 38 },
    { title: 'Communication Tips', category: 'Relationships', engagement: 35 }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-2xl bg-gradient-to-br from-zen-lavender to-zen-glow text-white">
              {userProfile?.username[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <h1 className="text-3xl font-bold">Welcome to your growth space, {userProfile?.username}</h1>
            <p className="text-muted-foreground">Your safe space for growth</p>
          </div>
        </div>
      </div>

      {/* Daily Challenge */}
      <GlassCard hover>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Today's Challenge</h3>
            <p className="text-lg mb-1">{dailyChallenge.title}</p>
            <p className="text-sm text-muted-foreground mb-4">{dailyChallenge.description}</p>
            <Button onClick={() => navigate({ to: '/wall' })}>
              Start Challenge
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Circles */}
        <GlassCard hover onClick={() => navigate({ to: '/circles' })}>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Growth Circles</h3>
              <p className="text-sm text-muted-foreground">
                Join small groups for guided discussions
              </p>
            </div>
            <Badge variant="secondary">5-8 members</Badge>
          </div>
        </GlassCard>

        {/* Rooms */}
        <GlassCard hover onClick={() => navigate({ to: '/rooms' })}>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <Radio className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Voice Rooms</h3>
              <p className="text-sm text-muted-foreground">
                Discover voice-first conversations
              </p>
            </div>
            <Badge variant="secondary">Voice Only</Badge>
          </div>
        </GlassCard>

        {/* Connections */}
        <GlassCard hover onClick={() => navigate({ to: '/connections' })}>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Find Connections</h3>
              <p className="text-sm text-muted-foreground">
                Match with compatible users
              </p>
            </div>
            <Badge variant="secondary">AI Matched</Badge>
          </div>
        </GlassCard>
      </div>

      {/* Weekly Highlights */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-zen-lavender" />
          <h2 className="text-2xl font-bold">Weekly Highlights</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {weeklyHighlights.map((highlight, i) => (
            <GlassCard key={i} hover>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{highlight.category}</Badge>
                  <Award className="w-5 h-5 text-zen-lavender" />
                </div>
                <h4 className="font-semibold">{highlight.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {highlight.engagement} meaningful interactions
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Growth Goals */}
      {userProfile?.growthGoals && userProfile.growthGoals.length > 0 && (
        <GlassCard>
          <h3 className="text-xl font-semibold mb-4">Your Growth Goals</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.growthGoals.map((goal, i) => (
              <Badge key={i} variant="secondary" className="px-4 py-2">
                {goal}
              </Badge>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}

