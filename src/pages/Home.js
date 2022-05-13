import { useEffect, useState } from "react"
import Images from "../components/Images"
import ReactPaginate from "react-paginate"
import Header from "../components/Header"

function Home() {
  const [searched, setSearched] = useState('')
  const [images, setImages] = useState([])
  const perPage = 30
  const [pageNumber, setPageNumber] = useState(1)
  const [total, setTotal] = useState(0)

  
  const onSubmitHandler = (val) => {
    setSearched(val)
  }
  
  useEffect(() => {
    removeLocalstorageItem('images')
    
    const getImages = async () => {
      // store images and total in localstorage
      const cachedImages = localStorage.getItem('images')
      const cachedTotal = localStorage.getItem('total')
  
      // if we do have localstorage set then
      // update images and total state variable
      if(cachedImages && cachedTotal) {
          setImages(JSON.parse(cachedImages))
          setTotal(JSON.parse(cachedTotal))
      } else {
          /**
           * fetch images from api
           * and update the state
           */
          const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${encodeURIComponent(searched)}&image_type=photo&per_page=${perPage}&page=${pageNumber}`)
          const data = await response.json()
          localStorage.setItem('images', JSON.stringify(data.hits))
          setImages(data.hits)
          localStorage.setItem('total', JSON.stringify(data.totalHits))
          setTotal(parseInt(data.totalHits))
      }
    }

    getImages()
  }, [searched, pageNumber])


  // remove item from localstorage
  const removeLocalstorageItem = (item) => {
    localStorage.removeItem(item)
  }

  // calculate number of pages
  const pageCount = Math.ceil(total/perPage)

  // handle click on pagination and set selected page
  const handlePageClick = ({ selected }) => {
    console.log(selected + 1)
    setPageNumber(selected + 1)
  }

  return (
    <div className="container">
      <Header onSubmit={onSubmitHandler} />
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