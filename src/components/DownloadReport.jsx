import inputIcon from "../assets/downloadIcon.png";
function DownloadReport(){
    return(
        <div class="report-box">
            <h2>Download Report</h2>
            <p>Download a summary of the image analysis, including results, cell classifications, and feedback</p>
            <button className="download-btn">
                <img src={inputIcon} />
                Download PDF
            </button>
        </div>

    );
}

export default DownloadReport;