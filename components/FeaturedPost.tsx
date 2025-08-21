import Link from 'next/link';
import { Post } from '@/types';
import CategoryBadge from '@/components/CategoryBadge';
import { format } from 'date-fns';

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="md:flex">
        {post.metadata.featured_image && (
          <div className="md:w-1/2">
            <Link href={`/posts/${post.slug}`} className="block">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                width={800}
                height={600}
                className="w-full h-full object-cover md:h-96"
              />
            </Link>
          </div>
        )}
        
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.metadata.categories?.map((category) => (
                <CategoryBadge key={category.id} category={category} />
              ))}
            </div>
            
            <Link href={`/posts/${post.slug}`} className="block">
              <h2 className="text-2xl font-bold mb-3 hover:text-surf-blue">
                {post.metadata.title || post.title}
              </h2>
            </Link>
            
            {post.metadata.excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.metadata.excerpt}
              </p>
            )}
          </div>
          
          <div className="mt-4">
            {post.metadata.author && (
              <div className="flex items-center">
                {post.metadata.author.metadata.profile_photo && (
                  <img
                    src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=60&h=60&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    width={60}
                    height={60}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                )}
                <div>
                  <Link 
                    href={`/authors/${post.metadata.author.slug}`}
                    className="text-sm font-medium hover:text-surf-blue"
                  >
                    {post.metadata.author.title}
                  </Link>
                  <div className="text-xs text-gray-500">
                    {format(new Date(post.created_at), 'MMMM d, yyyy')}
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4">
              <Link 
                href={`/posts/${post.slug}`}
                className="inline-block px-4 py-2 bg-surf-blue text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}