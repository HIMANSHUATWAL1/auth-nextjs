"use client"; // for converting signup component to a client component from server component

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {

      setLoading(true);
      const res=await axios.post("/api/users/login", user);

      console.log("Login successful: " + res.data);

      toast.success("Login successful");

      // Redirect to the home page after successful login

      router.push("/profile");


    } catch (error: any) {
      console.log("Login failed: " + error);
      toast.error(error.message);


    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-red-500">{loading?"Processing...":"Login Page"}</h1>
      <hr />

      <label htmlFor="email" className="text-yellow-600">Email</label>
      <input
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password"  className="text-yellow-600">Password</label>
      <input
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        className="p-2 border  rounded-lg mb-4 focus:outline-none border-green-800 bg-green-400"
        onClick={onLogin}
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>

       <Link href="/forgotPassword" className="text-yellow-800 text-[15px]">Forgot password?</Link>
      <Link href="/signup" className="text-yellow-400">Visit Signup Page</Link>
    </div>
  );
}
