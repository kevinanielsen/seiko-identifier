import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface WatchCardProps {
  refference: string;
  collection: string;
  src: string;
  confidence?: number | false;
  fullWidth: boolean;
}

const WatchCard: React.FC<WatchCardProps> = ({
  refference,
  collection,
  src,
  confidence,
  fullWidth
}) => {
  return (
    <div className={clsx("card shadow-xl flex-shrink w-64 bg-base-100", fullWidth === true && "w-full", fullWidth === false && "max-w-96")}>
      <figure>
        <Link
          href={`/watch/${refference}`}
          className="w-full flex items-center justify-center"
        >
          <img
            src={src}
            alt={`Image of ${refference}`}
            className="h-64 aspect-auto"
          />
        </Link>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{refference}</h2>
        <div className="flex justify-center flex-col shrink-0">
          <p className="">
            <b>Collection: </b>Seiko {collection}
          </p>
        </div>
        <div className="w-full">
          {confidence && (
            <>
              <label htmlFor="confidence" className="label">
                Confidence
              </label>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchCard;
