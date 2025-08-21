import Link from 'next/link';
import { Post } from '@/types';
import CategoryBadge from '@/components/CategoryBadge';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
  className?: string;
}

export default function PostCard({ post, className = '' }: PostCardProps) {
  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      <Link href={`/posts/${post.slug}`} className="block">
        {post.metadata.featured_image && (
          <div className="relative aspect-video">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=600&h=340&fit=crop&auto=format,compress`}
              alt={post.title}
              width={600}
              height={340}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-5">
          <h2 className="text-xl font-bold mb-2 hover:text-surf-blue">
            {post.metadata.title || post.title}
          </h2>
          
          {post.metadata.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-2">
              {post.metadata.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap gap-2">
              {post.metadata.categories?.slice(0, 1).map((category) => (
                <CategoryBadge key={category.id} category={category} small />
              ))}
            </div>
            
            <time className="text-xs text-gray-500">
              {format(new Date(post.created_at), 'MMM d, yyyy')}
            </time>
          </div>
          
          {post.metadata.author && (
            <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
              {post.metadata.author.metadata.profile_photo && (
                <img
                  src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  width={40}
                  height={40}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              )}
              <span className="text-sm text-gray-600">
                By {post.metadata.author.title}
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}