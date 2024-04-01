import Button from "@/components/Button";
import React from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import Webcam from "react-webcam";

type TCameraProps = {
  webcamRef: React.RefObject<Webcam>;
  camDirection: "user" | "environment";
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageChange: (imageSrc: string) => Promise<void>;
  htmlImage: HTMLImageElement | undefined;
  setHtmlImage: React.Dispatch<
    React.SetStateAction<HTMLImageElement | undefined>
  >;
};

const Camera: React.FC<TCameraProps> = ({
  webcamRef,
  camDirection,
  enabled,
  setEnabled,
  handleImageChange,
  htmlImage,
  setHtmlImage,
}) => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: camDirection,
  };

  const capture = async () => {
    if (webcamRef.current?.getScreenshot) {
      toast.loading("Identifying watch...");
      setEnabled(false);
      const imageSrc = webcamRef.current.getScreenshot();
      await handleImageChange(imageSrc!);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center shadow-md aspect-video overflow-hidden">
        {enabled && (
          <Webcam
            aria-label="Camera feed"
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
          />
        )}
        {!enabled && !htmlImage && (
          <div className="bg-gray-100 w-full h-full flex items-center justify-center text-xl font-bold">
            Camera Disabled
          </div>
        )}
        {!enabled && htmlImage && (
          <div className="bg-gray-100 w-full h-full flex items-center justify-center text-xl font-bold">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={htmlImage.src} alt="image" />
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
          onClick={capture}
          hover
        />

        <Button
          icon={BiTrash}
          disabled={enabled}
          onClick={() => {
            setEnabled(true);
            setHtmlImage(undefined);
          }}
          aria="Clear image"
          hover
        />
      </div>
    </>
  );
};

export default Camera;
