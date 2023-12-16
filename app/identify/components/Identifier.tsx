"use client";

import Button from "@/components/Button";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Webcam from "react-webcam";
import LoadingModal from "../../../components/LoadingModal";
import gotResults from "../util/gotResults";
import Result from "./Result";
import Camera from "./camera";

// TM Model "https://teachablemachine.withgoogle.com/models/d1qL04bWG/"

const modelURL = "https://teachablemachine.withgoogle.com/models/d1qL04bWG/";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let classifier: any;

interface IResult {
  label: string;
  confidence: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ml5: any;

const Identifier: React.FC = () => {
  useEffect(() => {
    ml5 = require("ml5");
  }, []);

  const webcamRef = useRef<Webcam>(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<IResult | null>();
  const [imgSrc, setImgSrc] = useState<HTMLImageElement | null>();

  const [enabled, setEnabled] = useState(true);
  const [camDirection, setCamDirection] = useState<"user" | "environment">(
    "user"
  );

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
    if (imgSrc) {
      try {
        classifier
          .classify(
            imgSrc,
            (
              err: unknown,
              results: { label: string; confidence: number }[]
            ) => {
              gotResults(err, results).then((res) => setResult(res));
            }
          )
          .finally(() => toast.dismiss());
      } catch (error: unknown) {
        toast.dismiss();
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

          <Camera
            webcamRef={webcamRef}
            imgSrc={imgSrc}
            camDirection={camDirection}
            enabled={enabled}
            setEnabled={setEnabled}
            setImgSrc={setImgSrc}
          />

          {result && (
            <Result refference={result.label} confidence={result.confidence} />
          )}
        </div>
      </div>
    </>
  );
};

export default Identifier;
