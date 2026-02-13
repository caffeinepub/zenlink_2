import { useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useActor } from './hooks/useActor';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Landing from './pages/Landing';
import OnboardingFlow from './pages/Onboarding/OnboardingFlow';
import Home from './pages/Home';
import Wall from './pages/Wall';
import Circles from './pages/Circles';
import CircleDetail from './pages/CircleDetail';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Connections from './pages/Connections';
import ChatThread from './pages/ChatThread';
import MBTI from './pages/MBTI';
import Profile from './pages/Profile';
import Debate from './pages/Debate';
import Progress from './pages/Progress';
import Guidelines from './pages/Guidelines';
import Moderation from './pages/Moderation';
import AppShell from './components/nav/AppShell';

// Root component that handles auth and routing logic
function RootComponent() {
  const { identity, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const isLoading = isInitializing || actorFetching || (isAuthenticated && profileLoading);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen zen-gradient-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading ZENLINK...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show landing
  if (!isAuthenticated) {
    return <Landing />;
  }

  // Authenticated but no profile or incomplete profile - show onboarding
  const needsOnboarding = isFetched && (!userProfile || !userProfile.username);
  if (needsOnboarding) {
    return <OnboardingFlow />;
  }

  // Authenticated with complete profile - show app
  return <AppShell />;
}

// Root route with layout
const rootRoute = createRootRoute({
  component: RootComponent
});

// App routes (all require auth + profile)
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
});

const wallRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wall',
  component: Wall
});

const circlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/circles',
  component: Circles
});

const circleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/circles/$circleId',
  component: CircleDetail
});

const roomsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rooms',
  component: Rooms
});

const roomDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rooms/$roomId',
  component: RoomDetail
});

const connectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/connections',
  component: Connections
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat/$userId',
  component: ChatThread
});

const mbtiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mbti',
  component: MBTI
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile
});

const debateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/debate',
  component: Debate
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/progress',
  component: Progress
});

const guidelinesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guidelines',
  component: Guidelines
});

const moderationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/moderation',
  component: Moderation
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  wallRoute,
  circlesRoute,
  circleDetailRoute,
  roomsRoute,
  roomDetailRoute,
  connectionsRoute,
  chatRoute,
  mbtiRoute,
  profileRoute,
  debateRoute,
  progressRoute,
  guidelinesRoute,
  moderationRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

