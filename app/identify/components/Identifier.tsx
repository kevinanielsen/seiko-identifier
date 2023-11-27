"use client";

import Button from "@/components/Button";
import axios from "axios";
import NextImage from "next/image";
import React, { useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";
import Webcam from "react-webcam";
import LoadingModal from "../../../components/LoadingModal";
import Result from "./Result";

interface IResult {
  label: string;
  probability: string;
}

const Identifier: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<IResult | null>();
  const [imgSrc, setImgSrc] = useState<HTMLImageElement | null>();

  const [enabled, setEnabled] = useState(true);
  const [camDirection, setCamDirection] = useState("user");

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: camDirection,
  };

  const gotResults = async (result: { label: string; probability: string }) => {
    if (result) {
      const label = result.label; //Predicted label with highest confidence
      const probability = result.probability;
      setResult({ label: label, probability: probability });
      if (!label.includes("No ")) {
        fetch(`/api/watch/${label}/updateRecognizable`).catch((err) =>
          console.log(err)
        );
      }
    }
  };

  const classifyVideo = (img: string) => {
    setLoading(true);
    axios
      .post("/api/identify", {
        image: img,
      })
      .then((res) => {
        gotResults(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const capture = async () => {
    if (webcamRef.current?.getScreenshot) {
      const imageSrc = webcamRef.current.getScreenshot();
      const image = new Image();
      if (imageSrc) {
        image.src = imageSrc;
        classifyVideo(imageSrc);
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
              <NextImage
                src={imgSrc.src}
                alt="screenshot"
                fill
                className="w-full object-contain"
              />
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
              }}
              aria="Clear image"
              hover
            />
          </div>

          {result && (
            <Result refference={result.label} confidence={result.probability} />
          )}
        </div>
      </div>
    </>
  );
};

export default Identifier;
