import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/zen/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Radio, Plus, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useLocalRoomsStore } from '../lib/localRoomsStore';

export default function Rooms() {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');

  const { rooms, createRoom } = useLocalRoomsStore();

  const handleCreate = () => {
    if (!title.trim() || !topic.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    createRoom(title.trim(), topic.trim());
    setTitle('');
    setTopic('');
    setCreateOpen(false);
    toast.success('Room created!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Voice Rooms</h1>
          <p className="text-muted-foreground mt-2">Discover voice-first conversations</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a Voice Room</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Room Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Late Night Thoughts"
                />
              </div>
              <div className="space-y-2">
                <Label>Topic</Label>
                <Textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What will you discuss?"
                  rows={3}
                />
              </div>
              <Button onClick={handleCreate} className="w-full">Create Room</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sound Wave Divider */}
      <div className="w-full h-16 opacity-30">
        <img
          src="/assets/generated/soundwave-divider.dim_1920x240.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Rooms Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <GlassCard key={room.id} hover onClick={() => navigate({ to: `/rooms/${room.id}` })}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-zen-glow flex items-center justify-center">
                  <Radio className="w-6 h-6 text-white" />
                </div>
                {room.isDemo && <Badge variant="secondary">Demo</Badge>}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-1">{room.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{room.topic}</p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-border/30">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {room.participants.length} listening
                </span>
                <Badge variant="outline" className="ml-auto">Voice Only</Badge>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-16">
          <Radio className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No rooms yet</h3>
          <p className="text-muted-foreground mb-6">Create the first voice room</p>
        </div>
      )}
    </div>
  );
}

