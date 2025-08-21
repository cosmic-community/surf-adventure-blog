// app/categories/[slug]/page.tsx
import { Metadata } from 'next';
import { getCategoryBySlug, getPostsByCategory } from '@/lib/cosmic';
import PostGrid from '@/components/PostGrid';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata for the category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get the slug from the params
  const { slug } = await params;
  
  // Get the category data
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }
  
  return {
    title: `${category.title} - Surf Adventure Blog`,
    description: category.metadata.description || `Browse all posts in the ${category.title} category.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  // Get the slug from the params
  const { slug } = await params;
  
  // Get the category data
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }
  
  // Get posts for this category
  const posts = await getPostsByCategory(category.id);

  return (
    <div className="container py-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{category.title}</h1>
          {category.metadata.color && (
            <div 
              className="w-6 h-6 rounded-full" 
              style={{ backgroundColor: category.metadata.color }}
              aria-hidden="true"
            />
          )}
        </div>
        
        {category.metadata.description && (
          <p className="text-gray-600">{category.metadata.description}</p>
        )}
      </header>
      
      {posts.length > 0 ? (
        <PostGrid posts={posts} />
      ) : (
        <p className="text-gray-600 text-center py-12">No posts found in this category yet.</p>
      )}
    </div>
  );
}