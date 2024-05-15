"use client";
import { useAuth } from "@/hooks/auth";

const LoadingAuth = () => {
  const { loading } = useAuth();
  return (
    <div
      className={`fixed transition-opacity duration-1000 z-10 w-screen h-screen bg-slate-800 flex justify-center items-center ${
        loading ? "opacity-100 block" : "opacity-0 hidden"
      }`}
    >
      <p className='font-bold text-xl text-white'>Welcome to RateSJSU</p>
    </div>
  );
};

export default LoadingAuth;
