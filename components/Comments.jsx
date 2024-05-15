"use client";

import Comment from "./Comment";
import { Button } from "./ui/button";
import { Reply } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import fetch from "@/utils/fetchClient";
import { useRouter, usePathname } from "next/navigation";

const Comments = ({ c, review_id }) => {
  const [comments, setComments] = useState(c);

  const updateComments = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className='flex flex-col space-y-3 items-end'>
      <CommentForm review_id={review_id} updateComments={updateComments} />
      <div className='space-y-3 w-9/12'>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

const CommentForm = ({ review_id, updateComments }) => {
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/reviews/${review_id}/comments`, router, pathname, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ content: comment }),
    });
    setComment("");
    updateComments({
      user_name: user?.name,
      created_at: new Date().toISOString(),
      content: comment,
    });
  };

  return (
    <Card className='w-9/12'>
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className='text-lg'>Write Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            required
            id='comment'
            placeholder='Type your message here.'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </CardContent>
        <CardFooter className=''>
          {!user ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button type='button'>
                  <Reply className='mr-2' />
                  Reply
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className='bg-slate-900 font-semibold text-sm w-40 text-white'>
                Login to write a review
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Button type='submit'>
              <Reply className='mr-2' />
              Reply
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default Comments;
