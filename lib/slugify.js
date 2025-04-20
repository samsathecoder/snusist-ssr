    
export const createProductSlug = (product) =>
    `${product.id}-${product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`;
  