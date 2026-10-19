import spinner from "../assets/waiting-spinner.png";
function WaitingCard(){
    return(
        <div className="waiting-card">
            <img src={spinner}/> 

            <h2>
                Awaiting Analysis
            </h2>
            <p>Upload an image to begin analysis.</p>
            <p>Your results will appear here once processing is complete</p>
        </div>
    );
}

export default WaitingCard;

// eventually make the image spin when someone uploads and image