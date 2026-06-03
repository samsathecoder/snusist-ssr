/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
async redirects() {
    return [
      // 1. Eski "product-page" yapısını yeni "products" yapısına kalıcı yönlendir
      {
        source: '/product-page/:slug',
        destination: '/products/:slug',
        permanent: true, // 301 SEO yönlendirmesi
      },
      // 2. Eski "category" yapısını yeni "categories" yapısına kalıcı yönlendir
      {
        source: '/category/:slug',
        destination: '/categories/:slug',
        permanent: true,
      },
      // 3. İngilizce dil sayfalarından kalan artıkları ana yapılara yönlendir
      {
        source: '/en/product-page/:slug',
        destination: '/products/:slug',
        permanent: true,
      },
      {
        source: '/en/search',
        destination: '/', // Arama sayfası yoksa ana sayfaya çekin
        permanent: true,
      },
      // 4. Eski blog yapılarını yeni blog yapısına aktar
      {
        source: '/post/:slug',
        destination: '/blog/:slug',
        permanent: true,
      }
    ];
  },



  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "2iqklps06o.ufs.sh",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
