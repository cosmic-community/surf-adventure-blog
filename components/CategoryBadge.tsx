import Link from 'next/link';
import { Category } from '@/types';

interface CategoryBadgeProps {
  category: Category;
  small?: boolean;
}

export default function CategoryBadge({ category, small = false }: CategoryBadgeProps) {
  const style = {
    backgroundColor: category.metadata.color ? `${category.metadata.color}20` : '#e5e7eb',
    color: category.metadata.color || '#374151',
    borderColor: category.metadata.color ? `${category.metadata.color}40` : '#d1d5db',
  };
  
  const sizeClasses = small 
    ? 'text-xs px-2 py-0.5' 
    : 'text-sm px-3 py-1';

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block rounded-full border ${sizeClasses} font-medium hover:opacity-90 transition-opacity`}
      style={style}
    >
      {category.title}
    </Link>
  );
}