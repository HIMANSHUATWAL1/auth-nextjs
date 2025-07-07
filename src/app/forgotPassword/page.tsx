"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const sendEmailToMailtraper = async () => {
    try {
      const res = await axios.post("/api/users/forgotPassword",{email});
      console.log("email send " + res);
      toast.success("mail send successfully");

    } catch (err) {
        console.log("send forgot mail fails : "+ err);
       
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black-100 to-yellow-900">
      <div className="flex flex-col m-6 ">
        <p className="mx-10 text-yellow-500">Please enter your email</p>
        <input
          className="m-2 border border-blue-500 rounded-2xl p-2  focus:outline-0"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          onClick={sendEmailToMailtraper}
          className="
              p-2 border-amber-200 bg-green-700 rounded-2xl text-white w-[100px] mx-18 cursor-pointer "
        >
          send mail
        </button>
      </div>
    </div>
  );
}
