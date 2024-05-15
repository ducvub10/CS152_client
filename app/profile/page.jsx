"use client";

import { useAuth } from "@/hooks/auth";
import { useEffect } from "react";
import Personal from "./Personal";
import ProfileComments from "./ProfileComments";
import ProfileFlags from "./ProfileFlags";
import ProfileReviews from "./ProfileReviews";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { user, rerouteIfNotAuthenticated } = useAuth();

  return (
    <div className='p-10 space-y-14'>
      <Personal />
      <div className='space-y-5'>
        <ProfileReviews />
        <Separator />
        <ProfileComments />
        <Separator />
        <ProfileFlags />
      </div>
    </div>
  );
};

export default Profile;
