import Button from "../components/Button";
import Input from "../components/Input";
import {BsGithub} from "react-icons/bs";

export default function Home() {
  return (
    <div className="flex h-full">
      <div className="w-[45%] flex flex-col justify-center items-center">
        <Button text="Log in with Github" disabled>
          <BsGithub size={24} />
        </Button>
        <Input
          label="Email"
          placeholder="Enter your email"
        />

      </div>
      <div className="w-[2px] bg-gray-200 mx-12" />
      <div className="w-[55%]">

      </div>
    </div>
  )
}