"use client";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import contactImg from "../../public/img/contact.svg";
import { useForm } from "react-hook-form";

export default function Contact() {
  const form = useForm();
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isValid, isDirty } = formState;
  const onSubmit = (data) => {
    try {
      fetch("http://localhost:3000/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status === 500)
          toast.error("Κάτι πήγε στραβά προσπαθήστε ξανά");
        if (response.status === 200) toast.success("Το μήνυμα σας στάλθηκε");
      });
      reset();
    } catch (error) {
      toast.error("Κάτι πήγε στραβά προσπαθήστε ξανά");
    }
  };

  return (
    <>
      <Toaster />
      <Image src={contactImg} className="m-auto pb-9" alt="Επικοινωνία" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid justify-center text-sm sm:text-base w-full m-auto"
        noValidate
      >
        <div className="grid">
          <label className="pt-4 w-40" htmlFor="name">
            Your name
          </label>
          <input
            className="bg-neutral-300 border-cyan-500 border-2 rounded sm:w-96 p-0.5 max-w-xl"
            type="text"
            name="name"
            id="name"
            {...register("name", { required: "User name is required." })}
          />
          <span role="alert" className="text-red-800 text-xs sm:text-sm">
            {errors.name?.message}
          </span>
          <label className="pt-4 w-40" htmlFor="email">
            Your email
          </label>
          <input
            className="bg-neutral-300 border-cyan-500 border-2 rounded p-0.5 max-w-xl"
            type="email"
            name="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Please enter a valid email.",
              },
            })}
          />
          <span role="alert" className="text-red-800  text-xs sm:text-sm">
            {errors.email?.message}
          </span>
          <label className="pt-4 w-40" htmlFor="message">
            Your message
          </label>
          <textarea
            className="bg-neutral-300 border-cyan-500 border-2 rounded p-0.5 max-w-xl h-32"
            name="message"
            id="message"
            {...register("message", {
              validate: {
                minLength: (value) =>
                  value.length >= 20 ||
                  "Message must be at least 20 characters long.",
                maxLength: (value) =>
                  value.length <= 200 ||
                  "Message must be less than 200 characters long.",
              },
            })}
          ></textarea>
          <span role="alert" className="text-red-800 text-xs sm:text-sm">
            {errors.message?.message}
          </span>

          <button
            className={`mt-4 p-1 bg-green-700 text-white rounded max-w-xl ${
              !isDirty || !isValid ? "bg-slate-600 cursor-not-allowed" : ""
            } `}
            type="submit"
          >
            Αποστολή
          </button>
        </div>
      </form>
    </>
  );
}
