const connectDB = require('./src/lib/mongoose').default;
const Product = require('./src/models/Product').default;

module.exports = {
  siteUrl: 'https://snusist.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
   exclude: [
    '/admin',        // admin ana sayfa
    '/admin/*',      // admin alt sayfalar
  ],

  async additionalPaths(config) {
    await connectDB();
    const products = await Product.find().select('slug').lean();
    return products.map(p => ({
      loc: `/products/${p.slug}`, // sitemap URL
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    }));
  },
};