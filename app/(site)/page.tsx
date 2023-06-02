import Image from "next/image";
import Form from "./components/Form";

export default function Home() {
  return (
    <div className="flex h-full">
      <div className="h-full w-full md:w-[45%] flex flex-col gap-12 justify-center items-center">
        <div className="md:hidden flex justify-center items-center gap-4">
          <Image
            src="/si-logo.png"
            alt="logo"
            width={512}
            height={512}
            className="w-16"
          />
          <h1 className="text-4xl font-bold">Seiko Identifier</h1>
        </div>
        <div className="w-1/2 border-b-2 md:hidden" />
        <Form />
      </div>

      <div className="w-[2px] bg-gray-200 hidden md:block" />
      <div className="w-[55%] hidden md:flex justify-center items-center gap-4">
        <Image
          src="/si-logo.png"
          alt="logo"
          width={512}
          height={512}
          className="w-16"
        />
        <h1 className="text-4xl font-bold">Seiko Identifier</h1>
      </div>
    </div>
  );
}
