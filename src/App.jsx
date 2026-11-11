import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ImageUpload from "./components/ImageUpload";
import ImageComparison from "./components/ImageComparison";
import HeatmapUploader from "./components/HeatmapUploader";
import AnalysisResults from "./components/AnalysisResults";
import ReviewerFeedback from "./components/ReviewerFeedback";
import WaitingCard from "./components/WaitingCard";
import CellCard from "./components/CellCard";
import DownloadReport from "./components/DownloadReport";
import Log from "./components/Log";

function App(){

  const [results, setResults] = useState(null); // prediction from image Upload and setResults updates this
  const [image, setImage] = useState(null);
  const [page, setPage] = useState("analysis"); // Current page
  return(
    <div className="app">
      <Header setPage={setPage} /> 

      <main> 
        {page === "analysis" && ( // Main Page Code
          <>
        <ImageUpload setResults={setResults} setImage={setImage} />

        {!results && <WaitingCard/>}
        {image && ( // Changed to this so it only changes the look of the screen after someone uploads an image
          <>
          
          <CellCard image={image} results={results} />
          <ReviewerFeedback 
            key={results?.run_id}
            runID={results?.run_id}
          
          />
          <DownloadReport />

              </>
            )}
          </>
        )}

        {page === "history" && <Log />}
      </main>

      <Footer /> 

    </div>
  );
}

export default App;