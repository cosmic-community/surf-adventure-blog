import { getPosts, getCategories } from '@/lib/cosmic';
import PostGrid from '@/components/PostGrid';
import CategoryFilter from '@/components/CategoryFilter';
import FeaturedPost from '@/components/FeaturedPost';

export default async function Home() {
  const posts = await getPosts(9);
  const categories = await getCategories();
  
  // Get the first post as featured post if available
  const featuredPost = posts.length > 0 ? posts[0] : null;
  // Remove the featured post from the main grid
  const remainingPosts = featuredPost ? posts.slice(1) : posts;

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Surf Adventure Blog</h1>
      
      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Article</h2>
          <FeaturedPost post={featuredPost} />
        </div>
      )}
      
      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Explore Categories</h2>
        <CategoryFilter categories={categories} />
      </div>
      
      {/* Recent Posts */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Recent Articles</h2>
        <PostGrid posts={remainingPosts} />
      </div>
    </div>
  );
}