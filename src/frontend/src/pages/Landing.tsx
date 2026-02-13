import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Heart, Sparkles } from 'lucide-react';

export default function Landing() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen zen-gradient-bg">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Brand */}
          <div className="inline-block">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-zen-lavender to-zen-glow bg-clip-text text-transparent">
                ZENLINK
              </h1>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden glass-card p-1">
            <img
              src="/assets/generated/zenlink-hero.dim_1600x900.png"
              alt="ZENLINK - Connect Beyond Identity"
              className="w-full h-auto rounded-xl"
            />
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Connect Beyond Identity
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              A gentle space to be heard.
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ZENLINK is an anonymous emotional growth network where you connect through shared goals, 
            not vanity metrics. Experience meaningful conversations, guided reflection, and authentic 
            human connection—without the pressure of identity or ego.
          </p>

          {/* CTA */}
          <div className="pt-8">
            <Button
              size="lg"
              onClick={login}
              disabled={isLoggingIn}
              className="text-lg px-8 py-6 rounded-full zen-glow zen-transition hover:scale-105"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Connecting...
                </>
              ) : (
                <>
                  Begin Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </div>

          {/* Differentiators */}
          <div className="grid md:grid-cols-3 gap-6 pt-16">
            <div className="glass-card rounded-2xl p-6 zen-transition hover:scale-105">
              <Shield className="w-10 h-10 text-zen-lavender mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Not Social Media</h3>
              <p className="text-sm text-muted-foreground">
                No followers, no likes, no vanity metrics. Just authentic growth.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 zen-transition hover:scale-105">
              <Users className="w-10 h-10 text-zen-lavender mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Not Anonymous Chat</h3>
              <p className="text-sm text-muted-foreground">
                Structured circles and guided prompts for meaningful connection.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 zen-transition hover:scale-105">
              <Sparkles className="w-10 h-10 text-zen-lavender mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Not Therapy</h3>
              <p className="text-sm text-muted-foreground">
                Peer support and emotional intelligence development, not treatment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} ZENLINK. Built with{' '}
            <Heart className="inline w-4 h-4 text-red-500" fill="currentColor" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zen-lavender hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

