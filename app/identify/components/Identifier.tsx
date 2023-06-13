"use client";

// @ts-expect-error
import * as ml5 from "ml5";
import React, { useEffect, useRef, useState } from "react";
import LoadingModal from "../../components/LoadingModal";
import Button from "@/app/components/Button";
import { BiTrash } from "react-icons/bi";
import Webcam from "react-webcam";
import Result from "./Result";

// TM Model "https://teachablemachine.withgoogle.com/models/d1qL04bWG/"

const modelURL = "https://teachablemachine.withgoogle.com/models/d1qL04bWG/";
let classifier: any;

interface IResult {
  label: string;
  confidence: number | null;
}

const Identifier: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  const [loading, setLoading] = useState(false);

  const [warning, setWarning] = useState(false);
  const [result, setResult] = useState<IResult | null>();
  const [imgSrc, setImgSrc] = useState<HTMLImageElement | null>();
  const [watch, setWatch] = useState();

  const [enabled, setEnabled] = useState(true);
  const [camDirection, setCamDirection] = useState("user");

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
    } catch (error: any) {
      setResult(error.message);
      loading && setLoading(false);
    }
  };

  const gotResults = async (
    error: any,
    results: { label: string; confidence: number }[]
  ) => {
    if (results) {
      const label = results[0].label; //Predicted label with highest confidence
      const confidence = results[0].confidence
        .toString()
        .split("")
        .splice(2, 2)
        .join("");

      if (Number(confidence) < 80) setWarning(true);
      {
        label
          ? setResult({ label: label, confidence: Number(confidence) })
          : setResult({ label: "No watch found", confidence: null });
      }
      {
        loading && setLoading(false);
      }
    }
  };

  const capture = async () => {
    if (webcamRef.current?.getScreenshot) {
      const imageSrc = webcamRef.current.getScreenshot();
      let image = new Image();
      if (imageSrc) {
        image.src = imageSrc;
        setWarning(false);
        setImgSrc(image);
        setEnabled(false);
      }
    }
  };

  return (
    <>
      {loading && <LoadingModal />}
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center p-4 gap-4 w-full md:w-7/12 max-w-2xl">
          <div className="flex gap-4">
            <Button
              text="Toggle camera"
              onClick={() => setEnabled(!enabled)}
              disabled={loading}
              hover
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
              hover
            />
          </div>

          <div className="w-full flex justify-center items-center shadow-md aspect-video overflow-hidden">
            {!enabled && imgSrc?.src && (
              <img src={imgSrc.src} alt="screenshot" className="w-full" />
            )}
            {enabled && (
              <Webcam
                aria-label="Camera feed"
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
          <div className="flex justify-center items-center w-full gap-4">
            <Button
              text="Capture image"
              fullWidth
              secondary
              disabled={!enabled}
              onClick={capture}
              hover
            />
            <Button
              icon={BiTrash}
              disabled={!imgSrc?.src || enabled}
              onClick={() => {
                setImgSrc(null);
                setEnabled(true);
                setWarning(false);
              }}
              aria="Clear image"
              hover
            />
          </div>

          {result?.label && result?.confidence && (
            <Result refference={result.label} confidence={result.confidence} />
          )}
        </div>
      </div>
    </>
  );
};

export default Identifier;
