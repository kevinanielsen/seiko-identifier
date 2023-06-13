"use client";

import LoadingModal from "@/app/components/LoadingModal";
import axios from "axios";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Watch = () => {
  const path = usePathname();
  const refference = path.split("/")[2];
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`/api${path}`)
      .then((response: any) => {
        setData(response.data);
      })
      .catch((error: any) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  }, [path]);

  return (
    <>
      {loading && <LoadingModal />}
      <div className="flex flex-col items-center">
        <div className="p-8 flex flex-col md:flex-row gap-8 w-full">
          <div className="gap-4 flex flex-col w-5/12">
            <h1 className="text-4xl font-bold">Seiko {refference}</h1>
            <Image
              src={data?.src}
              className="h-[500px] rounded shadow-xl object-cover object-center"
              alt="alt"
              height="500"
              width="375"
              priority
            />
          </div>
          <div className="w-7/12">
            <div className="collapse collapse-open bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">About</div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;
