"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";

const FilterReviewsButton = ({ r, setShowResults }) => {
  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    let reviews = r;
    let filteredList = [];
    reviews.forEach((review) => {
      if (review.professor_name == null) {
        let course_name = review.department + " " + review.course_number;
        if (!filteredList.includes(course_name)) {
          filteredList.push(course_name);
        }
      } else {
        if (!filteredList.includes(review.professor_name)) {
          filteredList.push(review.professor_name);
        }
      }
    });
    setFilterList(filteredList);
  }, []);

  const changeFilter = (filter) => {
    let reviews = r;
    let filteredReviews = [];
    if (filter == "Show All") {
      setShowResults(reviews);
    } else {
      reviews.forEach((review) => {
        if (review.professor_name == null) {
          let course = filter.split(" ");
          if (
            review.department == course[0] &&
            review.course_number == course[1]
          ) {
            filteredReviews.push(review);
          }
        } else {
          if (review.professor_name == filter) {
            filteredReviews.push(review);
          }
        }
      });
      setShowResults(filteredReviews);
    }
  };
  return (
    <Select onValueChange={changeFilter} defaultValue='Show All'>
      <SelectTrigger className='w-[200px]'>
        <SelectValue placeholder='Show All' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={"Show All"} value={"Show All"}>
          Show All
        </SelectItem>
        {filterList.map((filter) => (
          <SelectItem key={filter} value={filter}>
            {filter}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterReviewsButton;
