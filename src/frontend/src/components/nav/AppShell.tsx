import { Outlet, useNavigate, useLocation } from '@tanstack/react-router';
import { Home, MessageSquare, Users, Radio, Link2, Brain, User, MessageCircle, Shield } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useQueryClient } from '@tanstack/react-query';

const NAV_ITEMS = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/wall', icon: MessageSquare, label: 'Wall' },
  { path: '/circles', icon: Users, label: 'Circles' },
  { path: '/rooms', icon: Radio, label: 'Rooms' },
  { path: '/connections', icon: Link2, label: 'Connections' },
  { path: '/mbti', icon: Brain, label: 'MBTI' },
  { path: '/debate', icon: MessageCircle, label: 'Debate' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clear } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen zen-gradient-bg">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:flex md:flex-col glass-card rounded-none border-r border-border/30">
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow" />
            <span className="text-xl font-bold">ZENLINK</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate({ to: item.path })}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl zen-transition
                  ${active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => navigate({ to: '/guidelines' })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl zen-transition hover:bg-muted"
          >
            <Shield className="w-5 h-5" />
            <span>Guidelines</span>
          </button>
        </nav>

        <div className="p-4 border-t border-border/30">
          {userProfile && (
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarFallback>{userProfile.username[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{userProfile.username}</p>
                <p className="text-xs text-muted-foreground">Anonymous</p>
              </div>
            </div>
          )}
          <Button variant="outline" onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-border/30 rounded-none">
        <div className="flex justify-around items-center p-2">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate({ to: item.path })}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2 rounded-lg zen-transition
                  ${active ? 'text-primary' : 'text-muted-foreground'}
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

