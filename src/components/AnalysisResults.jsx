function AnalysisResults(){
    return(
        <div className="analysis-results">

            <div className="result-box">
                <h2>Probabilities</h2>

                <div className="probability">
                    <div className="probability-label">
                        <span>Neutrophil:</span> 
                        <span>92%</span> 
                    </div>
                    <div className="bar">
                        <div className="bar-fill" style={{ width: "92%" }}></div>
                    </div>
                </div>

                <div className="probability">
                    <div className="probability-label">
                        <span>Eosinophil:</span>
                        <span>4%</span>
                    </div>

                    <div className="bar">
                        <div className="bar-fill" style={{ width: "4%" }}></div>
                    </div>
                </div>

                <div className="probability">
                    <div className="probability-label">
                        <span>Monocyte:</span>
                        <span>2%</span>
                    </div>

                    <div className="bar">
                        <div className="bar-fill" style={{ width: "2%" }}></div>
                    </div>
                </div>

                <div className="probability">
                    <div className="probability-label">
                        <span>Lymphocyte:</span>
                        <span>2%</span>
                    </div>

                    <div className="bar">
                        <div className="bar-fill" style={{ width: "2%" }}></div>
                    </div>
                </div>

            </div>

            <div className="result-box">

                <h2>Explainable AI</h2>

                <p>The model primarily focused on the central white blood cell when making its prediction. The Grad-CAM visualization highlights regions that contributed most strongly to the classification. Warmer colors indicate areas with greater influence on the model's decision....</p>
            </div>
        </div>
    );
}

export default AnalysisResults;