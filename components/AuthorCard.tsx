import Link from 'next/link';
import { Author } from '@/types';

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start bg-gray-50 p-4 rounded-lg">
      {author.metadata.profile_photo && (
        <div className="shrink-0">
          <Link href={`/authors/${author.slug}`}>
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={author.title}
              width={120}
              height={120}
              className="rounded-full w-24 h-24 object-cover"
            />
          </Link>
        </div>
      )}
      
      <div className="text-center sm:text-left">
        <Link href={`/authors/${author.slug}`} className="inline-block mb-1">
          <h3 className="text-xl font-bold hover:text-surf-blue">{author.title}</h3>
        </Link>
        
        {author.metadata.years_surfing && (
          <p className="text-sm text-gray-600 mb-2">
            Surfing for {author.metadata.years_surfing} years
          </p>
        )}
        
        {author.metadata.bio && (
          <p className="text-gray-700 text-sm mb-3">{author.metadata.bio}</p>
        )}
        
        <div className="flex gap-4 justify-center sm:justify-start">
          {author.metadata.instagram && (
            <a 
              href={`https://instagram.com/${author.metadata.instagram}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700 text-sm"
            >
              @{author.metadata.instagram}
            </a>
          )}
          
          {author.metadata.website && (
            <a 
              href={author.metadata.website} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-surf-blue hover:text-blue-700 text-sm"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}