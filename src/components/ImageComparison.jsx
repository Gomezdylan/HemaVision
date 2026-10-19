function ImageComparison ({image, results}){

        let originalImage = null;

        if(image){
            originalImage = URL.createObjectURL(image);
        }
    return(
        <div className="image-comparison">

        <div className="image-box">
            <h2>Original Image</h2>
            { (originalImage) &&
            <img src = {originalImage} />
            }
        </div>

        <div className="image-box">
            <h2>Grad Cam Image</h2>
            { (results && results.heatmap) &&
            <img src = {results.heatmap} />
            }
        </div>

        </div>

    );
}

export default ImageComparison;