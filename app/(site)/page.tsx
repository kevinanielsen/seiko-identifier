import Form from "./components/Form";

export default function Home() {
  return (
    <div className="flex h-full">
      <div className="h-full w-full md:w-[45%] flex justify-center items-center">
        <Form />
      </div>
      
      <div className="w-[2px] bg-gray-200 hidden md:block" />
      <div className="w-[55%] hidden md:block">

      </div>
    </div>
  )
}