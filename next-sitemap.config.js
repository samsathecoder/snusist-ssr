/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://snusist.com', 
  generateRobotsTxt: true, 
  sitemapSize: 5000,
  exclude: ['/admin/*'],
  changefreq: 'weekly',
  priority: 0.7,
};