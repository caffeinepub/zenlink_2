import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Comment {
  id: string;
  author: string;
  postId: string;
  content: string;
  timestamp: number;
  likes: number;
}

interface Post {
  id: string;
  author: string;
  category: string;
  content: string;
  timestamp: number;
  comments: Comment[];
  isDemo: boolean;
}

interface WallStore {
  posts: Post[];
  page: number;
  hasMore: boolean;
  addPost: (content: string, category: string) => void;
  addComment: (postId: string, content: string) => void;
  likeComment: (postId: string, commentId: string) => void;
  loadMore: () => void;
  reset: () => void;
}

const DEMO_POSTS: Post[] = [
  {
    id: 'demo-1',
    author: 'MoonWalker',
    category: 'Anxiety',
    content: 'I\'ve been struggling with social anxiety for years. Every time I need to speak in a group, my heart races and I freeze. How do you all cope with this?',
    timestamp: Date.now() - 86400000,
    comments: [
      {
        id: 'demo-c1',
        author: 'SilentThoughts',
        postId: 'demo-1',
        content: 'I relate so much. What helped me was starting small - just speaking up once in smaller groups. Build confidence gradually.',
        timestamp: Date.now() - 43200000,
        likes: 5
      }
    ],
    isDemo: true
  },
  {
    id: 'demo-2',
    author: 'ZenSeeker',
    category: 'Personal Growth',
    content: 'After months of self-doubt, I finally took the leap and applied for my dream job. Regardless of the outcome, I\'m proud of myself for trying.',
    timestamp: Date.now() - 172800000,
    comments: [],
    isDemo: true
  }
];

export const useLocalWallStore = create<WallStore>()(
  persist(
    (set, get) => ({
      posts: DEMO_POSTS,
      page: 1,
      hasMore: false,
      
      addPost: (content, category) => {
        const newPost: Post = {
          id: `post-${Date.now()}`,
          author: 'You',
          category,
          content,
          timestamp: Date.now(),
          comments: [],
          isDemo: false
        };
        set({ posts: [newPost, ...get().posts] });
      },
      
      addComment: (postId, content) => {
        set({
          posts: get().posts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  comments: [
                    ...post.comments,
                    {
                      id: `comment-${Date.now()}`,
                      author: 'You',
                      postId,
                      content,
                      timestamp: Date.now(),
                      likes: 0
                    }
                  ]
                }
              : post
          )
        });
      },
      
      likeComment: (postId, commentId) => {
        set({
          posts: get().posts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  comments: post.comments.map(comment =>
                    comment.id === commentId
                      ? { ...comment, likes: comment.likes + 1 }
                      : comment
                  )
                }
              : post
          )
        });
      },
      
      loadMore: () => {
        set({ page: get().page + 1 });
      },
      
      reset: () => {
        set({ posts: DEMO_POSTS, page: 1, hasMore: false });
      }
    }),
    {
      name: 'zenlink-wall-storage'
    }
  )
);

