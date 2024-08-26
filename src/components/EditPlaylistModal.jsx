/* eslint-disable react/prop-types */
import { useState } from 'react';

const EditPlaylistModal = ({ playlist, onClose, onSave }) => {
  const [newTitle, setNewTitle] = useState(playlist.name);

  const handleSave = () => {
    onSave(playlist.id, newTitle);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Lista de Reproducción</h2>
        <input 
          type="text" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
        />
        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditPlaylistModal;