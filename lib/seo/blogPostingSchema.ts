export interface BlogPostingInput {
  title: string;
  description: string;
  url: string;
  datePublished: string;
}

export function buildBlogPostingSchema(post: BlogPostingInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: post.url,
    datePublished: post.datePublished,
    author: {
      '@type': 'Organization',
      name: 'Seu Vendedor IA',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Seu Vendedor IA',
    },
  };
}
