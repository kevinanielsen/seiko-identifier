import clsx from "clsx";
import React from "react";

interface WatchCardProps {
  refference: string;
  collection: string;
  src: string;
  confidence?: number;
}

const WatchCard: React.FC<WatchCardProps> = ({
  refference,
  collection,
  src,
  confidence,
}) => {
  return (
    <div className="card-body">
      <h2 className="card-title">{refference}</h2>
      <div className="flex justify-center flex-col shrink-0">
        <p className="">
          <b>Collection: </b>Seiko {collection}
        </p>
      </div>
      <div className="w-full">
        <>
          <label htmlFor="confidence" className="label">
            Confidence
          </label>
          {confidence ? (
            <progress
              value={confidence - 60}
              max="40"
              className={clsx(
                "progress w-full",
                confidence <= 80 && "progress-error",
                confidence <= 92 && "progress-warning",
                confidence > 92 && "progress-success"
              )}
            />
          ) : (
            <progress max="100" className="progress w-full" />
          )}
        </>
      </div>
    </div>
  );
};

export default WatchCard;
