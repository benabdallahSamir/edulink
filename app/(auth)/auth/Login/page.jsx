"use client";
import { useState } from "react";
import { Button } from "/components/ui/button";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";

import Image from "next/image";
import googleLogo from "@/public/google.svg";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { googleAuth, login } from "@/request/auth";
import { errorNotifcation, successNotifcation } from "@/components/toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const route = useRouter();
  const isButtonDisabled = !username || !password;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError('');

    const { status, data } = await login(username, password);

    switch (status) {
      case 200:
        successNotifcation("welcome back")
        route.push(`/`);
        break;
      case 500:
        errorNotifcation(data.message);
        break;
      case 10:
        errorNotifcation("code error status 10");
        break;
      default:
        setError(data.message);
    }
    setLoading(false);
  };

  const handleGoogleclick = () => {
    googleAuth();
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center justify-around bg-white rounded-lg h-[90vh] ">
      <div className="text-center">
        <h1 className="text-3xl leading-8 text-[#111111] font-gilroy font-medium mt-8">
          Welcome back
        </h1>
        <p className="text-sm leading-8 font-gilroy text-[#111111]">
          Don’t have an account?
          <Link href="/auth/Signup" className="underline hover:text-black">
            Sign up
          </Link>
        </p>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6 w-full h-[70%]"
      >
        <div className="text-[#666666]">
          <Label
            htmlFor="username"
            className="font-normal font-gilroy text-base"
          >
            username
          </Label>
          <Input
            className="rounded-xl text-base h-[45px] p-4"
            placeholder="Enter you username"
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="text-[#666666]">
          <div className="flex flex-row justify-between items-start">
            <Label
              htmlFor="password"
              className="font-normal font-gilroy text-base"
            >
              Password
            </Label>
            <div className="w-18">
              {showPassword ? (
                <button
                  type="button"
                  className="flex flex-row justify-between items-center w-full text-gray-500 hoverTransition hover:text-gray-900"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <VisibilityOffIcon fontSize="small" className="pr-1" />
                  <span className="text-md font-gilroy">Hide</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="flex flex-row justify-between items-center w-full text-gray-500 hoverTransition hover:text-gray-900"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <VisibilityIcon fontSize="small" className="pr-1" />
                  <span className="text-md font-gilroy">Show</span>
                </button>
              )}
            </div>
          </div>
          <Input
            className="rounded-xl text-base h-[45px] px-4"
            placeholder="Enter your password"
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && (
          <span className="text-red-500 text-sm font-gilroy text-start font-medium">
            {error}
          </span>
        )}
        <Button
          variant="secondary"
          onClick={handleSubmit}
          className="w-full rounded-[40px] font-gilroy font-medium p-6 bg-[#111111] text-white text-xl disabled:opacity-50 hover:opacity-90 hoverTransition"
          disabled={loading || isButtonDisabled}
        >
          {loading? "Logging in..." : "Login"}
        </Button>
        <Button
          variant="outline"
          onClick={handleGoogleclick}
          className="w-full border-2 border-[#333333] bg-white rounded-[40px] font-gilroy font-medium p-6 text-[#111111] text-xl hover:bg-gray-200 hoverTransition"
        >
          <Image src={googleLogo} alt="google logo" width="24" height="24" />
          Continue with Google
        </Button>
      </form>
    </div>
  );
};

export default Login;
