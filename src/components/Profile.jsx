import  { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    const [username, setUsername] = useState(user?.username || '');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para actualizar perfil
        console.log('Perfil actualizado:', { username, image });
    };

    return (
        <div className="profile">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Nombre de Usuario</label>
                    <div className="control">
                        <input className="input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Imagen de Perfil</label>
                    <div className="control">
                        <input className="input" type="file" onChange={handleImageChange} />
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary">Actualizar Perfil</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
