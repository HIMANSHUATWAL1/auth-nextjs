"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from "node:inspector/promises";

export default function ChangePassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [err, setErr] = useState("");
  const [token, setToken] = useState("");

  const changePass = async () => {
    if (confirmPass !== password) {
      toast.error("Your password is not matching! ");
      return;
    }

    try {
      const res = await axios.post("/api/users/changePassword", { password,token });
      console.log("password send to backend successfully " + res);
      toast.success("Password changed successfully")
      router.push("/login")
    } catch (err) {
      console.log("send forgot mail fails : " + err);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // for password and confirm password checking -->

  useEffect(() => {
    if (confirmPass && password !== confirmPass) {
      setErr("Your password is not matching!");
    } else {
      setErr("");
    }
  }, [password, confirmPass]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black-100 to-yellow-900">
      <div className="flex flex-col m-6 ">
        <p className="mx-10 text-yellow-500">Please enter your new Password</p>
        <input
          className="m-2 border border-blue-500 rounded-2xl p-2  focus:outline-0"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="m-2 border border-blue-500 rounded-2xl p-2  focus:outline-0"
          type="password"
          placeholder="please confirm your password"
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />

        {err && <p className="text-red-600 mx-14">{err}</p>}

        <button
          onClick={changePass}
          className="
              p-2 border-amber-200 bg-green-700 rounded-2xl text-white w-[200px] mx-18 my-4 cursor-pointer "
        >
          change password
        </button>
      </div>
    </div>
  );
}
