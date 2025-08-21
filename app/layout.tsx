import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBadge from '@/components/CosmicBadge';
import { getCategories } from '@/lib/cosmic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Surf Adventure Blog - Explore Surf Spots Worldwide',
  description: 'Discover amazing surf spots, travel guides, and surf culture from around the world.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header categories={categories} />
          <main className="flex-grow pt-[72px]">
            {children}
          </main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </div>
      </body>
    </html>
  );
}