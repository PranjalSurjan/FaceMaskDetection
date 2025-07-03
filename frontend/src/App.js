import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const [result, setResult] = useState(null);

  const captureAndSend = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await (await fetch(imageSrc)).blob();
    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    const response = await fetch("http://localhost:8000/detect-mask/", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <br />
      <button onClick={captureAndSend} style={{ marginTop: "10px" }}>
        Check Mask
      </button>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <b>Mask detected:</b> {result.mask_detected ? "Yes" : "No"}
          <br />
          <b>Confidence:</b> {(result.confidence * 100).toFixed(2)}%
        </div>
      )}
    </div>
  );
}

export default App;
