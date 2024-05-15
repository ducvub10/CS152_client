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
import { useAuth } from "@/hooks/auth";
import ProfileReview from "./ProfileReview";
import OptionsMenu from "./OptionsMenu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ProfileComments = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch("/user/comments", router, pathname, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      setComments(res.comments);
    };
    getComments();
  }, []);

  const onDeleteFilter = (id) => {
    const filteredComments = comments.filter(
      (comment) => comment.comment_id !== id
    );
    setComments(filteredComments);
  };

  const onUpdateFilterAndUpdate = (id, content, updated_at) => {
    const comment = comments.find((c) => c.comment_id === id);
    comment.comment_content = content;
    comment.comment_updated_at = updated_at;
    setComments([...comments]);
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Comments</h2>
      <div className='space-y-8'>
        {comments.length === 0 && <p className='text-center'>No Comments</p>}
        {comments.map((comment) => (
          <CommentReview
            key={comment.comment_id}
            comment={comment}
            onDeleteFilter={onDeleteFilter}
            onUpdateFilterAndUpdate={onUpdateFilterAndUpdate}
          />
        ))}
      </div>
    </div>
  );
};

const CommentReview = ({
  comment,
  onDeleteFilter,
  onUpdateFilterAndUpdate,
}) => {
  return (
    <div className='space-y-3 flex flex-col items-end'>
      <ProfileReview show_options={false} review={comment} />
      <Comment
        comment={comment}
        onDeleteFilter={onDeleteFilter}
        onUpdateFilterAndUpdate={onUpdateFilterAndUpdate}
      />
    </div>
  );
};

const Comment = ({ comment, onDeleteFilter, onUpdateFilterAndUpdate }) => {
  const { user } = useAuth();
  const [updateMode, setUpdateMode] = useState(false);

  return (
    <Card className='w-9/12'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle className='text-lg'>{user?.name}</CardTitle>
          <div className='flex space-x-5 items-center'>
            <CardDescription className='text-sm'>
              {comment.comment_updated_at || comment.comment_created_at}
            </CardDescription>
            {!updateMode && (
              <OptionsMenu
                path={"/user/comments"}
                id={comment.comment_id}
                onDeleteFilter={onDeleteFilter}
                onUpdateTrigger={() => setUpdateMode(true)}
              />
            )}
          </div>
        </div>
      </CardHeader>
      {updateMode ? (
        <CommentUpdateForm
          comment={comment}
          setUpdateMode={setUpdateMode}
          onUpdateFilterAndUpdate={onUpdateFilterAndUpdate}
        />
      ) : (
        <CardContent className='text-sm'>{comment.comment_content}</CardContent>
      )}
    </Card>
  );
};

const CommentUpdateForm = ({
  comment,
  setUpdateMode,
  onUpdateFilterAndUpdate,
}) => {
  const [updatedComment, setUpdatedComment] = useState(comment.comment_content);
  const router = useRouter();
  const pathname = usePathname();

  const onUpdate = async (e) => {
    e.preventDefault();

    await fetch(`/user/comments/${comment.comment_id}`, router, pathname, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        content: updatedComment,
      }),
    });
    setUpdateMode(false);
    onUpdateFilterAndUpdate(
      comment.comment_id,
      updatedComment,
      new Date().toISOString()
    );
  };

  return (
    <form onSubmit={onUpdate}>
      <CardContent>
        <Textarea
          value={updatedComment}
          onChange={(e) => setUpdatedComment(e.target.value)}
        />
      </CardContent>
      <CardFooter className='space-x-3 flex justify-end'>
        <Button
          type='button'
          variant='secondary'
          onClick={() => setUpdateMode(false)}
        >
          Cancel
        </Button>
        <Button type='submit'>Update</Button>
      </CardFooter>
    </form>
  );
};

export default ProfileComments;
