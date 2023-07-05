"use client";

import WatchCard from "@/app/components/WatchCard";
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

  if (collection && src) {
    return (
      <WatchCard
        refference={refference}
        collection={collection}
        src={src}
        confidence={confidence}
        fullWidth
      />
    );
  }
};

export default Result;
