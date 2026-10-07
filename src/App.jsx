import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ImageUpload from "./components/ImageUpload";
import ImageComparison from "./components/ImageComparison";
import AnalysisResults from "./components/AnalysisResults";
import ReviewerFeedback from "./components/ReviewerFeedback";

function App(){
  return(
    <div>
      <Header />
      <main>
        <ImageUpload />
        <ImageComparison />
        <AnalysisResults />
        <ReviewerFeedback />
      </main>

      <Footer />

    </div>
  );
}

export default App;