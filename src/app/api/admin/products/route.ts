import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';

const PRODUCTS_FILE = path.join(process.cwd(), 'public', 'data', 'products.json');

// GET - Tüm ürünleri al
export async function GET() {
  try {
    if (!fs.existsSync(PRODUCTS_FILE)) {
      return NextResponse.json([], { status: 200 });
    }
    const fileContents = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(fileContents);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Ürünler okunamadı' }, { status: 500 });
  }
}

// POST - Yeni ürün ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!fs.existsSync(PRODUCTS_FILE)) {
      fs.writeFileSync(PRODUCTS_FILE, '[]', 'utf8');
    }
    
    let products: Product[] = [];
    const fileContents = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    products = JSON.parse(fileContents);
    
    // Yeni ID oluştur
    const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
    const newProduct: Product = {
      ...body,
      id: maxId + 1,
    };
    
    products.push(newProduct);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Ürün oluşturulamadı' }, { status: 500 });
  }
}

// PUT - Ürün güncelle
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
    }
    
    if (!fs.existsSync(PRODUCTS_FILE)) {
      return NextResponse.json({ error: 'Ürünler dosyası bulunamadı' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    let products: Product[] = JSON.parse(fileContents);
    
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
    }
    
    products[index] = { ...products[index], ...body };
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
    
    return NextResponse.json(products[index]);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Ürün güncellenemedi' }, { status: 500 });
  }
}

// DELETE - Ürün sil
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID gerekli' }, { status: 400 });
    }
    
    if (!fs.existsSync(PRODUCTS_FILE)) {
      return NextResponse.json({ error: 'Ürünler dosyası bulunamadı' }, { status: 404 });
    }
    
    const fileContents = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    let products: Product[] = JSON.parse(fileContents);
    
    const initialLength = products.length;
    products = products.filter(p => p.id !== parseInt(id));
    
    if (products.length === initialLength) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
    }
    
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
    
    return NextResponse.json({ message: 'Ürün silindi' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Ürün silinemedi' }, { status: 500 });
  }
}
