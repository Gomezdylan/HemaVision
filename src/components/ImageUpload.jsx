import mountainUpload from "../assets/mountainUpload.jpeg";
function ImageUpload( {setResults, setImage} ){
    return(
        <div className="image-upload">

            <img src={mountainUpload} className="upload-Mnt" />
            <h2>
                Upload Image
            </h2>
            <p>Upload blood smear images in JPG or PNG format for analysis</p>

            <input
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={(event) => {
                    const file = event.target.files[0]; // what the user uploads
                    if (!file) return;

                    setImage(file);

                    const formData = new FormData();
                    formData.append("file", file);
                    fetch("http://127.0.0.1:8000/predict",{ // FastAPI server where predict is
                        method: "POST", // Sending the data
                        body: formData // the image upload
                    })
                    .then(response => response.json()) // receive response back in java object
                    .then(data => {
                        setResults(data);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    })
                }
            }
            />
        </div>

    );
}

export default ImageUpload;