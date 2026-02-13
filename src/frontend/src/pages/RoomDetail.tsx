import { useParams, useNavigate } from '@tanstack/react-router';
import { useLocalRoomsStore } from '../lib/localRoomsStore';
import GlassCard from '../components/zen/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Radio, Mic } from 'lucide-react';

export default function RoomDetail() {
  const { roomId } = useParams({ from: '/rooms/$roomId' });
  const navigate = useNavigate();
  const { getRoom } = useLocalRoomsStore();
  
  const room = getRoom(roomId);

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Room not found</h2>
        <Button onClick={() => navigate({ to: '/rooms' })}>Back to Rooms</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/rooms' })}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Rooms
      </Button>

      {/* Room Header */}
      <GlassCard>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-zen-glow flex items-center justify-center">
                <Radio className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{room.title}</h1>
                <p className="text-muted-foreground">{room.topic}</p>
              </div>
            </div>
            {room.isDemo && <Badge variant="secondary">Demo</Badge>}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border/30">
            <span className="text-sm text-muted-foreground">
              {room.participants.length} listening
            </span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              Host: {room.creator}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Voice Interface */}
      <GlassCard>
        <div className="text-center py-12 space-y-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center mx-auto animate-pulse-glow">
            <Mic className="w-12 h-12 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Voice-Only Room</h3>
            <p className="text-muted-foreground">
              Push to talk and share your thoughts
            </p>
          </div>
          <Button size="lg" className="rounded-full">
            Hold to Speak
          </Button>
        </div>
      </GlassCard>

      {/* Participants */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Listening Now</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {room.participants.map((participant, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-moon to-zen-lavender" />
              <span className="text-sm font-medium">{participant}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

