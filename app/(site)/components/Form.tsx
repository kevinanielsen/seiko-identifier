"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { BsGithub } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

const Form = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/home");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials.");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
            router.push("/home");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials.");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      className="max-w-lg w-full flex flex-col justify-center items-center p-4 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthSocialButton text="Continue with Github" onClick={() => socialAction("github")} icon={BsGithub} />
      <p className="font-light text-gray-500 text-xs">or</p>
      {variant === "REGISTER" && (
        <Input
          type="text"
          id="name"
          label="Name"
          placeholder="Enter your name"
          register={register}
          errors={errors}
          disabled={isLoading}
          required={variant === "REGISTER"}
        />
      )}
      <Input
        type="email"
        pattern="[^ @]*@[^ @]*"
        id="email"
        label="Email"
        placeholder="Enter your email"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <Input
        type="password"
        id="password"
        label="Password"
        placeholder="Password"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <Button disabled={isLoading} text={variant === "LOGIN" ? "Log in" : "Register"} secondary type="submit" />
      {variant === "LOGIN" ? (<p className="text-gray-900">
        Don't have an account?{" "}
        <button type="button" className="text-sky-500" onClick={toggleVariant}>
          Sign up
        </button>
      </p>) : (
        <p className="text-gray-900">
          Already have an account?{" "}
          <button type="button" className="text-sky-500" onClick={toggleVariant}>
            Sign in
          </button>
        </p>
      )}
    </form>
  );
};

export default Form;
