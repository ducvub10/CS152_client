"use client";

import { useAuth } from "@/hooks/auth";
import { Button } from "./ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { usePathname } from "next/navigation";

const WriteReviewButton = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button>Write Review</Button>
        </HoverCardTrigger>
        <HoverCardContent className='bg-slate-900 font-semibold text-sm w-40 text-white'>
          Login to write a review
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <Link href={`${pathname}/reviews/write`}>
      <Button>Write Review</Button>
    </Link>
  );
};

export default WriteReviewButton;
