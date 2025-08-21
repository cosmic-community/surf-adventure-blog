# Surf Adventure Blog

![Surf Adventure Blog](https://imgix.cosmicjs.com/baf6adf0-7e99-11f0-8dcc-651091f6a7c0-photo-1559827260-dc66d52bef19-1755785916410.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive surf travel blog built with Next.js and Tailwind CSS. This application integrates with your Cosmic bucket to display a beautiful blog featuring surf spots, travel guides, and surf culture from around the world.

## Features

- 🏄‍♂️ Dynamic post listings with filtering by category
- 👤 Author profiles with linked articles
- 🔖 Category pages with color-coded visual indicators
- 📱 Fully responsive design for all devices
- 🔍 Search functionality across all blog posts
- 🖼️ Beautiful image handling with proper optimization
- 📝 Markdown content rendering
- 🔄 Real-time content updates from your Cosmic bucket

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68a72a25e340d628986f6202&clone_repository=68a72c43e340d628986f621f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a world travel surf blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Cosmic SDK** - For connecting to your Cosmic bucket
- **React Markdown** - For rendering markdown content
- **React Icons** - Beautiful icon library
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Cosmic account with content (already set up)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd surf-adventure-blog
```

2. Install dependencies
```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Start the development server
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

This application uses the Cosmic SDK to fetch data from your Cosmic bucket. Here are some examples of how it's used:

```typescript
// Fetching all posts
const posts = await cosmic.objects
  .find({
    type: "posts",
  })
  .props(["id", "title", "slug", "metadata"])
  .depth(1)
  .limit(10)
  .sort("-created_at");

// Fetching a single post by slug
const post = await cosmic.objects
  .findOne({
    type: "posts",
    slug: postSlug,
  })
  .props(["id", "title", "slug", "metadata"])
  .depth(1);

// Fetching posts by category
const categoryPosts = await cosmic.objects
  .find({
    type: "posts",
    "metadata.categories": categoryId,
  })
  .props(["id", "title", "slug", "metadata"])
  .depth(1)
  .limit(10)
  .sort("-created_at");
```

## Cosmic CMS Integration

This application is built specifically for your existing Cosmic content structure with:

- **Posts** - Blog articles with title, content, featured image, author, and categories
- **Authors** - Writer profiles with bio and social links
- **Categories** - Content organization with custom colors

The app dynamically fetches content from your Cosmic bucket and displays it in a beautiful, responsive layout. It preserves all relationships between content types, allowing visitors to navigate between related content.

## Deployment Options

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to a GitHub repository
2. Import the project in Netlify
3. Add your environment variables in the Netlify dashboard
4. Deploy

### Docker

1. Build the Docker image
```bash
docker build -t surf-adventure-blog .
```

2. Run the container
```bash
docker run -p 3000:3000 -e COSMIC_BUCKET_SLUG=your-bucket-slug -e COSMIC_READ_KEY=your-read-key surf-adventure-blog
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
<!-- README_END -->