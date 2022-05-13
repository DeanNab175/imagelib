import { Link } from "react-router-dom"

function Images(props) {

    // generate random numbers
    const randomNum = (min, max) => {
        return Math.floor((Math.random() * max) + min)
    }

    // split text separated by comma
    const splitText = (separator, text) => {
        const textArr = []
        textArr.push(text.split(separator))
        return textArr[0]
    }

    return (
    <section className="image-gallery">
        {props.loading && <p>loading...</p>}
        { props.images &&
            props.images.map((image, index) => {
                return(
                    <div className={"image-gallery-item w-" + randomNum(1,2)} key={image.id} data-testid={`image-gallery-item-${index}`}>
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