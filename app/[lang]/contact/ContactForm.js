"use client";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import contactImg from "../../../public/img/contact.svg";
import { useForm } from "react-hook-form";

export default function ContactForm({ page }) {
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isValid, isDirty } = formState;
  const onSubmit = (data) => {
    try {
      fetch("https://nikospap.blog/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (!response.ok) toast.error(page.contact.toastError);
        if (response.status === 200) toast.success(page.contact.toastSuccess);
      });
      reset();
    } catch (error) {
      toast.error(page.contact.toastError);
    }
  };
  return (
    <div>
      <Toaster />
      <Image src={contactImg} className="m-auto pb-9" alt="Επικοινωνία" />
      <form
        name="contactForm"
        id="contactForm"
        className="mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="grid grid-cols-2 w-11/12 sm:w-9/12 md:w-6/12 lg:w-3/12	mx-auto col-span-full justify-center">
          <div className="grid col-span-full">
            <label className="pt-4 w-40" htmlFor="name">
              {page.contact.name}
            </label>
            <input
              className="bg-neutral-300 border-cyan-500 border-2 rounded p-0.5 "
              type="text"
              name="name"
              id="name"
              {...register("name", { required: page.contact.nameError })}
            />
            <span role="alert" className="text-red-800 text-xs sm:text-sm">
              {errors.name?.message}
            </span>
            <label className="pt-4 w-40" htmlFor="email">
              E-mail
            </label>
            <input
              className="bg-neutral-300 border-cyan-500 border-2 rounded p-0.5"
              type="email"
              name="email"
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: page.contact.emailError,
                },
              })}
            />
            <span role="alert" className="text-red-800  text-xs sm:text-sm">
              {errors.email?.message}
            </span>
            <label className="pt-4 w-40" htmlFor="message">
              {page.contact.message}
            </label>
            <textarea
              className="bg-neutral-300 border-cyan-500 border-2 rounded p-0.5 h-32"
              name="message"
              id="message"
              {...register("message", {
                validate: {
                  minLength: (value) =>
                    value.length >= 20 || page.contact.messageError1,
                  maxLength: (value) =>
                    value.length <= 1000 || page.contact.messageError2,
                },
              })}
            ></textarea>
            <span role="alert" className="text-red-800 text-xs sm:text-sm">
              {errors.message?.message}
            </span>

            <button
              className={`mt-4 p-1 bg-green-700 text-white rounded ${
                !isDirty || !isValid ? "bg-slate-600 cursor-not-allowed" : ""
              } `}
              type="submit"
            >
              {page.contact.button}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
