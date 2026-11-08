import React from "react";
import authService from "@/appwrite/auth";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "@/store/slice/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("");
    try {
      // createAccount also logs the user in (see appwrite/auth.js)
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full items-center justify-center py-12">
      <div className="mx-auto w-full max-w-lg rounded-xl border border-white/10 bg-zinc-900 p-10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-2xl leading-tight font-bold text-white">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-zinc-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-indigo-400 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="mt-8 text-center text-red-400">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}

            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}

            <Button type="submit" bgColor="bg-indigo-600" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
