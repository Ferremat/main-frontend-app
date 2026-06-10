interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string;
}

export function useSeo(options: SeoOptions) {
  const config = useRuntimeConfig();
  const siteUrl = config.public.siteUrl as string;

  const url = options.url ? `${siteUrl}${options.url}` : siteUrl;
  const image = options.image || `${siteUrl}/og-image.png`;

  useHead({
    title: options.title,
    meta: [
      {
        name: 'description',
        content: options.description,
      },
      ...(options.keywords ? [{
        name: 'keywords',
        content: options.keywords,
      }] : []),
      // Open Graph
      {
        property: 'og:title',
        content: options.title,
      },
      {
        property: 'og:description',
        content: options.description,
      },
      {
        property: 'og:type',
        content: options.type || 'website',
      },
      {
        property: 'og:url',
        content: url,
      },
      {
        property: 'og:image',
        content: image,
      },
      // Twitter Card
      {
        name: 'twitter:title',
        content: options.title,
      },
      {
        name: 'twitter:description',
        content: options.description,
      },
      {
        name: 'twitter:image',
        content: image,
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
  });
}
