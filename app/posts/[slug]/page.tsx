// app/posts/[slug]/page.tsx
import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/cosmic';
import PostContent from '@/components/PostContent';
import AuthorCard from '@/components/AuthorCard';
import { notFound } from 'next/navigation';
import CategoryBadge from '@/components/CategoryBadge';
import { format } from 'date-fns';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for the post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get the slug from the params
  const { slug } = await params;
  
  // Get the post data
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.metadata.title || post.title,
    description: post.metadata.excerpt || '',
    openGraph: {
      images: post.metadata.featured_image ? [post.metadata.featured_image.imgix_url] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  // Get the slug from the params
  const { slug } = await params;
  
  // Get the post data
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="container py-8">
      <article className="max-w-4xl mx-auto">
        {/* Post header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.metadata.title || post.title}
          </h1>
          
          {post.metadata.excerpt && (
            <p className="text-lg text-gray-600 mb-4">
              {post.metadata.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className="flex flex-wrap gap-2">
              {post.metadata.categories?.map((category) => (
                <CategoryBadge key={category.id} category={category} />
              ))}
            </div>
            
            <time className="text-sm text-gray-500">
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </time>
          </div>
          
          {post.metadata.location && (
            <div className="text-sm text-gray-600 mb-4">
              📍 {post.metadata.location}
            </div>
          )}
        </header>
        
        {/* Featured image */}
        {post.metadata.featured_image && (
          <div className="mb-8">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1200}
              height={600}
              className="rounded-lg w-full object-cover"
            />
          </div>
        )}
        
        {/* Post content */}
        <div className="prose max-w-none mb-12">
          <PostContent content={post.metadata.content || ''} />
        </div>
        
        {/* Tags */}
        {post.metadata.tags && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.split(',').map((tag) => (
                <span key={tag.trim()} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Author */}
        {post.metadata.author && (
          <div className="border-t pt-8">
            <h3 className="text-lg font-semibold mb-4">About the Author</h3>
            <AuthorCard author={post.metadata.author} />
          </div>
        )}
      </article>
    </div>
  );
}