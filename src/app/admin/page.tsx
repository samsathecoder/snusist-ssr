import ProductsAdminPanel from '@/components/admin/ProductsAdminPanel';

export const metadata = {
  title: 'Admin Panel - Ürün Yönetimi',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  return (
    <main>
      <ProductsAdminPanel />
    </main>
  );
}
