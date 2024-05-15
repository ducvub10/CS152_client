"use client";

import { Button } from "@/components/ui/button";
import { Flag, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import fetch from "@/utils/fetchClient";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/auth";

const ReviewFlagButton = ({ review_id }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { user } = useAuth();
  const [reason, setReason] = useState("");
  const closeRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/reviews/${review_id}/flagged`, router, pathname, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ reason }),
    });
    setReason("");
    toast({
      description: "Successfully reported.",
    });
    closeRef.current.click();
  };

  if (!user) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button size='icon'>
            <Flag />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className='bg-slate-900 font-semibold text-sm w-40 text-white'>
          Login to write a review
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Flag />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={onSubmit} className='space-y-3'>
          <AlertDialogHeader>
            <AlertDialogTitle>Flag Report</AlertDialogTitle>
          </AlertDialogHeader>
          <Textarea
            placeholder='Reason'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
          <AlertDialogFooter>
            <AlertDialogCancel ref={closeRef}>Cancel</AlertDialogCancel>
            <Button type='submit' className='space-x-2'>
              Report
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReviewFlagButton;
