import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// POST - Fotoğraf dosyasını yeniden adlandır
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { oldName, newName } = body;
    
    if (!oldName || !newName) {
      return NextResponse.json({ error: 'Eski ve yeni dosya adı gerekli' }, { status: 400 });
    }
    
    // Dosya adlarını sanitize et (güvenlik için)
    const sanitizedOld = path.basename(oldName);
    const sanitizedNew = path.basename(newName);
    
    const oldPath = path.join(process.cwd(), 'public', 'images', 'optimized', sanitizedOld);
    const newPath = path.join(process.cwd(), 'public', 'images', 'optimized', sanitizedNew);
    
    // Dosyanın var olduğunu kontrol et
    if (!fs.existsSync(oldPath)) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 });
    }
    
    // Yeni dosya adının zaten var olup olmadığını kontrol et
    if (fs.existsSync(newPath)) {
      return NextResponse.json({ error: 'Aynı adlı dosya zaten var' }, { status: 400 });
    }
    
    // Dosyayı yeniden adlandır
    fs.renameSync(oldPath, newPath);
    
    return NextResponse.json({ 
      message: 'Dosya başarıyla yeniden adlandırıldı',
      oldName: sanitizedOld,
      newName: sanitizedNew
    });
  } catch (error) {
    console.error('Error renaming image:', error);
    return NextResponse.json({ error: 'Dosya yeniden adlandırılamadı' }, { status: 500 });
  }
}

// GET - Mevcut fotoğrafları listele
export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'optimized');
    
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json([], { status: 200 });
    }
    
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json({ error: 'Fotoğraflar listenemedi' }, { status: 500 });
  }
}
