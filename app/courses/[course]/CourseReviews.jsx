import Review from "@/components/Review";
import fetch from "@/utils/fetch";
import ReviewList from "@/components/ReviewList";

const fetchCourseReviews = async (course) => {
  const data = await fetch(`/courses/${course}/reviews?comments=True`, {
    cache: "no-store",
  });

  return data.reviews;
};

const CourseReviews = async ({ course }) => {
  // const reviews = await fetchCourseReviews(course);
  return <ReviewList fetchPath={`/courses/${course}/reviews?comments=True`} />;
};

export default CourseReviews;
