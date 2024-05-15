"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const GoogleAuthButton = () => {
  const { user, authenticate, rerouteIfAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    rerouteIfAuthenticated();
  }, [user]);

  return (
    // <form action='http://localhost:5000/auth/google' method='get'>
    <Button variant='outline' className='p-5' onClick={authenticate}>
      <FcGoogle size={"20px"} className='mr-3' /> Authenticate
    </Button>
    // </form>
  );
};

export default GoogleAuthButton;
