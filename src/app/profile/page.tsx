"use client"
import axios from "axios";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter()
  const logout = async () => {

    try {
      const response = await axios.get("/api/users/logout")

      console.log(response)
      toast.success("Logout Success");
      router.push('/login')

    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const [data, setData] = useState("nothing")

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data._id)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile </h1>
      <h2>
        {data === 'nothing' ? "Nothing" :
          <Link href={`/profile/${data}`}>{data}
          </Link>
        }
      </h2>
      <hr />
      <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <button className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div >
  );
}
