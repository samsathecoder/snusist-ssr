/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
async redirects() {
    return [
      // 1. KESTİRME: İçinde "product-page" geçen ne varsa (en/tr fark etmez) direkt /products altına pasla
      {
        source: '/:lang*/product-page/:slug*',
        destination: '/products/:slug*',
        permanent: true,
      },

      // 2. KESTİRME: Eski "category" veya "shop-all" geçen ne varsa direkt yeni /categories altına pasla
      {
        source: '/:lang*/category/:slug*',
        destination: '/categories/:slug*',
        permanent: true,
      },
      {
        source: '/:lang*/category-all-products/:slug*',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/:lang*/shop-all/:slug*',
        destination: '/categories',
        permanent: true,
      },

      // 3. KESTİRME: Eski "post" veya "blog/tags" içeren her şeyi yeni bloga gönder
      {
        source: '/post/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      {
        source: '/blog/tags/:slug*',
        destination: '/blog',
        permanent: true,
      },

      // 4. KESTİRME: Geri kalan tüm teknik çöpleri (profil, arama, anasayfa, xml) tek tek yazma, direkt ana sayfaya fırlat
      {
        source: '/profile/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:lang*/search-results',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:lang*/search',
        destination: '/',
        permanent: true,
      },
      {
        source: '/anasayfa',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cart-page',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:lang*/blog-feed.xml',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/',
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
