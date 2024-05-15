"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Repeat2,
  ClipboardList,
  Activity,
  Award,
  EllipsisVertical,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/auth";
import OptionsMenu from "./OptionsMenu";
import { useRouter, usePathname } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import fetchData from "@/utils/fetchClient";

const ProfileReview = ({
  review,
  show_options = true,
  onDeleteFilter = () => {},
  onUpdateFilterAndUpdate = () => {},
}) => {
  const { user } = useAuth();
  const [updateMode, setUpdateMode] = useState(false);

  return (
    <Card className='w-full'>
      <CardHeader>
        <div className='flex justify-between'>
          <CardTitle>{review.user_name || user?.name}</CardTitle>
          <div className='flex space-x-5 items-center'>
            <CardDescription>
              {review.review_updated_at || review.review_created_at}
            </CardDescription>
            {show_options && !updateMode && (
              <OptionsMenu
                path={"/user/reviews"}
                id={review.id}
                onDeleteFilter={onDeleteFilter}
                onUpdateTrigger={() => setUpdateMode(true)}
              />
            )}
          </div>
        </div>
        <CardDescription>
          <b>
            {review.department} {review.course_number}
          </b>{" "}
          taught by <b>{review.professor_name}</b>
        </CardDescription>
      </CardHeader>
      {updateMode ? (
        <ReviewUpdateForm
          review={review}
          setUpdateMode={setUpdateMode}
          onUpdateFilterAndUpdate={onUpdateFilterAndUpdate}
        />
      ) : (
        <CardContent className='space-y-3'>
          <p>{review.review_content}</p>
          <ReviewStats
            grade={review.grade}
            take_again={review.take_again}
            quality={review.quality}
            difficulty={review.difficulty}
          />
        </CardContent>
      )}
    </Card>
  );
};

const ReviewStats = ({ grade, take_again, quality, difficulty }) => {
  return (
    <div className='flex space-x-5'>
      <Card className='flex space-x-5  items-center p-5'>
        <ClipboardList />
        <CardContent className='p-0'>
          <h4 className='text-lg font-semibold '>{grade || "N/A"}</h4>
          <p className='text-xs text-slate-400'>Grade</p>
        </CardContent>
      </Card>
      <Card className='flex space-x-5  items-center p-5'>
        <Repeat2 />
        <CardContent className='p-0'>
          <h4 className='text-lg font-semibold '>
            {take_again ? "Yes" : "No"}
          </h4>
          <p className='text-xs text-slate-400'>Take Again</p>
        </CardContent>
      </Card>
      <Card className='flex space-x-5  items-center p-5'>
        <Activity />
        <CardContent className='p-0'>
          <h4 className='text-lg font-semibold '>{difficulty}</h4>
          <p className='text-xs text-slate-400'>Difficulty</p>
        </CardContent>
      </Card>
      <Card className='flex space-x-5  items-center p-5'>
        <Award />
        <CardContent className='p-0'>
          <h4 className='text-lg font-semibold '>{quality}</h4>
          <p className='text-xs text-slate-400'>Quality</p>
        </CardContent>
      </Card>
    </div>
  );
};

const ReviewUpdateForm = ({
  review,
  setUpdateMode,
  onUpdateFilterAndUpdate,
}) => {
  const [updatedReview, setUpdatedReview] = useState({
    content: review.review_content,
    quality: review.quality,
    difficulty: review.difficulty,
    grade: review.grade,
    take_again: review.take_again,
  });
  const router = useRouter();
  const pathname = usePathname();

  const onUpdate = async (e) => {
    e.preventDefault();

    await fetchData(`/user/reviews/${review.id}`, router, pathname, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(updatedReview),
    });
    setUpdateMode(false);
    onUpdateFilterAndUpdate(review.id, updatedReview, new Date().toISOString());
  };

  const updateReviewData = (key, val) => {
    setUpdatedReview({ ...updatedReview, [key]: val });
  };

  return (
    <form onSubmit={onUpdate}>
      <CardContent className='space-y-3'>
        <Textarea
          value={updatedReview.content}
          onChange={(e) => updateReviewData("content", e.target.value)}
          required
        />
        <ReviewUpdateStats
          grade={updatedReview.grade}
          take_again={updatedReview.take_again}
          quality={updatedReview.quality}
          difficulty={updatedReview.difficulty}
          updateReviewData={updateReviewData}
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

const ReviewUpdateStats = ({
  grade,
  take_again,
  quality,
  difficulty,
  updateReviewData,
}) => {
  return (
    <div className='flex space-x-10 items-center'>
      <div className='space-y-1'>
        <p className='font-semibold text-sm text-slate-500'>Quality</p>
        <Select
          defaultValue={quality + ""}
          onValueChange={(val) => updateReviewData("quality", parseInt(val))}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='1'>1</SelectItem>
            <SelectItem value='2'>2</SelectItem>
            <SelectItem value='3'>3</SelectItem>
            <SelectItem value='4'>4</SelectItem>
            <SelectItem value='5'>5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-1'>
        <p className='font-semibold text-sm text-slate-500'>Difficulty</p>
        <Select
          defaultValue={difficulty + ""}
          onValueChange={(val) => updateReviewData("difficulty", parseInt(val))}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='1'>1</SelectItem>
            <SelectItem value='2'>2</SelectItem>
            <SelectItem value='3'>3</SelectItem>
            <SelectItem value='4'>4</SelectItem>
            <SelectItem value='5'>5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-1'>
        <p className='font-semibold text-sm text-slate-500'>Grade</p>
        <Select
          defaultValue={grade || "Prefer Not to Say"}
          onValueChange={(val) =>
            updateReviewData("grade", val === "Prefer Not to Say" ? null : val)
          }
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='A+'>A+</SelectItem>
            <SelectItem value='A'>A</SelectItem>
            <SelectItem value='A-'>A-</SelectItem>
            <SelectItem value='B+'>B+</SelectItem>
            <SelectItem value='B'>B</SelectItem>
            <SelectItem value='B-'>B-</SelectItem>
            <SelectItem value='C+'>C+</SelectItem>
            <SelectItem value='C'>C</SelectItem>
            <SelectItem value='C-'>C-</SelectItem>
            <SelectItem value='D+'>D+</SelectItem>
            <SelectItem value='D'>D</SelectItem>
            <SelectItem value='D-'>D-</SelectItem>
            <SelectItem value='F'>F</SelectItem>
            <SelectItem value='Prefer Not to Say'>Prefer Not to Say</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-1'>
        <p className='font-semibold text-sm text-slate-500'>Take Again</p>
        <Select
          defaultValue={take_again ? "Yes" : "No"}
          onValueChange={(val) =>
            updateReviewData("take_again", val === "Yes" ? true : false)
          }
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Yes'>Yes</SelectItem>
            <SelectItem value='No'>No</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProfileReview;
