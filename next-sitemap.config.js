/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://snusist.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/private/*'],
  sitemapSize: 5000,
};

module.exports = config;
