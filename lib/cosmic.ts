import { createBucketClient } from '@cosmicjs/sdk';
import { Category, Post, Author, CosmicResponse, hasStatus } from '@/types';

// Initialize the Cosmic client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
});

// Fetch posts with pagination
export async function getPosts(limit = 10, skip = 0): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .limit(limit)
      .skip(skip)
      .sort('-created_at');
    
    return response.objects as Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []; // Return empty array if no posts found
    }
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object as Post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null; // Return null if post not found
    }
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: string, limit = 10): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.categories': categoryId,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .limit(limit)
      .sort('-created_at');
    
    return response.objects as Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []; // Return empty array if no posts found
    }
    console.error('Error fetching posts by category:', error);
    throw new Error('Failed to fetch posts by category');
  }
}

// Fetch posts by author
export async function getPostsByAuthor(authorId: string, limit = 10): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorId,
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .limit(limit)
      .sort('-created_at');
    
    return response.objects as Post[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []; // Return empty array if no posts found
    }
    console.error('Error fetching posts by author:', error);
    throw new Error('Failed to fetch posts by author');
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'categories',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    // Ensure all categories have a color value, defaulting to a fallback if not present
    const categories = response.objects.map(cat => {
      // If category doesn't have a color, add a default one
      if (!cat.metadata?.color) {
        return {
          ...cat,
          metadata: {
            ...cat.metadata,
            color: '#6B7280' // Default gray color
          }
        };
      }
      return cat;
    }) as Category[];
    
    return categories;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []; // Return empty array if no categories found
    }
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

// Fetch a single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    // If category exists but doesn't have a color, add a default one
    if (response.object && !response.object.metadata?.color) {
      return {
        ...response.object,
        metadata: {
          ...response.object.metadata,
          color: '#6B7280' // Default gray color
        }
      } as Category;
    }
    
    return response.object as Category;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null; // Return null if category not found
    }
    console.error('Error fetching category:', error);
    throw new Error('Failed to fetch category');
  }
}

// Fetch all authors
export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'authors',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    return response.objects as Author[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []; // Return empty array if no authors found
    }
    console.error('Error fetching authors:', error);
    throw new Error('Failed to fetch authors');
  }
}

// Fetch a single author by slug
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'authors',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object as Author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null; // Return null if author not found
    }
    console.error('Error fetching author:', error);
    throw new Error('Failed to fetch author');
  }
}