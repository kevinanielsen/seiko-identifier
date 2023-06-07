"use client";

import ml5 from "ml5";
import React, { useEffect, useRef, useState, useCallback } from "react";
import WebCam from "react-webcam";
import LoadingModal from "../../components/LoadingModal";
import Button from "@/app/components/Button";
import { BiTrash } from "react-icons/bi";

// TM Model "https://teachablemachine.withgoogle.com/models/d1qL04bWG/"
// Kevin / Not Kevin "https://teachablemachine.withgoogle.com/models/YKhc44aeF/"

const modelURL = "https://teachablemachine.withgoogle.com/models/d1qL04bWG/";
let classifier;

const Identifier = () => {
  const webcamRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [result, setResult] = useState({});
  const [imgSrc, setImgSrc] = useState({});
  const [enabled, setEnabled] = useState(true);
  const [camDirection, setCamDirection] = useState("user");
  const [watch, setWatch] = useState({});

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: camDirection,
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      classifier = await ml5.imageClassifier(modelURL + "model.json");
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    classifyVideo();
  }, [imgSrc]);

  const classifyVideo = () => {
    try {
      classifier.classify(imgSrc, gotResults);
    } catch (err) {
      setResult(err.message);
      loading && setLoading(false);
    }
  };

  const gotResults = async (error, results) => {
    if (results) {
      const label = results[0].label; //Predicted label with highest confidence
      const confidence = results[0].confidence
        .toString()
        .split("")
        .splice(2, 2)
        .join("");

      if (confidence < 80) setWarning(true);
      {
        label
          ? setResult({ label: label, confidence: confidence })
          : setResult({ label: "No watch found", confidence: null });
      }
      {
        loading && setLoading(false);
      }
    }
  };

  const capture = async () => {
    setEnabled(false);
    const imageSrc = webcamRef.current.getScreenshot();
    let image = new Image();
    image.src = imageSrc;

    setImgSrc(image);
  };

  return (
    <>
      {loading && <LoadingModal />}

      <div className="flex flex-col items-center p-4 gap-4">
        <div className="flex gap-4">
          <Button
            text="Toggle camera"
            onClick={() => setEnabled(!enabled)}
            disabled={loading}
          />
          <Button
            style="flex md:hidden"
            text="Flip camera"
            onClick={() => {
              camDirection === "user"
                ? setCamDirection("environment")
                : setCamDirection("user");
            }}
            disabled={loading}
          />
        </div>

        <div className="w-full md:w-7/12 max-w-2xl flex justify-center items-center shadow-md aspect-video overflow-hidden">
          {!enabled && imgSrc?.src && <img src={imgSrc.src} alt="screenshot" />}
          {enabled && (
            <WebCam
              ref={webcamRef}
              videoConstraints={videoConstraints}
              screenshotFormat="image/jpeg"
            />
          )}
          {!enabled && !imgSrc?.src && (
            <div className="bg-gray-100 w-full h-full flex items-center justify-center text-xl font-bold">
              Camera Disabled
            </div>
          )}
        </div>
        <div className="flex justify-center items-center w-full md:w-7/12 gap-4">
          <Button
            text="Capture image"
            fullWidth
            secondary
            disabled={!enabled}
            onClick={capture}
          />
          <Button
            icon={BiTrash}
            disabled={!imgSrc?.src}
            onClick={() => {
              setImgSrc({});
              setEnabled(true);
              setWarning(false);
            }}
          />
        </div>

        <b>
          {loading ? (
            "Loading..."
          ) : (
            <>
              <p>{result.label}</p>
              {warning && (
                <p>Warning! Confidence is low, so this might not be correct!</p>
              )}
              {result.label !== "No watch found" && result.confidence && (
                <p>{`${result.confidence}% confidence`}</p>
              )}
            </>
          )}
        </b>
      </div>
    </>
  );
};

export default Identifier;
