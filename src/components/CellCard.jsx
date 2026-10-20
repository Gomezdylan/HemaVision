import ImageComparison from "./ImageComparison";
import AnalysisResults from "./AnalysisResults";

function CellCard({ image, results }){
    return (
        <div className="cell-classification">
            <h2>Cell Classification</h2>
            <p>The model classifies the image into one of the 8 blood cell types and provides a Grad Cam Visualization</p>

            <ImageComparison image={image} results={results}/>
            <AnalysisResults results={results} />
        </div>
    );
}
export default CellCard;