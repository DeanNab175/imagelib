import { Link } from "react-router-dom"

function Images(props) {

    const randomNum = (min, max) => {
        return Math.floor((Math.random() * max) + min)
    }

    const splitText = (separator, text) => {
        const textArr = []
        textArr.push(text.split(separator))
        return textArr[0]
    }

    return (
    <section className="image-gallery">
        {props.loading && <p>loading...</p>}
        { props.images &&
            props.images.map((image) => {
                return(
                    <div className={"image-gallery-item w-" + randomNum(1,2)/*  + " h-" + randomNum(1,2) */} key={image.id}>
                        <Link to={"/details/" + image.id}>
                            <div className="image-wrapper">
                                <img src={image.largeImageURL} alt={image.tags} />
                            </div>
                            <div className="text-wrapper">{splitText(', ', image.tags).map((text) => {
                                return(<span key={text.toString()}>{text}</span>)
                            })}</div>
                        </Link>
                    </div>
                )
            })
        }
    </section>
  )
}

export default Images