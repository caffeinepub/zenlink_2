import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/zen/GlassCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Mic, Send, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ChatThread() {
  const { userId } = useParams({ from: '/chat/$userId' });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/connections' })}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Connections
      </Button>

      {/* Chat Header */}
      <GlassCard>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow" />
          <div>
            <p className="font-semibold">{userId}</p>
            <p className="text-sm text-muted-foreground">Anonymous chat</p>
          </div>
        </div>
      </GlassCard>

      {/* Safety Notice */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Your voice is safe here. Please don't share personal identifying information.
        </AlertDescription>
      </Alert>

      {/* Messages */}
      <div className="space-y-4 min-h-[400px]">
        <div className="text-center text-muted-foreground py-8">
          <p>Voice-first chat. Use voice notes to communicate.</p>
        </div>
      </div>

      {/* Voice Composer */}
      <GlassCard>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button size="lg" className="rounded-full shrink-0">
              <Mic className="w-5 h-5 mr-2" />
              Hold to Record
            </Button>
            <div className="flex-1">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Or type a short message..."
                rows={2}
              />
            </div>
            <Button size="lg" variant="outline" className="rounded-full shrink-0">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

