import Link from 'next/link';
import { getCategories } from '@/lib/cosmic';

export default async function Header() {
  const categories = await getCategories();
  
  return (
    <header className="bg-white border-b">
      <div className="container py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold text-surf-blue">
            Surf Adventure Blog
          </Link>
          
          <nav>
            <ul className="flex flex-wrap items-center gap-6">
              <li>
                <Link href="/" className="font-medium hover:text-surf-blue">
                  Home
                </Link>
              </li>
              {categories.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/categories/${category.slug}`} 
                    className="font-medium hover:text-surf-blue"
                    style={{ color: category.metadata.color }}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}