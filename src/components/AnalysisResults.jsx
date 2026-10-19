function AnalysisResults( { results } ){ // gets information back from image upload and fastapi now

    // eventually need to reorder them too
    if(!results){
        return <p></p>;
    }
    return(
        <div className="analysis-results">

            <div className="result-box">
                <h2>Probabilities</h2>

                <div className="probability">
                    <div className="probability-label">
                        <span>Neutrophil:</span> 
                        <span>{results.probabilities.Neutrophil * 100}%</span> 
                    </div>
                    <div className="bar">
                        <div className="bar-fill" style={{ width: `${results.probabilities.Neutrophil * 100}%` }}></div>
                    </div>
                </div>

                <div className="probability">
                    <div className="probability-label">
                        <span>Eosinophil:</span>
                        <span>{results.probabilities.Eosinophil * 100}%</span>
                    </div>

                    <div className="bar">
                        <div className="bar-fill" style={{ width: `${results.probabilities.Eosinophil * 100}%` }}></div>
                    </div>
                </div>

                <div className="probability">
                    <div className="probability-label">
                        <span>Monocyte:</span>
                        <span>{results.probabilities.Monocyte * 100}%</span>
                    </div>

                    <div className="bar">
                        <div className="bar-fill" style={{ width: `${results.probabilities.Monocyte * 100}%` }}></div>
                    </div>
                </div>

                <div className="probability">
                    <div className="probability-label">
                        <span>Lymphocyte:</span>
                        <span>{results.probabilities.Lymphocyte * 100}%</span>
                    </div>

                    <div className="bar">
                        <div className="bar-fill" style={{ width: `${results.probabilities.Lymphocyte * 100}%` }}></div>
                    </div>
                </div>

            </div>


                {results.heatmap && (
                    <img src={results.heatmap} alt="Grad-CAM heatmap" className="heatmap-image" />
                )}
                <p>The model primarily focused on the central white blood cell when making its prediction. The Grad-CAM visualization highlights regions that contributed most strongly to the classification. Warmer colors indicate areas with greater influence on the model's decision.</p>            </div>
        </div>
    );
}

export default AnalysisResults;