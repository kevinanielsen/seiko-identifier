"use client";

import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useState, useEffect } from "react";

interface IData {
  id: string;
  ref: string;
  collection: string;
  src: string;
}

const Result = (props: { refference?: string; confidence?: number }) => {
  const [data, setData] = useState<IData>({
    id: "",
    ref: "",
    collection: "",
    src: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const refference = props?.refference;

  useEffect(() => {
    if (refference !== "No watch found") {
      setLoading(true);
      const result = axios
        .get(`/api/watch/${refference}`)
        .then((res) => {
          console.log(res);
          setData(res.data);
        })
        .catch((error: any) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [refference]);

  if (!refference) return null;

  if (refference === "No watch found")
    return (
      <div className="card shadow-xl w-full bg-base-100">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{refference}</h2>
          <div className="flex items-center flex-col">
            <p className="underline font-bold text-lg">Maybe try</p>
            <ul className="list-disc list-inside pb-1">
              <li>Taking the image in better lighting</li>
              <li>Make sure the watch is centered</li>
              <li>Having the watch be in focus</li>
            </ul>
          </div>
        </div>
      </div>
    );

  const { collection, src } = data;
  const { confidence } = props;

  return (
    <div className="card shadow-xl w-full">
      <figure>
        <Link href={`/watch/${refference}`} className="w-full flex items-center justify-center">
          <img
            src={src}
            alt={`Image of ${refference}`}
            className="h-64 aspect-auto"
          />
        </Link>
      </figure>
      {src && collection && (
        <div className="card-body">
          <h2 className="card-title">{refference}</h2>
          <div className="flex justify-center flex-col shrink-0">
            <p className="">
              <b>Collection: </b>Seiko {collection}
            </p>
          </div>
          <div className="w-full">
            <>
              <label htmlFor="confidence" className="label">Confidence</label>
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
      )}
    </div>
  );
};

export default Result;
