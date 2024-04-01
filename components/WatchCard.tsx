import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface WatchCardProps {
  reference: string;
  collection: string;
  src: string;
  confidence?: number | false;
  fullWidth: boolean;
  likeButton?: boolean;
}

const WatchCard: React.FC<WatchCardProps> = ({
  reference: reference,
  collection,
  src,
  confidence,
  fullWidth,
}) => {
  return (
    <div
      className={clsx(
        "card w-64 h-96 flex-shrink bg-base-100 shadow-xl",
        fullWidth === true && "w-full",
        fullWidth === false && "max-w-96"
      )}
    >
      <figure>
        <Link
          href={`/watch/${reference}`}
          className="flex w-full items-center justify-center"
        >
          <Image
            src={src}
            alt={`Image of ${reference}`}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-64 object-scale-down relative"
          />
        </Link>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{reference}</h2>
        <div className="flex shrink-0 flex-col justify-center">
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
