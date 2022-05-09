import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ImageDetails() {

    const params = useParams()
    const [details, setDetails] = useState({})

    
    useEffect(() => {
        const getImageDetails = async () => {
            const data = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&id=${params.id}`)
            const detailsData = await data.json()
            setDetails(detailsData.hits[0])
            console.log(detailsData.hits[0]);
        }

        getImageDetails()
    }, [params.id])

    return (
        <div className="image-details">
            <div className="image-wrap">
                <img src={details.largeImageURL} alt="" />
            </div>
            <div className="info-wrap">
                <div className="user-details">
                    <div className="user-image">
                        <img src={details.userImageURL} alt="" />
                    </div>
                    <div className="user-name">
                        <span>{details.user}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageDetails