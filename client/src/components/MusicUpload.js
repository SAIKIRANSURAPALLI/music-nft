import React, { useState } from "react";
import axios from "axios";

const MusicUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Replace with your upload endpoint
      const response = await axios.post(
        "https://your-backend-api/upload",
        formData
      );

      // Assuming response contains the CID or some identifier
      const { cid } = response.data;
      onUploadSuccess(cid);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default MusicUpload;
