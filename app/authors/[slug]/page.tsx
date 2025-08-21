// app/authors/[slug]/page.tsx
import { Metadata } from 'next';
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/cosmic';
import PostGrid from '@/components/PostGrid';
import { notFound } from 'next/navigation';
import { FaInstagram, FaGlobe } from 'react-icons/fa';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for the author
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get the slug from the params
  const { slug } = await params;
  
  // Get the author data
  const author = await getAuthorBySlug(slug);
  
  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }
  
  return {
    title: `${author.title} - Surf Adventure Blog`,
    description: author.metadata.bio || `Browse all posts by ${author.title}.`,
    openGraph: {
      images: author.metadata.profile_photo ? [author.metadata.profile_photo.imgix_url] : [],
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  // Get the slug from the params
  const { slug } = await params;
  
  // Get the author data
  const author = await getAuthorBySlug(slug);
  
  if (!author) {
    notFound();
  }
  
  // Get posts by this author
  const posts = await getPostsByAuthor(author.id);

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {author.metadata.profile_photo && (
              <div className="shrink-0">
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                  alt={author.title}
                  width={200}
                  height={200}
                  className="rounded-full w-36 h-36 object-cover border-4 border-white shadow-lg"
                />
              </div>
            )}
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{author.title}</h1>
              
              {author.metadata.years_surfing && (
                <p className="text-gray-600 mb-2">
                  Surfing for {author.metadata.years_surfing} years
                </p>
              )}
              
              {author.metadata.bio && (
                <p className="text-gray-700 mb-4">{author.metadata.bio}</p>
              )}
              
              <div className="flex gap-4 justify-center md:justify-start">
                {author.metadata.instagram && (
                  <a 
                    href={`https://instagram.com/${author.metadata.instagram}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700 flex items-center gap-1"
                  >
                    <FaInstagram size={20} />
                    <span>@{author.metadata.instagram}</span>
                  </a>
                )}
                
                {author.metadata.website && (
                  <a 
                    href={author.metadata.website} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-surf-blue hover:text-blue-700 flex items-center gap-1"
                  >
                    <FaGlobe size={18} />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">Posts by {author.title}</h2>
          
          {posts.length > 0 ? (
            <PostGrid posts={posts} />
          ) : (
            <p className="text-gray-600 text-center py-12">No posts found by this author yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}