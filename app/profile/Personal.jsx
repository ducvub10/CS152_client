"use client";

import { useAuth } from "@/hooks/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Personal = () => {
  const { user } = useAuth();
  return (
    <div className='relative rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-60 w-full'>
      <Avatar className='w-40 h-40 bg-slate-400 absolute top-[50%] left-[10%]'>
        <AvatarImage src={user?.photo} alt='Photo' />
        <AvatarFallback>{user?.name[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Personal;
