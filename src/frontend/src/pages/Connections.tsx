import GlassCard from '../components/zen/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, MessageCircle, Check, X } from 'lucide-react';
import { toast } from 'sonner';

export default function Connections() {
  const suggestions = [
    {
      username: 'MoonWalker',
      compatibility: 85,
      sharedInterests: ['Anxiety', 'Personal Growth'],
      sharedGoals: ['Overcome Anxiety', 'Build Confidence']
    },
    {
      username: 'ZenSeeker',
      compatibility: 78,
      sharedInterests: ['Mindfulness', 'Communication'],
      sharedGoals: ['Enhance Communication', 'Develop Empathy']
    }
  ];

  const requests = [
    { username: 'SilentThoughts', timestamp: Date.now() - 3600000 }
  ];

  const connections = [
    { username: 'DreamChaser', connectedAt: Date.now() - 86400000 }
  ];

  const handleSendRequest = (username: string) => {
    toast.success(`Connection request sent to ${username}`);
  };

  const handleAccept = (username: string) => {
    toast.success(`You're now connected with ${username}`);
  };

  const handleDecline = (username: string) => {
    toast.success('Request declined');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Connections</h1>
        <p className="text-muted-foreground">Find compatible users for meaningful conversations</p>
      </div>

      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="requests">Requests ({requests.length})</TabsTrigger>
          <TabsTrigger value="connections">My Connections</TabsTrigger>
        </TabsList>

        {/* Suggestions */}
        <TabsContent value="suggestions" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {suggestions.map((user) => (
              <GlassCard key={user.username}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow" />
                      <div>
                        <p className="font-semibold">{user.username}</p>
                        <p className="text-sm text-zen-lavender">{user.compatibility}% compatible</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium mb-1">Shared Interests</p>
                      <div className="flex flex-wrap gap-1">
                        {user.sharedInterests.map((interest) => (
                          <Badge key={interest} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Shared Goals</p>
                      <div className="flex flex-wrap gap-1">
                        {user.sharedGoals.map((goal) => (
                          <Badge key={goal} variant="outline" className="text-xs">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => handleSendRequest(user.username)} className="w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Send Request
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        {/* Requests */}
        <TabsContent value="requests" className="space-y-6 mt-6">
          {requests.map((request) => (
            <GlassCard key={request.username}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-moon to-zen-lavender" />
                  <div>
                    <p className="font-semibold">{request.username}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAccept(request.username)}>
                    <Check className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDecline(request.username)}>
                    <X className="w-4 h-4 mr-1" />
                    Decline
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </TabsContent>

        {/* Connections */}
        <TabsContent value="connections" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {connections.map((connection) => (
              <GlassCard key={connection.username} hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow" />
                    <div>
                      <p className="font-semibold">{connection.username}</p>
                      <p className="text-sm text-muted-foreground">
                        Connected {new Date(connection.connectedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

