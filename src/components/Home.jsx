function Home(category) {
    return(
        <div className={`card has-background-dark`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {category.title}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <audio controls>
                        <source src={category.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
        </div>
    );

}
export default Home;