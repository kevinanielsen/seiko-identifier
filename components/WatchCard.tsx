import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import LikeButton from "./WatchComponents/LikeButton";

interface WatchCardProps {
  refference: string;
  collection: string;
  src: string;
  confidence?: number | false;
  fullWidth: boolean;
  likeButton?: boolean;
}

const WatchCard: React.FC<WatchCardProps> = ({
  refference,
  collection,
  src,
  confidence,
  fullWidth,
}) => {
  // const likeButton = true;

  return (
    <div
      className={clsx(
        "card shadow-xl flex-shrink w-64 bg-base-100",
        fullWidth === true && "w-full",
        fullWidth === false && "max-w-96"
      )}
    >
      <figure>
        <Link
          href={`/watch/${refference}`}
          className="w-full flex items-center justify-center gap-4 h-64 relative"
        >
          <Image
            src={src}
            alt={`Image of ${refference}`}
            className="aspect-auto object-contain relative w-auto max-h-64"
            fill={true}
          />
        </Link>
        {/* {likeButton && <LikeButton />} */}
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
                value={(confidence - 0.4) * 100}
                max="60"
                className={clsx(
                  "progress w-full",
                  confidence * 100 <= 80 && "progress-error",
                  confidence * 100 <= 92 && "progress-warning",
                  confidence * 100 > 92 && "progress-success"
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
