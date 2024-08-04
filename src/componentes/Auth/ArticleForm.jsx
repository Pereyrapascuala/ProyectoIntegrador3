//import { handle } from "express/lib/application";
import {useState, useEffect } from "react";

export default function ArticleForm() {
    const [articleData, setArticleData] = useState({title: " ", content: "" });

    function handleInputChange(event) {
        setArticleData({...articleData, [event.target.name] : event.taget.value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`infosphere/articles/`, {});
    }

    return (
        <form className= {`box m-4 p-4 has-background-dark`} onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Titulo</label>
                <div className="control">
                    <input className="input" 
                    type="text" 
                    name="title"
                    value={articleData.title} 
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className="field">
                <label className="label">Contenido</label>
                <div className="control">
                    <textarea className="textarea" 
                    type="text" 
                    value={articleData.title} 
                    onChange={handleInputChange}/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                    className= "button is-primary"
                    type="submit">
                        Crear Articulo
                    </button>
                </div>
            </div>
        
        </form>
    );
}