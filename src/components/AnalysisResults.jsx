function AnalysisResults( { results } ){ // gets information back from image upload and fastapi now

    // eventually need to reorder them too
    if(!results){
        return <p></p>;
    }
    const probabilities = Object.entries(results.probabilities || {} )
    return(
        <div className="analysis-results">


            <div className="result-box">
                <h2>Class Probabilities</h2>


            {probabilities.map(([cellType, probability]) => (
            
                <div className="probability" key={cellType}>
                    <div className="probability-label">
                        <span>{cellType}:</span> 
                        <span>{(probability * 100).toFixed(2)}%</span> 
                    </div>
                    <div className="bar">
                        <div className="bar-fill" style={{ width: `${probability * 100}%` }}></div>
                    </div>
                </div>

            ))}
      
                    </div>


        </div>
    );
}

/*<p>The model primarily focused on the central white blood cell when making its prediction. 
                    The Grad-CAM visualization highlights regions that contributed most strongly to the classification. 
                    Warmer colors indicate areas with greater influence on the model's decision.</p>      */

export default AnalysisResults;