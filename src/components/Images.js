import { useEffect, useState } from "react"

function Images() {

    const [images, setImages] = useState([])
    console.log(images)

    useEffect(() => {
        getImages()
    }, [])
    
    
    const getImages = async () => {
        const cachedImages = localStorage.getItem('images')

        if(cachedImages) {
            setImages(JSON.parse(cachedImages))
        } else {
            const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=yellow+flowers&image_type=photo&per_page=50`)
            const data = await response.json()
            localStorage.setItem('images', JSON.stringify(data.hits))
            setImages(data.hits)
        }
    }

    const randomNum = (min, max) => {
        return Math.floor((Math.random() * max) + min)
    }

    return (
    <section className="image-gallery">
        { 
            images.map((image) => {
                return(
                    <div className={"image-gallery-item w-" + randomNum(1,2) + " h-" + randomNum(1,2)} key={image.id}>
                        <div className="image-wrapper">
                            <img src={image.largeImageURL} alt={image.tags} />
                        </div>
                        <div className="text-wrapper">{image.tags}</div>
                    </div>
                )
            })
        }
    </section>
  )
}

export default Images