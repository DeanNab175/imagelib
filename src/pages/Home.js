import { useEffect, useState } from "react"
import Images from "../components/Images"
import Search from "../components/Search"
import ReactPaginate from "react-paginate"

function Home() {
  const [searched, setSearched] = useState('')
  const [images, setImages] = useState([])
  const [perPage, setPerPage] = useState(30)
  const [pageNumber, setPageNumber] = useState(1)
  const [total, setTotal] = useState(0)

  
  const onSubmitHandler = (val) => {
    setSearched(val)
  }
  
  useEffect(() => {
    removeLocalstorageItem('images')
    getImages()
  }, [searched, pageNumber])

  const getImages = async () => {
    const cachedImages = localStorage.getItem('images')
    const cachedTotal = localStorage.getItem('total')

    if(cachedImages && cachedTotal) {
        setImages(JSON.parse(cachedImages))
        setTotal(JSON.parse(cachedTotal))
    } else {
        const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searched}&image_type=photo&per_page=${perPage}&page=${pageNumber}`)
        const data = await response.json()
        localStorage.setItem('images', JSON.stringify(data.hits))
        setImages(data.hits)
        localStorage.setItem('total', JSON.stringify(data.totalHits))
        setTotal(data.totalHits)
    }
  }

  const removeLocalstorageItem = (item) => {
    localStorage.removeItem(item)
  }

  const pageCount = Math.ceil(total/perPage)

  const handlePageClick = ({ selected }) => {
    console.log(selected + 1)
    setPageNumber(selected + 1)
  }

  return (
    <div className="container">
      <header>
        <div>
          <h1>Imagelib</h1>
          <p>Search all your images.
            <a href="https://pixabay.com/" target="_blank">
              Credit to <img src="https://pixabay.com/static/img/logo.png" alt="Pixabay" width="60" />
            </a>
          </p>
          <Search onSubmit={onSubmitHandler} />
        </div>
      </header>
      <Images images={images} searched={searched} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination-wrapper"
        previousLinkClassName="previous-link"
        nextLinkClassName="next-link"
        disabledLinkClassName="disabled-link"
      />
    </div>
  )
}

export default Home