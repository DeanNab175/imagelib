import { useEffect, useState } from "react"
import Images from "../components/Images"
import Search from "../components/Search"

function Home() {
  const [searched, setSearched] = useState('')
  const [images, setImages] = useState([])

  
  const onSubmitHandler = (val) => {
    setSearched(val)
  }
  
  useEffect(() => {
    removeLocalstorageItem('images')
    getImages()
  }, [searched])

  const getImages = async () => {
    const cachedImages = localStorage.getItem('images')

    if(cachedImages) {
        setImages(JSON.parse(cachedImages))
    } else {
        const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searched}&image_type=photo`)
        const data = await response.json()
        localStorage.setItem('images', JSON.stringify(data.hits))
        setImages(data.hits)
    }
  }

  const removeLocalstorageItem = (item) => {
    localStorage.removeItem(item)
  }

  return (
    <div className="container">
      <header>
        <div>
          <h1>Imagelib</h1>
          <p>Search all your images.</p>
          <Search onSubmit={onSubmitHandler} />
        </div>
      </header>
      <Images images={images} searched={searched} />
    </div>
  )
}

export default Home