"use client";

import { Watch } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import LoadingModal from "../../components/LoadingModal";
import WatchCard from "../../components/WatchCard";
import fetcher from "../util/fetcher";
import CollectionForm from "./components/CollectionForm";

const Collection: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(50);
  const [maxPages, setMaxPages] = useState<number>();

  const [recognizableOnly, setRecognizableOnly] = useState(true);

  const { data, error, isLoading } = useSWR<Watch[]>(
    `/api/watch/all?count=${count}&page=${page}&recognizable=${String(
      recognizableOnly
    )}`,
    fetcher
  );

  if (isLoading) return <LoadingModal />;

  if (error) {
    toast.error("Something went wrong! try again.");
    return null;
  }

  return (
    <div className="m-4">
      <CollectionForm
        recognizableOnly
        setCount={setCount}
        setRecognizableOnly={setRecognizableOnly}
        setPage={setPage}
        setMaxPages={setMaxPages}
      />
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
        <button
          className="btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
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
