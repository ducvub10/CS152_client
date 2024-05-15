import ReviewForm from "@/components/ReviewForm";
import fetch from "@/utils/fetch";

const fetchCourse = async (course) => {
  const data = await fetch(`/courses/${course}`);

  return data.course_data;
};

const CourseReviewForm = async ({ params }) => {
  const course_data = await fetchCourse(params.course);

  return (
    <div className='space-y-5'>
      <h1>Review {params.course}</h1>
      <ReviewForm defaultCourse={course_data} />
    </div>
  );
};

export default CourseReviewForm;
