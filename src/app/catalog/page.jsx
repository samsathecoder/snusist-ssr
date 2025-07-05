

import React from "react";
import './catalog.css';
import { products } from '@/src/app/data/products';


export default function Catalog(){

const product = products;

  const displayProducts = () => {



    return product.map((product, index) => {
      return (
        <div className="product" key={index}>
  <picture>
  <source
    srcSet={`/images/${product.name}-image-320w.webp 320w, 
             /images/${product.name}-image-480w.webp 480w, 
             /images/${product.name}-image-800w.webp 800w`}
    sizes="(max-width: 320px) 320px, (max-width: 480px) 480px, 800px"
    type="image/webp"
  />
  <source 
    srcSet={`/images/${product.name}-image-320w.webp 320w, 
             /images/${product.name}-image-480w.webp 480w, 
             /images/${product.name}-image-800w.webp 800w`}
    sizes="(max-width: 320px) 320px, (max-width: 480px) 480px, 800px"
    type="image/jpeg"
  />
  <img
    loading="lazy"
    src={`/images/${product.name}-image.webp`}
    alt={product.name}
    className="w-full h-auto rounded-lg shadow"
  />
</picture>
          <div className="info">
            <p>{product.name}</p>
          </div>
          <div className={`stok-bilgi ${product.stoktaVar ? 'stokta-var' : 'stokta-yok'}`}>
            {product.stoktaVar ? 'Stokta Var- In Stock' : 'Stokta Yok - out of stock'}
          </div>
        </div>
      );
    });
  };

return(


 <div>
      <h1>Ürün Katalogu</h1>
      <div className="catalog-container ">
        {displayProducts()}
      </div>
    </div>
  );





}