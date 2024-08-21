/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateArticleCategory = () => {
  const { id } = useParams();
  const [article, setArticle] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/infosphere/article-categories/${id}/`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data.article);
          setCategory(data.category);
        } else {
          setMessage('Error al cargar la categoría');
        }
  /// eslint-disable-next-line no-unused-vars
      } catch (error) {
        setMessage('Error al cargar la categoría');
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/infosphere/article-categories/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article, category }),
      });

      if (response.ok) {
        setMessage('Categoría actualizada exitosamente');
      } else {
        setMessage('Error al actualizar la categoría');
      }
    } catch (error) {
      setMessage('Error al actualizar la categoría');
    }
  };

  return (
    <div>
      <h2>Actualizar Categoría</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Artículo:</label>
          <input type="number" value={article} onChange={(e) => setArticle(e.target.value)} />
        </div>
        <div>
          <label>Categoría:</label>
          <input type="number" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateArticleCategory;
