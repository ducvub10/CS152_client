"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import fetch from "@/utils/fetchClient";

const ReviewVote = ({ review_id, v }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [votes, setVotes] = useState({
    upvote: v.upvote ? parseInt(v.upvote) : 0,
    downvote: v.downvote ? parseInt(v.downvote) : 0,
    userVote: v.userVote,
  });

  useEffect(() => {
    const postVote = async () => {
      if (votes.userVote === v.userVote) {
        return;
      }
      if (votes.userVote == null) {
        await fetch(`/reviews/${review_id}/critique`, router, pathname, {
          method: "DELETE",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
      } else if (v.userVote == null) {
        console.log("post");
        await fetch(`/reviews/${review_id}/critique`, router, pathname, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({ upvote: votes.userVote }),
        });
      } else {
        await fetch(`/reviews/${review_id}/critique`, router, pathname, {
          method: "PATCH",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({ upvote: votes.userVote }),
        });
      }
    };

    return () => {
      postVote();
    };
  }, [votes]);

  const changeVote = (value) => {
    let upvote = votes.upvote,
      downvote = votes.downvote,
      userVote;
    if (votes.userVote === 1) {
      if (value === "0") {
        upvote -= 1;
        downvote += 1;
      } else if (value === "") {
        upvote -= 1;
      }
    } else if (votes.userVote === 0) {
      if (value === "1") {
        upvote += 1;
        downvote -= 1;
      } else if (value === "") {
        downvote -= 1;
      }
    } else {
      if (value === "1") {
        upvote += 1;
      } else if (value === "0") {
        downvote += 1;
      }
    }
    userVote = value ? parseInt(value) : null;

    setVotes({ upvote, downvote, userVote });
  };

  if (!user) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className='flex space-x-4' type='single'>
            <div className='flex items-center space-x-2'>
              <ThumbsUp />
              <p>{votes.upvote}</p>
            </div>
            <div className='flex items-center space-x-2'>
              <ThumbsDown />
              <p>{votes.downvote}</p>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className='bg-slate-900 font-semibold text-sm w-40 text-white'>
          Login to write a review
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <ToggleGroup
      onValueChange={(value) => changeVote(value)}
      defaultValue={votes.userVote != null ? votes.userVote.toString() : ""}
      type='single'
    >
      <ToggleGroupItem value={"1"} className='space-x-2'>
        <ThumbsUp />
        <p>{votes.upvote}</p>
      </ToggleGroupItem>
      <ToggleGroupItem value={"0"} className='space-x-2'>
        <ThumbsDown />
        <p>{votes.downvote}</p>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ReviewVote;
