/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const CreateArticleCategory = () => {
  const [article, setArticle] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/infosphere/article-categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article,
          category,
        }),
      });

      if (response.ok) {
        setMessage('Categoría creada exitosamente');
      } else {
        setMessage('Error al crear la categoría');
      }
    } catch (error) {
      setMessage('Error al crear la categoría');
    }
  };

  return (
    <div>
      <h2>Crear Nueva Categoría</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Artículo:</label>
          <input type="number" value={article} onChange={(e) => setArticle(e.target.value)} />
        </div>
        <div>
          <label>Categoría:</label>
          <input type="number" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button type="submit">Crear</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateArticleCategory;
