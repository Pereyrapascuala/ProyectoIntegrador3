/* eslint-disable no-unused-vars */
import { useParams, useHistory } from 'react-router-dom';

const DeleteArticleCategory = () => {
  const { id } = useParams();
  const history = useHistory();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/infosphere/article-categories/${id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Categoría eliminada');
      history.push('/'); // Redirige al listado de categorías o a otra página después de la eliminación

      } else {
        alert('Error al eliminar la categoria');
      }
    } catch (error) {
        alert('Error al eliminar la categoría');
      }
  };

  return (
    <div>
      <h2>Eliminar Categoría</h2>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default DeleteArticleCategory;
