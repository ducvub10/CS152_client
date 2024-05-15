import Review from "@/components/Review";
import ReviewList from "@/components/ReviewList";
import fetch from "@/utils/fetch";

const fetchProfessorReviews = async (professor_id) => {
  const data = await fetch(
    `/professors/${professor_id}/reviews?comments=True`,
    {
      cache: "no-store",
    }
  );

  return data.reviews;
};

const ProfessorReviews = async ({ professor_id }) => {
  // const reviews = await fetchProfessorReviews(professor_id);
  return (
    <ReviewList
      fetchPath={`/professors/${professor_id}/reviews?comments=True`}
    />
  );
};

export default ProfessorReviews;
