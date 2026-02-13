import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import GlassCard from '../components/zen/GlassCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut, Brain, Target, Heart } from 'lucide-react';

export default function Profile() {
  const { clear } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">Anonymous and secure</p>
      </div>

      {/* Profile Card */}
      <GlassCard>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="text-4xl bg-gradient-to-br from-zen-lavender to-zen-glow text-white">
              {userProfile?.username[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{userProfile?.username}</h2>
            <p className="text-muted-foreground mb-4">{userProfile?.bio || 'No bio yet'}</p>
            <Badge variant="secondary">Anonymous User</Badge>
          </div>
        </div>
      </GlassCard>

      {/* Interests */}
      {userProfile?.interests && userProfile.interests.length > 0 && (
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-zen-lavender" />
            <h3 className="text-xl font-semibold">Interests</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {userProfile.interests.map((interest, i) => (
              <Badge key={i} variant="secondary" className="px-4 py-2">
                {interest}
              </Badge>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Growth Goals */}
      {userProfile?.growthGoals && userProfile.growthGoals.length > 0 && (
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-zen-lavender" />
            <h3 className="text-xl font-semibold">Growth Goals</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {userProfile.growthGoals.map((goal, i) => (
              <Badge key={i} variant="outline" className="px-4 py-2">
                {goal}
              </Badge>
            ))}
          </div>
        </GlassCard>
      )}

      {/* MBTI */}
      <GlassCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-zen-lavender" />
            <div>
              <h3 className="text-lg font-semibold">MBTI Personality</h3>
              <p className="text-sm text-muted-foreground">
                {userProfile?.mbti ? 'Completed' : 'Not taken yet'}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/mbti'}>
            {userProfile?.mbti ? 'Retake' : 'Take Test'}
          </Button>
        </div>
      </GlassCard>

      {/* Logout */}
      <GlassCard>
        <Button variant="destructive" onClick={handleLogout} className="w-full">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </GlassCard>
    </div>
  );
}

