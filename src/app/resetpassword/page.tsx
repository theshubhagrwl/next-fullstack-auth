"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function PasswordReset() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(false);

  const onSubmit = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword", {
        password,
        token,
      });
      setStatus(true);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  //   useEffect(() => {
  //     if (token.length > 0) {
  //       onSubmit();
  //     }
  //   }, [token]);

  return (
    <div>
      {status && (
        <h1 className="text-green-500 p-2">
          Password Changed{" "}
          <Link href="/login" className="text-blue-500">
            Login Here
          </Link>{" "}
        </h1>
      )}
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border-gray-300 rounded-lg mb-4 text-black"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <label htmlFor="confirm-pass">Confirm Password</label>
      <input
        className="p-2 border-gray-300 rounded-lg mb-4 text-black"
        id="confirm-pass"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
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
