/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ArticleCategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/infosphere/article-categories/${id}/`);
        if (!response.ok) {
          throw new Error('Error al cargar la categoría');
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        setError('Error al cargar la categoría');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Detalles de Categoría</h2>
      {category && (
        <div>
          <p>ID: {category.id}</p>
          <p>Artículo: {category.article}</p>
          <p>Categoría: {category.category}</p>
          <p>Fecha de creación: {category.created_at}</p>
          <p>Última actualización: {category.updated_at}</p>
        </div>
      )}
    </div>
  );
};

export default ArticleCategoryDetail;
