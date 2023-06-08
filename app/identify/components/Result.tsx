"use client";

import axios from "axios";
import clsx from "clsx";
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
    if (refference) {
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
      <div className="border shadow rounded-md w-full md:w-7/12 p-4 flex gap-2 flex-col justify-center items-center">
        <h2 className="text-xl font-bold">{refference}</h2>
        <div className="flex items-center flex-col">
          <p className="underline font-bold text-lg">Maybe try</p>
          <ul className="list-disc list-inside pb-1">
            <li>Taking the image in better lighting</li>
            <li>Make sure the watch is centered</li>
            <li>Having the watch be in focus</li>
          </ul>
        </div>
      </div>
    );

  const { collection, src } = data;
  const { confidence } = props;
  console.log(confidence);

  return (
    <div className="border shadow rounded-md w-full md:w-7/12 p-4 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold">{refference}</h2>
      {src && collection && (
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center flex-col shrink-0">
            <p className="text-lg"><b>Collection: </b>Seiko {collection}</p>
            <img
              src={src}
              alt={`Image of ${refference}`}
              className="h-64 aspect-auto"
            />
          </div>
          <div className="w-full">
            {confidence && (
              <>
                <label htmlFor="confidence">Confidence</label>
                <div className="w-full h-4 rounded-full overflow-hidden bg-gray-300">
                  <div
                    style={{ width: `${confidence}%` }}
                    className={clsx(
                      `h-full`,
                      confidence <= 70 && "bg-red-500",
                      71 <= confidence && 90 >= confidence && "bg-sky-500",
                      91 <= confidence && "bg-green-400"
                    )}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
