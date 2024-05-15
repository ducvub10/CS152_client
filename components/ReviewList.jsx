"use client";
import Review from "./Review";
import WriteReviewButton from "./WriteReviewButton";
import FilterReviewsButton from "./FilterReviewsButton";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import fetch from "@/utils/fetchClient";

const ReviewList = ({ fetchPath }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showResults, setShowResults] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      const res = await fetch(fetchPath, router, pathname, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      setAllReviews(res.reviews);
      setShowResults(res.reviews);
      setLoading(false);
    };
    getReviews();
  }, []);

  return (
    <div className='flex flex-col space-y-5'>
      <div className='flex justify-between items-center'>
        <h3 className='text-2xl font-semibold'>Reviews</h3>
        {!loading && (
          <FilterReviewsButton r={allReviews} setShowResults={setShowResults} />
        )}

        <WriteReviewButton />
      </div>
      {loading ? (
        <p className='text-sm text-slate-400 text-center'>Loading...</p>
      ) : showResults.length ? (
        <div className='flex flex-col space-y-5'>
          {showResults.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className='text-sm text-slate-400 text-center'>No Reviews</p>
      )}
    </div>
  );
};

export default ReviewList;
