import { useState } from 'react';
import GlassCard from '../components/zen/GlassCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Heart, UserPlus, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useLocalWallStore } from '../lib/localWallStore';

const CATEGORIES = ['Mental Health', 'Personal Growth', 'Relationships', 'Career', 'Anxiety', 'Confidence'];

export default function Wall() {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  
  const { posts, addPost, addComment, likeComment, loadMore, hasMore } = useLocalWallStore();

  const handlePost = () => {
    if (!content.trim() || !category) {
      toast.error('Please fill in all fields');
      return;
    }

    addPost(content.trim(), category);
    setContent('');
    setCategory('');
    toast.success('Posted anonymously');
  };

  const handleComment = (postId: string) => {
    const text = commentText[postId]?.trim();
    if (!text) return;

    addComment(postId, text);
    setCommentText({ ...commentText, [postId]: '' });
    toast.success('Comment added');
  };

  const handleConnect = (userId: string) => {
    toast.success('Connection request sent!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Global Wall</h1>
        <p className="text-muted-foreground">Share your thoughts anonymously, receive support</p>
      </div>

      {/* Post Composer */}
      <GlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Share Your Thoughts</h3>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share your struggles, thoughts, or questions..."
            rows={4}
            maxLength={500}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{content.length}/500</span>
            <Button onClick={handlePost}>Post Anonymously</Button>
          </div>
        </div>
      </GlassCard>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <GlassCard key={post.id}>
            <div className="space-y-4">
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zen-lavender to-zen-glow" />
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(post.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{post.category}</Badge>
              </div>

              {/* Post Content */}
              <p className="text-foreground leading-relaxed">{post.content}</p>

              {/* Post Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border/30">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {post.comments.length} comments
                </span>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="space-y-3 pl-4 border-l-2 border-border/30">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zen-moon to-zen-lavender" />
                          <p className="font-medium text-sm">{comment.author}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleConnect(comment.author)}
                          className="text-xs"
                        >
                          <UserPlus className="w-3 h-3 mr-1" />
                          Connect
                        </Button>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => likeComment(post.id, comment.id)}
                        className="text-xs"
                      >
                        <Heart className={`w-3 h-3 mr-1 ${comment.likes > 0 ? 'fill-current text-red-500' : ''}`} />
                        {comment.likes} helpful
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment */}
              <div className="flex gap-2">
                <Textarea
                  value={commentText[post.id] || ''}
                  onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                  placeholder="Share your advice or support..."
                  rows={2}
                  className="flex-1"
                />
                <Button onClick={() => handleComment(post.id)}>Comment</Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <Button variant="outline" onClick={loadMore}>
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
}

