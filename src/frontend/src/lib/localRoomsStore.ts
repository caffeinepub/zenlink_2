import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Room {
  id: string;
  title: string;
  topic: string;
  creator: string;
  participants: string[];
  isDemo: boolean;
}

interface RoomsStore {
  rooms: Room[];
  createRoom: (title: string, topic: string) => void;
  getRoom: (id: string) => Room | undefined;
  reset: () => void;
}

const DEMO_ROOMS: Room[] = [
  {
    id: 'demo-room-1',
    title: 'Overcoming Anxiety Together',
    topic: 'Share your experiences and coping strategies for managing anxiety',
    creator: 'MoonWalker',
    participants: ['MoonWalker', 'ZenSeeker', 'SilentThoughts'],
    isDemo: true
  }
];

export const useLocalRoomsStore = create<RoomsStore>()(
  persist(
    (set, get) => ({
      rooms: DEMO_ROOMS,
      
      createRoom: (title, topic) => {
        const newRoom: Room = {
          id: `room-${Date.now()}`,
          title,
          topic,
          creator: 'You',
          participants: ['You'],
          isDemo: false
        };
        set({ rooms: [...get().rooms, newRoom] });
      },
      
      getRoom: (id) => {
        return get().rooms.find(r => r.id === id);
      },
      
      reset: () => {
        set({ rooms: DEMO_ROOMS });
      }
    }),
    {
      name: 'zenlink-rooms-storage'
    }
  )
);

