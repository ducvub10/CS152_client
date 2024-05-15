import CourseDetails from "./CourseDetails";
import CourseStats from "./CourseStats";
import CourseReviews from "./CourseReviews";
import { Separator } from "@/components/ui/separator";

const Course = async ({ params }) => {
  return (
    <div className='flex flex-col space-y-5'>
      <CourseDetails course={params.course} />
      <CourseStats course={params.course} />
      <Separator />
      <CourseReviews course={params.course} />
    </div>
  );
};

export default Course;
