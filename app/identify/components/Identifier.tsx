"use client";

import Button from "@/components/Button";
import * as metadata from "@/model/metadata.json";
import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Webcam from "react-webcam";
import LoadingModal from "../../../components/LoadingModal";
import createHTMLImageElement from "../util/createHTMLimage";
import Result from "./Result";
import Camera from "./camera";

// TM Model "https://teachablemachine.withgoogle.com/models/d1qL04bWG/"

const Identifier: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  const [model, setModel] = useState<tf.LayersModel>();
  const [classLabels, setClassLabels] = useState<string[]>();

  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState<number>();
  const [predictedClass, setPredictedClass] = useState<string>();

  const [htmlImage, setHtmlImage] = useState<HTMLImageElement>();

  const [enabled, setEnabled] = useState(true);
  const [camDirection, setCamDirection] = useState<"user" | "environment">(
    "user"
  );

  const handleImageChange = async (imageSrc: string) => {
    if (!imageSrc) {
      setConfidence(undefined);
      setPredictedClass(undefined);
    }

    if (imageSrc) {
      setLoading(true);
      const image = await createHTMLImageElement(imageSrc);
      setHtmlImage(image);

      // tf.tidy for automatic memory cleanup
      const [predictedClass, confidence] = tf.tidy(() => {
        const tensorImg = tf.browser
          .fromPixels(image)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .expandDims();

        const result = model!.predict(tensorImg) as tf.Tensor;

        const predictions = result.dataSync();

        predictions.forEach((p, i) => {
          console.log(classLabels![i], p);
        });
        const predicted_index = result.as1D().argMax().dataSync()[0];

        const predictedClass = classLabels![predicted_index];
        const confidence = Math.round(predictions[predicted_index] * 100);

        return [predictedClass, confidence];
      });

      setPredictedClass(predictedClass);
      setConfidence(confidence);
      setLoading(false);
      toast.dismiss();
    }
  };

  useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel(
        "https://teachablemachine.withgoogle.com/models/d1qL04bWG/model.json"
      );
      setModel(model);
    };
    const getLabels = async () => {
      setClassLabels(metadata.labels);
    };

    loadModel();
    getLabels();
  }, []);

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
              onClick={() =>
                setCamDirection(
                  camDirection === "user" ? "environment" : "user"
                )
              }
              disabled={loading}
              hover
            />
          </div>

          <Camera
            webcamRef={webcamRef}
            camDirection={camDirection}
            enabled={enabled}
            setEnabled={setEnabled}
            handleImageChange={handleImageChange}
            htmlImage={htmlImage}
            setHtmlImage={setHtmlImage}
          />

          {predictedClass && confidence && (
            <Result reference={predictedClass} confidence={confidence} />
          )}
        </div>
      </div>
    </>
  );
};

export default Identifier;
