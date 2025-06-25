"use client";

import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState("nothing");

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");

      toast.success("logout successsfull");

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/meUser");

    console.log("User Details: ", res.data);

    setUser(res.data.data.username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">

      <h1>Profile Page</h1>
      <hr />
      <p>This is the profile page.</p>

      <h2 className="p-3 rounded text-amber-200 bg-amber-950">
        {user === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${user}`}>{user}</Link>
        )}
      </h2>
       

       
      <hr />

      <button
        className="border bg-amber-600
       p-2  m-4 rounded-md text-white hover:bg-amber-500 transition-all duration-300
      "
        onClick={logout}
      >
        Logout
      </button>

      <button
        className="border bg-purple-400
       p-2  m-4 rounded-md text-white hover:bg-green-500 transition-all duration-300
      "

      onClick={getUserDetails}
      >
        getUser Details
      </button>
    </div>
  );
}
