import Link from 'next/link';
import { getCategories } from '@/lib/cosmic';

export default async function Footer() {
  const categories = await getCategories();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Surf Adventure Blog</h3>
            <p className="text-gray-300">
              Discover amazing surf spots, travel guides, and surf culture from around the world.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/categories/${category.slug}`}
                    className="text-gray-300 hover:text-white"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.cosmicjs.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  Powered by Cosmic
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Surf Adventure Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}