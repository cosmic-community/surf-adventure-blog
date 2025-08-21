import Link from 'next/link';
import { Category } from '@/types';

interface MobileMenuProps {
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
}

export default function MobileMenu({ isOpen, categories, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      
      {/* Menu Panel */}
      <div className="fixed right-0 top-0 w-64 h-full bg-white shadow-lg overflow-y-auto">
        {/* Menu Header with Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-surf-blue">Surf Adventure Blog</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link 
                href="/" 
                className="block py-2 text-gray-800 hover:text-surf-blue"
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/travel-guides" 
                className="block py-2 text-green-600 hover:text-green-700"
                onClick={onClose}
              >
                Travel Guides
              </Link>
            </li>
            <li>
              <Link 
                href="/surf-spots" 
                className="block py-2 text-surf-blue hover:text-blue-600"
                onClick={onClose}
              >
                Surf Spots
              </Link>
            </li>
            <li>
              <Link 
                href="/surf-culture" 
                className="block py-2 text-purple-600 hover:text-purple-700"
                onClick={onClose}
              >
                Surf Culture
              </Link>
            </li>
            <li>
              <Link 
                href="/gear-reviews" 
                className="block py-2 text-amber-600 hover:text-amber-700"
                onClick={onClose}
              >
                Gear Reviews
              </Link>
            </li>
            
            {/* Categories Section */}
            {categories.length > 0 && (
              <>
                <li className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">Categories</h3>
                  <ul className="space-y-2 pl-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link 
                          href={`/categories/${category.slug}`}
                          className="block py-1 text-gray-700 hover:text-surf-blue"
                          onClick={onClose}
                          style={{
                            color: category.metadata.color || '#4B5563'
                          }}
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}