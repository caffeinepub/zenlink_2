import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/zen/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useLocalCirclesStore } from '../lib/localCirclesStore';

export default function Circles() {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { circles, createCircle, joinCircle } = useLocalCirclesStore();

  const handleCreate = () => {
    if (!name.trim() || !description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    createCircle(name.trim(), description.trim());
    setName('');
    setDescription('');
    setCreateOpen(false);
    toast.success('Circle created!');
  };

  const handleJoin = () => {
    if (!inviteCode.trim()) {
      toast.error('Please enter an invite code');
      return;
    }

    const success = joinCircle(inviteCode.trim());
    if (success) {
      setInviteCode('');
      setJoinOpen(false);
      toast.success('Joined circle!');
    } else {
      toast.error('Invalid invite code or circle is full');
    }
  };

  const copyInviteCode = (circleId: string) => {
    navigator.clipboard.writeText(circleId);
    setCopiedId(circleId);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Invite code copied!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Growth Circles</h1>
          <p className="text-muted-foreground mt-2">Small groups for meaningful connection</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Join Circle</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join a Circle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Invite Code</Label>
                  <Input
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="Enter invite code"
                  />
                </div>
                <Button onClick={handleJoin} className="w-full">Join</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Circle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a Growth Circle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Circle Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Confidence Builders"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this circle about?"
                    rows={3}
                  />
                </div>
                <Button onClick={handleCreate} className="w-full">Create Circle</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Circles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {circles.map((circle) => (
          <GlassCard key={circle.id} hover onClick={() => navigate({ to: `/circles/${circle.id}` })}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                {circle.isDemo && <Badge variant="secondary">Demo</Badge>}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-1">{circle.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{circle.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <span className="text-sm text-muted-foreground">
                  {circle.members.length}/8 members
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyInviteCode(circle.id);
                  }}
                >
                  {copiedId === circle.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {circles.length === 0 && (
        <div className="text-center py-16">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No circles yet</h3>
          <p className="text-muted-foreground mb-6">Create your first circle or join one with an invite code</p>
        </div>
      )}
    </div>
  );
}

