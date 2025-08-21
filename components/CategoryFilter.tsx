import Link from 'next/link';
import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="block rounded-lg border p-4 hover:shadow-md transition-shadow"
          style={{
            borderColor: category.metadata.color || '#e5e7eb',
            backgroundColor: category.metadata.color ? `${category.metadata.color}10` : '#f9fafb',
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-5 h-5 rounded-full" 
              style={{ backgroundColor: category.metadata.color || '#9ca3af' }}
              aria-hidden="true"
            />
            <h3 className="font-medium">{category.title}</h3>
          </div>
          {category.metadata.description && (
            <p className="text-sm text-gray-600 mt-2">{category.metadata.description}</p>
          )}
        </Link>
      ))}
    </div>
  );
}