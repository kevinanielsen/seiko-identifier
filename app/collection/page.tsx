"use client";

import { Watch } from "@prisma/client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import LoadingModal from "../components/LoadingModal";
import WatchCard from "../components/WatchCard";

const Collection: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(50);
  const [maxPages, setMaxPages] = useState<number>();

  const [recognizableOnly, setRecognizableOnly] = useState(true);

  const [resultCount, setResultCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/watch/all?count=${count}&page=${page}&recognizable=${String(
          recognizableOnly
        )}`
      )
      .then((res) => setData(res.data))
      .catch((error: any) => {
        toast.error("Something went wrong!");
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [count, setCount, page, setPage, recognizableOnly]);

  useEffect(() => {
    axios
      .get(`/api/watch/all?recognizable=${String(recognizableOnly)}`)
      .then((res) => setResultCount(res.data.length));
  }, [recognizableOnly]);

  return (
    <div className="m-4">
      <h2 className="text-4xl font-bold">Collection</h2>
      <div className="w-full flex justify-center items-center">
        <div className="flex align-center max-w-7xl w-full justify-between mt-4">
          <p className="flex justify-center items-center font-bold text-xl">
            {resultCount} results
          </p>
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="form-control">
              <label className="label cursor-pointer gap-4">
                <span className="label-text">AI Recognizable Only</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-lg"
                  checked={recognizableOnly}
                  onChange={(e) => {
                    setRecognizableOnly(e.target.checked);
                    setPage(1);
                  }}
                />
              </label>
            </div>
            <div className="form-control">
              <select
                className="select select-bordered"
                onChange={(e) => setCount(Number(e.target.value))}
              >
                <option disabled>Items per page</option>
                <option>25</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>

      {loading && <LoadingModal />}

      {data && (
        <div className="flex flex-wrap flex-row gap-4 justify-between">
          {data.map((watch: Watch) => (
            <WatchCard
              collection={watch.collection}
              refference={watch.ref}
              src={watch.src}
              fullWidth={false}
              key={watch.ref}
            />
          ))}
        </div>
      )}
      <div className="w-full flex flex-row justify-center items-center p-4 gap-4">
        <button className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
          {"<"}
        </button>
        <span className="btn btn-neutral">{page}</span>
        <button
          disabled={page === maxPages}
          onClick={() => setPage(page + 1)}
          className="btn"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Collection;
