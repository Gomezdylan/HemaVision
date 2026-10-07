import gradcamImage from "../assets/gradcam.jpeg";
import originalImage from "../assets/original.jpeg";

function ImageComparison (){
    return(
        <div className="image-comparison">

        <div className="image-box">
            <h2>Original Image</h2>
            <img src={originalImage} />
        </div>

        <div className="image-box">
            <h2>Grad Cam Image</h2>
            <img src={gradcamImage} alt="Grad-Cam visualization" />
        </div>

        </div>

    );
}

export default ImageComparison;