"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(false);

  const onSubmit = async () => {
    //send email in the request
    try {
      const response = await axios.post("/api/users/forgotpassword", { email });
      setEmailStatus(true);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl "> Forgot Password</h1>
      {emailStatus && <h1 className="text-green-500 p-2">Email sent</h1>}
      <label htmlFor="email">email</label>
      <input
        className="p-2 border-gray-300 rounded-lg mb-4 text-black"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <button
        onClick={onSubmit}
        className="p-2 border border-gray-300 rounded-lg mb-4"
      >
        Submit
      </button>
    </div>
  );
}
