"use client";

import { Dispatch, SetStateAction } from "react";

interface CollectionFormProps {
  setRecognizableOnly: Dispatch<SetStateAction<boolean>>;
  setPage: Dispatch<SetStateAction<number>>;
  setCount: Dispatch<SetStateAction<number>>;
  count: number;
  resultCount?: number;
}

const CollectionForm: React.FC<CollectionFormProps> = ({
  setRecognizableOnly,
  setPage,
  setCount,
  count,
  resultCount,
}) => {
  return (
    <>
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
                  defaultChecked
                  onChange={(e) => {
                    setRecognizableOnly(e.target.checked);
                    e.target.checked && setPage(1);
                  }}
                />
              </label>
            </div>
            <div className="form-control">
              <select
                className="select select-bordered"
                onChange={(e) => setCount(Number(e.target.value))}
                value={count}
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
};

export default CollectionForm;
