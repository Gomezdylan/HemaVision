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

function App(){

  const [results, setResults] = useState(null); // prediction from image Upload and setResults updates this
  const [image, setImage] = useState(null);
  return(
    <div>
      <Header />
      <main>
        <ImageUpload setResults={setResults} setImage={setImage} />

        {!results && <WaitingCard/>}
        {image && ( // Changed to this so it only changes the look of the screen after someone uploads an image
          <>
          
          <ImageComparison image={image} results={results}/>
          <AnalysisResults results={results} />
          <ReviewerFeedback />

        </>

        )}
      </main>

      <Footer />

    </div>
  );
}

export default App;