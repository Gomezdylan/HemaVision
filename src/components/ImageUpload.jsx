function ImageUpload(){
    return(
        <div className="image-upload">
            <h2>
                Upload Image
            </h2>
            <p>Upload blood smear images in JPG or PNG format for analysis</p>

            <input
                type="file"
                accept=".jpg,.png,.jpeg"
            />
        </div>

    );
}

export default ImageUpload;