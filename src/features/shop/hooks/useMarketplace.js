import { useState, useEffect } from 'react';
import { fetchMarketplaceProducts, MARKETPLACE_PRODUCTS } from '../api/marketplaceApi';

export const useMarketplace = () => {
  const [products, setProducts] = useState(MARKETPLACE_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchMarketplaceProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
};