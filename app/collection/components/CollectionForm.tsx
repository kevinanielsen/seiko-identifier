"use client";

import fetcher from "@/app/util/fetcher";
import useSWR from "swr";
import { Watch } from "@prisma/client";

interface CollectionFormProps {
  recognizableOnly: boolean;
  setRecognizableOnly: any;
  setPage: any;
  setCount: any;
}

const CollectionForm: React.FC<CollectionFormProps> = ({
  recognizableOnly,
  setRecognizableOnly,
  setPage,
  setCount,
}) => {
  const { data, error, isLoading } = useSWR<Watch[]>(
    `/api/watch/all?recognizable=${String(recognizableOnly)}`,
    fetcher,
  );

  return (
    <>
      <h2 className="text-4xl font-bold">Collection</h2>
      <div className="w-full flex justify-center items-center">
        <div className="flex align-center max-w-7xl w-full justify-between mt-4">
          <p className="flex justify-center items-center font-bold text-xl">
            {isLoading && (
              <span className="loading loading-spinner loading-lg text-primary" />
            )}
            {error && "Error loading result count"}
            {data && data.length} results
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
    </>
  );
  return null;
};

export default CollectionForm;
