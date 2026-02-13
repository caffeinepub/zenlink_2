import GlassCard from '../components/zen/GlassCard';
import { Shield } from 'lucide-react';

export default function Moderation() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Moderation</h1>
        <p className="text-muted-foreground">Admin-only area</p>
      </div>

      <GlassCard>
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Admin Access Required</h3>
          <p className="text-muted-foreground">
            This area is restricted to administrators only.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

