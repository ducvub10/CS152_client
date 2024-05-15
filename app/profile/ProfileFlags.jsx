"use client";

import fetch from "@/utils/fetchClient";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Repeat2, ClipboardList, Activity, Award } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import ProfileReview from "./ProfileReview";
import OptionsMenu from "./OptionsMenu";

const ProfileFlags = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    const getFlags = async () => {
      const res = await fetch("/user/flags", router, pathname, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      setFlags(res.flags);
    };
    getFlags();
  }, []);

  const onDeleteFilter = (id) => {
    const filteredFlags = flags.filter((flag) => flag.flag_id !== id);
    setFlags(filteredFlags);
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Flags</h2>
      <div className='space-y-8'>
        {flags.length === 0 && <p className='text-center'>No Flags</p>}
        {flags.map((flag) => (
          <FlagReview
            key={flag.flag_id}
            flag={flag}
            onDeleteFilter={onDeleteFilter}
          />
        ))}
      </div>
    </div>
  );
};

const FlagReview = ({ flag, onDeleteFilter }) => {
  return (
    <div className='space-y-3 flex flex-col items-end'>
      <ProfileReview show_options={false} review={flag} />
      <Flag flag={flag} onDeleteFilter={onDeleteFilter} />
    </div>
  );
};

const Flag = ({ flag, onDeleteFilter }) => {
  const { user } = useAuth();
  return (
    <Card className='w-9/12'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle className='text-lg'>{user?.name}</CardTitle>
          <div className='flex space-x-5 items-center'>
            <CardDescription className='text-sm'>
              {flag.flag_created_at}
            </CardDescription>
            <OptionsMenu
              path={"/user/flags"}
              id={flag.flag_id}
              onDeleteFilter={onDeleteFilter}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className='text-sm'>{flag.reason}</CardContent>
    </Card>
  );
};

export default ProfileFlags;
