import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Circle {
  id: string;
  name: string;
  description: string;
  members: string[];
  admin: string;
  isDemo: boolean;
  weeklyPrompt: string;
}

interface CirclesStore {
  circles: Circle[];
  createCircle: (name: string, description: string) => void;
  joinCircle: (inviteCode: string) => boolean;
  getCircle: (id: string) => Circle | undefined;
  reset: () => void;
}

const DEMO_CIRCLES: Circle[] = [
  {
    id: 'demo-circle-1',
    name: 'Confidence Builders',
    description: 'A supportive space for building self-confidence and overcoming self-doubt',
    members: ['MoonWalker', 'ZenSeeker', 'SilentThoughts'],
    admin: 'MoonWalker',
    isDemo: true,
    weeklyPrompt: 'Share a moment this week when you felt proud of yourself, no matter how small.'
  }
];

export const useLocalCirclesStore = create<CirclesStore>()(
  persist(
    (set, get) => ({
      circles: DEMO_CIRCLES,
      
      createCircle: (name, description) => {
        const newCircle: Circle = {
          id: `circle-${Date.now()}`,
          name,
          description,
          members: ['You'],
          admin: 'You',
          isDemo: false,
          weeklyPrompt: 'What growth goal are you focusing on this week?'
        };
        set({ circles: [...get().circles, newCircle] });
      },
      
      joinCircle: (inviteCode) => {
        const circle = get().circles.find(c => c.id === inviteCode);
        if (!circle || circle.members.length >= 8) return false;
        
        if (circle.members.includes('You')) return false;
        
        set({
          circles: get().circles.map(c =>
            c.id === inviteCode
              ? { ...c, members: [...c.members, 'You'] }
              : c
          )
        });
        return true;
      },
      
      getCircle: (id) => {
        return get().circles.find(c => c.id === id);
      },
      
      reset: () => {
        set({ circles: DEMO_CIRCLES });
      }
    }),
    {
      name: 'zenlink-circles-storage'
    }
  )
);

