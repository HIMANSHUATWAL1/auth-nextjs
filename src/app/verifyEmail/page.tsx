"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");

  const [verified, setVerified] = useState(false);

  const [err, setErr] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });

      setVerified(true);
    } catch (err: any) {
      setErr(true);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">verify your Email</h1>

      <h2 className="p-2 bg-orange-500 text-black">
        {" "}
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>

          <Link href="/login">Login</Link>
        </div>
      )}

      {err && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
