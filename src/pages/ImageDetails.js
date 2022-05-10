import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs";


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

    const convertNum = (labelValue) => {

        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9
    
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(0) + "b"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6
    
        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(0) + "m"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3
    
        ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(0) + "k"
    
        : Math.abs(Number(labelValue)).toFixed(0);
    
    }

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <>
        <header>
            <div>
                <h1>Imagelib</h1>
                <p>Search all your images.
                    <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
                    Credit to <img src="https://pixabay.com/static/img/logo.png" alt="Pixabay" width="60" />
                    </a>
                </p>
            </div>
        </header>
        <div className="back"><Link to={"/"}><BsArrowLeft />Back</Link></div>
        <div className="image-details">
            <div className="image-wrap">
                <img src={details.largeImageURL} alt="" />
            </div>
            <div className="info-wrap">
                <div className="user-details">
                    {
                        details.userImageURL !== "" &&
                        <div className="user-image">
                            <img src={details.userImageURL} alt={details.user} />
                        </div>
                    }
                    
                    <div className="user-name">
                        <span>{details.user}</span>
                    </div>
                </div>
                <p className="image-size"><span className="label">Dimension: </span>{details.imageWidth} x {details.imageHeight} (px)</p>
                <p className="size"><span className="label">Size: </span>{formatBytes(details.imageSize)}</p>
                <p className="tags"><span className="label">Tags: </span>{details.tags}</p>
                <p className="views"><span className="label">Views: </span>{convertNum(details.views)}</p>
                <p className="downloads"><span className="label">Downloads: </span>{convertNum(details.downloads)}</p>
                <p className="likes"><span className="label">Likes: </span>{convertNum(details.likes)}</p>
            </div>
        </div>
        </>
    )
}

export default ImageDetails