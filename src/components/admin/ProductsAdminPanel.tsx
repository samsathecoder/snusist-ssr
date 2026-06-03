'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import './ProductsAdminPanelcss.css'; // CSS dosyasını import edin
export default function ProductsAdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showImageRenamer, setShowImageRenamer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    slug: '',
    name: '',
    price: 0,
    description: '',
    category: 'Velo',
    coverImage: '',
    seoTitle: '',
    seoDescription: '',
  });

  const [imageRenameData, setImageRenameData] = useState({
    oldName: '',
    newName: '',
  });

  // Ürünleri ve fotoğrafları yükle
  useEffect(() => {
    loadProducts();
    loadImages();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setMessage('Ürünler yüklenemedi');
    }
  };

  const loadImages = async () => {
    try {
      const res = await fetch('/api/admin/rename-image');
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error('Fotoğraflar yüklenemedi');
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      name: '',
      price: 0,
      description: '',
      category: 'Velo',
      coverImage: '',
      seoTitle: '',
      seoDescription: '',
    });
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setShowForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const url = editingId 
        ? '/api/admin/products'
        : '/api/admin/products';
      
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId 
        ? { ...formData, id: editingId }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Kaydetme başarısız');

      setMessage(editingId ? 'Ürün güncellendi ✓' : 'Ürün eklendi ✓');
      setShowForm(false);
      loadProducts();
    } catch (error) {
      setMessage('Hata: Ürün kaydedilemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Silme başarısız');

      setMessage('Ürün silindi ✓');
      loadProducts();
    } catch (error) {
      setMessage('Hata: Ürün silinemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleRenameImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/rename-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageRenameData),
      });

      if (!res.ok) throw new Error('Yeniden adlandırma başarısız');

      setMessage('Fotoğraf adı değiştirildi ✓');
      setImageRenameData({ oldName: '', newName: '' });
      loadImages();
    } catch (error) {
      setMessage('Hata: Fotoğraf adı değiştirilemedi');
    } finally {
      setLoading(false);
    }
  };

  return (

        <>
    <div className="admin-panel">
      <div className="admin-header">
        <h1>📦 Ürün Yönetim Paneli</h1>
        <div className="admin-actions">
          <button className="btn btn-primary" onClick={handleAddNew}>
            + Yeni Ürün Ekle
          </button>
          <button className="btn btn-secondary" onClick={() => setShowImageRenamer(!showImageRenamer)}>
            🖼️ Fotoğraf Yönetimi
          </button>
        </div>
      </div>

      {message && <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>{message}</div>}

      {/* Fotoğraf Yönetim Formu */}
      {showImageRenamer && (
        <div className="image-manager">
          <h2>Fotoğraf Adı Değiştir</h2>
          <form onSubmit={handleRenameImage} className="image-form">
            <div className="form-group">
              <label>Eski Dosya Adı:</label>
              <select
                value={imageRenameData.oldName}
                onChange={(e) => setImageRenameData(prev => ({ ...prev, oldName: e.target.value }))}
                required
              >
                <option value="">Seçin...</option>
                {images.map(img => (
                  <option key={img} value={img}>{img}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Yeni Dosya Adı:</label>
              <input
                type="text"
                value={imageRenameData.newName}
                onChange={(e) => setImageRenameData(prev => ({ ...prev, newName: e.target.value }))}
                placeholder="yeni-ad.jpg"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'İşleniyor...' : 'Adı Değiştir'}
            </button>
          </form>
        </div>
      )}

      {/* Ürün Form */}
      {showForm && (
        <div className="product-form">
          <h2>{editingId ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
          <form onSubmit={handleSaveProduct}>
            <div className="form-row">
              <div className="form-group">
                <label>Başlık *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug || ''}
                  onChange={handleFormChange}
                  required
                  placeholder="velo-crispy-peppermint"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Fiyat *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || 0}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Kategori *</label>
                <select
                  name="category"
                  value={formData.category || 'Velo'}
                  onChange={handleFormChange}
                  required
                >
                  <option value="Velo">Velo</option>
                  <option value="Pablo">Pablo</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Killa">Killa</option>
                  <option value="Siberia">Siberia</option>
                  <option value="Garant">Garant</option>
                                    <option value="Odens">Odens</option>
                  <option value="Fox">Fox</option>
                  <option value="D.L.T.A">D.L.T.A</option>

                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Kapak Fotoğrafı</label>
              <select
                name="coverImage"
                value={formData.coverImage || ''}
                onChange={handleFormChange}
              >
                <option value="">Seçin...</option>
                {images.map(img => (
                  <option key={img} value={img}>{img}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Açıklama (HTML) *</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleFormChange}
                required
                rows={6}
              />
            </div>

            <div className="form-group">
              <label>SEO Başlığı</label>
              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle || ''}
                onChange={handleFormChange}
              />
            </div>

            <div className="form-group">
              <label>SEO Açıklaması</label>
              <textarea
                name="seoDescription"
                value={formData.seoDescription || ''}
                onChange={handleFormChange}
                rows={2}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowForm(false)}
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ürün Listesi */}
      <div className="products-list">
        <h2>Ürünler ({products.length})</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h3>{product.title}</h3>
                <span className="category">{product.category}</span>
              </div>
              <div className="product-info">
                <p><strong>Slug:</strong> {product.slug}</p>
                <p><strong>Fiyat:</strong> ₺{product.price}</p>
                {product.coverImage && <p><strong>Fotoğraf:</strong> {product.coverImage}</p>}
              </div>
              <div className="product-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(product)}
                >
                  Düzenle
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
     </>
    
     
  );

}
