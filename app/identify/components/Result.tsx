"use client";

import LoadingModal from "@/components/LoadingModal";
import WatchCard from "@/components/WatchCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface IData {
  id: string;
  ref: string;
  collection: string;
  src: string;
}

interface ResultProps {
  refference: string;
  confidence?: string;
}

const Result: React.FC<ResultProps> = ({ refference, confidence }) => {
  const [data, setData] = useState<IData>({
    id: "",
    ref: "",
    collection: "",
    src: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  console.log(refference);

  if (refference.includes("No ")) {
    return (
      <div className="card shadow-xl w-full bg-base-100">
        <div className="card-body items-center text-center">
          <h2 className="card-title">No watch found</h2>
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
  }

  useEffect(() => {
    if (!refference.includes("No ")) {
      setLoading(true);
      axios
        .get(`/api/watch/${refference}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error: unknown) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [refference]);

  if (loading) return <LoadingModal />;

  return (
    <WatchCard
      collection={data.collection}
      refference={data.ref}
      confidence={Number(confidence)}
      src={data.src}
      fullWidth
    />
  );
};

export default Result;
