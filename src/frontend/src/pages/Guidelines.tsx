import GlassCard from '../components/zen/GlassCard';
import { Shield, Heart, Users, AlertCircle } from 'lucide-react';

export default function Guidelines() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Community Guidelines</h1>
        <p className="text-muted-foreground">Creating a safe space for everyone</p>
      </div>

      <GlassCard>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Your voice is safe here</h3>
              <p className="text-muted-foreground">
                ZENLINK is a judgment-free zone. Share your thoughts, struggles, and growth journey 
                without fear. We're all here to support each other.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Respect anonymity</h3>
              <p className="text-muted-foreground">
                Never share personal identifying information—yours or others'. This includes real names, 
                locations, contact details, or any information that could reveal identity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Engage with empathy</h3>
              <p className="text-muted-foreground">
                Listen actively, respond thoughtfully, and approach every interaction with kindness. 
                We're all on our own growth journeys.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Take your time</h3>
              <p className="text-muted-foreground">
                There's no rush. Reflect before you respond. Quality matters more than quantity. 
                This is a space for meaningful connection, not quick reactions.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-xl font-semibold mb-4">What's Not Allowed</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-destructive mt-1">•</span>
            <span>Harassment, bullying, or personal attacks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-destructive mt-1">•</span>
            <span>Sharing personal information (yours or others')</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-destructive mt-1">•</span>
            <span>Hate speech, discrimination, or harmful content</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-destructive mt-1">•</span>
            <span>Spam, advertising, or self-promotion</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-destructive mt-1">•</span>
            <span>Providing medical or therapeutic advice (peer support only)</span>
          </li>
        </ul>
      </GlassCard>

      <GlassCard>
        <h3 className="text-xl font-semibold mb-4">Crisis Resources</h3>
        <p className="text-muted-foreground mb-4">
          ZENLINK is not a substitute for professional help. If you're in crisis, please reach out to:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>• National Suicide Prevention Lifeline: 988</li>
          <li>• Crisis Text Line: Text HOME to 741741</li>
          <li>• International Association for Suicide Prevention: iasp.info</li>
        </ul>
      </GlassCard>
    </div>
  );
}

