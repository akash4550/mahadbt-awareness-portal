import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const DocumentChecker = () => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setResult(null); // Reset result when new image is chosen
        }
    };

    const handleRecognize = async () => {
        if (!image) {
            alert('Please upload an image first.');
            return;
        }
        setIsLoading(true);
        setResult(null);
        setProgress(0);

        const { data } = await Tesseract.recognize(image, 'eng', {
            logger: m => {
                if (m.status === 'recognizing text') {
                    setProgress(parseInt(m.progress * 100));
                }
            },
        });

        setIsLoading(false);
        // Simple analysis: If confidence is high and it finds some words, it's likely legible.
        if (data.confidence > 70 && data.words.length > 5) {
            setResult({
                legible: true,
                message: `✅ Good Quality. Confidence: ${data.confidence}%`,
                text: data.text
            });
        } else {
            setResult({
                legible: false,
                message: `❌ Poor Quality. Confidence: ${data.confidence}%. Please upload a clearer, brighter image.`,
                text: data.text
            });
        }
    };

    return (
        <div className="doc-checker-container">
            <h3>AI Document Legibility Checker</h3>
            <p>Upload a photo of your document (e.g., Aadhaar card) to check if it's clear and readable.</p>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            
            {image && <img src={image} alt="Uploaded document" className="doc-preview" />}
            
            <button onClick={handleRecognize} disabled={isLoading || !image}>
                {isLoading ? `Analyzing... (${progress}%)` : 'Analyze Document'}
            </button>
            
            {result && (
                <div className={`result-box ${result.legible ? 'legible' : 'illegible'}`}>
                    <strong>Analysis Result:</strong> {result.message}
                </div>
            )}
        </div>
    );
};

export default DocumentChecker;