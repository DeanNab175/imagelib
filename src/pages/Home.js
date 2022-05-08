import Images from "../components/Images"
import Search from "../components/Search"

function Home() {
  return (
    <div className="container">
      <header>
        <div>
          <h1>Imagelib</h1>
          <p>Search all your images.</p>
          <Search />
        </div>
      </header>
      <Images />
    </div>
  )
}

export default Home