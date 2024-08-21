/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const ArticleCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/infosphere/article-categories/');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.results);
        } else {
          setError('Error al cargar las categorías');
        }
      } catch (error) {
        setError('Error al cargar las categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Categorías de Artículos</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleCategoriesList;
