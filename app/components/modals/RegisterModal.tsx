"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

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

    //fetching data from api folder and sening data (name, emai, password) also closeing the model
    axios
      .post("/api/register", data)
      .then(() => registerModal.onClose())
      .catch((error) => {
        console.log("register Modal", error);

        toast.error("Something went wrong!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create a account!" />
      <Input
        disabled={isLoading}
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        disabled={isLoading}
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />
      <Input
        disabled={isLoading}
        id="password"
        label="Password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
