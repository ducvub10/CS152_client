"use client";

import fetch from "@/utils/fetchClient";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ProfileReview from "./ProfileReview";

const ProfileReviews = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const res = await fetch("/user/reviews", router, pathname, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      setReviews(res.reviews);
    };
    getReviews();
  }, []);

  const onDeleteFilter = (id) => {
    const filteredReviews = reviews.filter((review) => review.id !== id);
    setReviews(filteredReviews);
  };

  const onUpdateFilterAndUpdate = (id, updatedData, updated_at) => {
    const review = reviews.find((r) => r.id === id);
    review.review_content = updatedData.content;
    review.quality = updatedData.quality;
    review.difficulty = updatedData.difficulty;
    review.grade = updatedData.grade;
    review.take_again = updatedData.take_again;
    review.review_updated_at = updated_at;
    setReviews([...reviews]);
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Reviews</h2>
      <div className='space-y-3'>
        {reviews.length === 0 && <p className='text-center'>No Reviews</p>}
        {reviews.map((review) => (
          <ProfileReview
            key={review.id}
            review={review}
            onDeleteFilter={onDeleteFilter}
            onUpdateFilterAndUpdate={onUpdateFilterAndUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileReviews;
