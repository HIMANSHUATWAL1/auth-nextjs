"use client"; // for converting signup component to a client component from server component

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";

export default function signupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
        setLoading(true);
        const res= await axios.post("/api/users/signup", user);

      console.log("Signup successful"+res.data);

      toast.success("Signup successful");
  
      // got to the next page
      
      router.push("/login");


    } catch (error: any) {

      console.log("Signup failed"+ error);
      
      toast.error(error.message);
    }
    finally{

    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1  className="text-red-500">{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      <label htmlFor="username"  className="text-yellow-600">Username</label>
      <input
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email"  className="text-yellow-600">Email</label>
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
        className="p-2 border  rounded-lg mb-4 focus:outline-none border-yellow-700 bg-red-900 cursor-pointer "
        onClick={onSignup}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login"  className="text-yellow-800">Visit Login Page</Link>
    </div>
  );
}
