import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
          // automatically send the user to the route
        }
      } else {
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            {/* placeholder input component mein explexitly defined nahi hai par fir bhi ye sambhal lega kyunki tabhi to vahan pe ...props daale the */}
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {/* ye ...register likhna zaroori hai nahi o ye register baaki registers ko overwrite kardega issi liye har input ke liye alag se spread karo  */}
            {/* aur jo naam diya hia jaise ki email vo key ban jata hai input ka data object mein  */}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

{
  /* <form onSubmit={handleSubmit(login)}></form>
yahan pe handleSubmit mein ham vo function ko send karte hain jiss ke through hum submit karna chahte hain handlesubmit ka fayda ye hua ki hamein saari ki saari input ke liye alag alag se state banake sambhalni nahi padega ye input se data leka r aake bhejne ka kaam automate karta hai */
}

// assignment ye hai ki agar ...props se saare jo ki declare nahi hue component mein fir bhi ...props ke via paas ho jayenge to declare karne ki hi kya zaroorat seedha bas jo aaye props mein paas kardo vo aage props mein paas kardega ye logic sahi hai ya galat aur kyun yehi assignment hai
