import Button from "@/components/Button";
import React from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import Webcam from "react-webcam";

type TCameraProps = {
  webcamRef: React.RefObject<Webcam>;
  imgSrc: HTMLImageElement | null | undefined;
  camDirection: "user" | "environment";
  enabled: boolean;
  setImgSrc: React.Dispatch<
    React.SetStateAction<HTMLImageElement | null | undefined>
  >;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const Camera: React.FC<TCameraProps> = ({
  webcamRef,
  imgSrc,
  camDirection,
  enabled,
  setEnabled,
  setImgSrc,
}) => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: camDirection,
  };

  const capture = async () => {
    if (webcamRef.current?.getScreenshot) {
      const imageSrc = webcamRef.current.getScreenshot();
      let image = new Image();
      if (imageSrc) {
        image.src = imageSrc;
        setImgSrc(image);
        setEnabled(false);
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center shadow-md aspect-video overflow-hidden">
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
        <div />
      </div>
      <div className="flex justify-center items-center w-full gap-4">
        <Button
          text="Capture image"
          fullWidth
          secondary
          disabled={!enabled}
          onClick={() => {
            capture();
            toast.loading("Identifying watch...");
          }}
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
    </>
  );
};

export default Camera;
