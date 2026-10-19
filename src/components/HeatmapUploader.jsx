import { useState } from "react";

// Points at the FastAPI backend. uvicorn's default port is 8000.
// Move this to an environment variable (import.meta.env.VITE_API_URL)
// once there's a real deployed backend URL instead of localhost.
const API_URL = "http://localhost:8000";

export default function HeatmapUploader() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [heatmapUrl, setHeatmapUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setHeatmapUrl(null);
    setPrediction(null);
    setError(null);

    runPrediction(file);
  }

  async function runPrediction(file) {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      setPrediction(data.prediction);
      setConfidence(data.confidence);
      setHeatmapUrl(data.heatmap);
    } catch (err) {
      setError("Could not get a prediction. Is the backend running on port 8000?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>Upload a cell image</h2>

      <label
        style={{
          display: "block",
          border: "2px dashed #999",
          borderRadius: 8,
          padding: 24,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        Click or drag an image here
      </label>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        {previewUrl && (
          <div>
            <p>Original</p>
            <img src={previewUrl} alt="Uploaded cell" width={200} />
          </div>
        )}
        {loading && <p>Running Grad-CAM…</p>}
        {heatmapUrl && (
          <div>
            <p>Grad-CAM heatmap</p>
            <img src={heatmapUrl} alt="Grad-CAM heatmap overlay" width={200} />
          </div>
        )}
      </div>

      {prediction && (
        <p style={{ marginTop: 16 }}>
          <strong>Prediction:</strong> {prediction} ({(confidence * 100).toFixed(1)}% confidence)
        </p>
      )}
    </div>
  );
}
