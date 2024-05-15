import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Repeat2, ClipboardList, Activity, Award } from "lucide-react";
import { Button } from "./ui/button";
import Comments from "./Comments";
import ReviewFlagButton from "./ReviewFlagButton";
import ReviewVote from "./ReviewVote";

const Review = ({ review }) => {
  return (
    <div className='space-y-3'>
      <Card>
        <CardHeader>
          <div className='flex justify-between'>
            <CardTitle>{review.user_name}</CardTitle>
            <CardDescription>
              {review.updated_at || review.created_at}
            </CardDescription>
          </div>
          <CardDescription>
            {review.professor_name ||
              `${review.department} ${review.course_number}`}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <p>{review.content}</p>
          <ReviewStats
            grade={review.grade}
            take_again={review.take_again}
            quality={review.quality}
            difficulty={review.difficulty}
          />
        </CardContent>
        <ReviewFooter votes={review.votes} review_id={review.id} />
      </Card>
      <Comments c={review.comments} review_id={review.id} />
    </div>
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

const ReviewFooter = ({ votes, review_id }) => {
  return (
    <CardFooter className='flex justify-between items-center'>
      <div className='flex space-x-3'>
        <ReviewVote v={votes} review_id={review_id} />
        <ReviewFlagButton review_id={review_id} />
      </div>
    </CardFooter>
  );
};

export default Review;
