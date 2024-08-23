
const FooterBar = (appName) => {
  return (
    <footer className={`footer is-dark`}>
        <div className="content has-text-centered">
        <p className={`has-text-light`}>
                    &copy; {new Date().getFullYear()} {appName}. Todos los
                    derechos reservados.
                </p>

        </div>

    </footer>
  )
}

export default FooterBar
