
// Sitemap generator for Nexus Software Development Agency
export const generateSitemap = () => {
  const baseUrl = 'https://nexus-agency.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const pages = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/products', changefreq: 'monthly', priority: '0.9' },
    { url: '/pricing', changefreq: 'monthly', priority: '0.8' },
    { url: '/support', changefreq: 'weekly', priority: '0.7' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return sitemap;
};

// Generate and log sitemap (for development)
export const logSitemap = () => {
  console.log('Generated Sitemap:');
  console.log(generateSitemap());
};
