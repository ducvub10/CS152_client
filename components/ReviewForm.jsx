"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/auth";
import { useState, useEffect } from "react";
import ProfessorFilter from "./ReviewFormProfessorFilter";
import CourseFilter from "./ReviewFormCourseFilter";
import fetch from "@/utils/fetchClient";
import { useRouter, usePathname } from "next/navigation";

const validateDataAndReformatData = (
  { content, quality, difficulty, grade, take_again, professor, course },
  isForCourse
) => {
  if (
    content === null ||
    quality === null ||
    difficulty === null ||
    take_again === null ||
    course === null ||
    professor === null
  ) {
    return null;
  }

  if (isForCourse) {
    return {
      content,
      quality,
      difficulty,
      take_again,
      grade,
      professor_id: professor.id,
    };
  }
  return {
    content,
    quality,
    difficulty,
    take_again,
    grade,
    department: course.department,
    course_number: course.course_number,
  };
};

const ReviewForm = ({
  departments = [],
  defaultCourse = null,
  defaultProfessor = null,
}) => {
  const { user, rerouteIfNotAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [reviewData, setReviewData] = useState({
    content: null,
    quality: null,
    difficulty: null,
    grade: null,
    take_again: null,
    professor: defaultProfessor
      ? {
          id: defaultProfessor.id,
          name: defaultProfessor.name,
          email: defaultProfessor.email,
        }
      : null,
    course: defaultCourse
      ? {
          department: defaultCourse.department,
          course_number: defaultCourse.course_number,
          name: defaultCourse.name,
        }
      : null,
  });

  useEffect(() => {
    rerouteIfNotAuthenticated();
  }, [user]);

  const updateReviewData = (key, val) => {
    setReviewData({ ...reviewData, [key]: val });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = validateDataAndReformatData(
      reviewData,
      defaultCourse ? true : false
    );

    if (!data) {
      return;
    }

    const res = await fetch(
      defaultCourse
        ? `/courses/${defaultCourse.department}-${defaultCourse.course_number}/reviews`
        : `/professors/${defaultProfessor.id}/reviews`,
      router,
      pathname,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(data),
      }
    );

    router.replace(
      defaultCourse
        ? `/courses/${defaultCourse.department}-${defaultCourse.course_number}`
        : `/professors/${defaultProfessor.id}`
    );
  };

  return (
    <div className='space-y-3'>
      <Card>
        <CardHeader>
          <div className='flex justify-between'>
            <CardTitle>{user?.name}</CardTitle>
          </div>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className='space-y-8'>
            <CourseFilter
              selectedCourse={reviewData.course}
              updateReviewData={updateReviewData}
              departments={departments}
              defaultCourse={defaultCourse}
            />
            <ProfessorFilter
              selectedProfessor={reviewData.professor}
              updateReviewData={updateReviewData}
              defaultProfessor={defaultProfessor}
            />
            <StatsInput updateReviewData={updateReviewData} />
            <ContentInput updateReviewData={updateReviewData} />
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

const ContentInput = ({ updateReviewData }) => {
  return (
    <div>
      <Label className='font-semibold text-sm text-slate-500' htmlFor='content'>
        Content
      </Label>
      <Textarea
        onChange={(e) => updateReviewData("content", e.target.value || null)}
        id='content'
      />
    </div>
  );
};

const StatsInput = ({ updateReviewData }) => {
  return (
    <div className='flex space-x-10 items-center'>
      <div className='space-y-1'>
        <p className='font-semibold text-sm text-slate-500'>Quality</p>
        <Select
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

export default ReviewForm;
