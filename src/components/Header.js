import Search from "./Search"

function Header(props) {

  return (
    <header>
        <div>
          <h1>Imagelib</h1>
          <p>Search all your images.
            <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
              Credit to <img src="https://pixabay.com/static/img/logo.png" alt="Pixabay" width="60" />
            </a>
          </p>
          <Search onSubmit={props.onSubmit} />
        </div>
    </header>
  )
}

export default Header