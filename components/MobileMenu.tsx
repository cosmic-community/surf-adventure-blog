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
    <div className="md:hidden w-full bg-white border-t shadow-md">
      {/* Menu Items */}
      <nav className="container py-4">
        <ul className="space-y-3">
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
  );
}