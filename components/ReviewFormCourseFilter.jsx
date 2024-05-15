"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Check, Minus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import fetchData from "@/utils/fetchClient";

const CourseFilter = ({
  selectedCourse,
  updateReviewData,
  departments,
  defaultCourse,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [courseSearch, setCourseSearch] = useState({
    department: "",
    course_number: "",
    name: "",
  });
  const [pageable, setPageable] = useState(false);

  const searchCourses = async () => {
    if (courseSearch.department === "") {
      return;
    }
    const res = await fetchData(
      `/courses?department=${courseSearch.department}&course_number=${courseSearch.course_number}&course_name=${courseSearch.name}`,
      router,
      pathname
    );

    setCourses(res.data);
    setPageable(
      res.pagination ? res.pagination.start !== res.pagination.end : false
    );
  };

  const removeCourse = () => {
    updateReviewData("course", null);
  };

  const updateCourseSearch = (key, val) => {
    setCourseSearch({ ...courseSearch, [key]: val });
  };

  return (
    <div className='space-y-3'>
      <h3>Professor</h3>
      <SelectedCourse
        selectedCourse={selectedCourse}
        defaultCourse={defaultCourse}
        removeCourse={removeCourse}
      />
      {!defaultCourse && (
        <div className='space-y-2'>
          <p className='text-sm text-slate-400'>Department input is required</p>
          <div className='flex space-x-3 items-center'>
            <CourseFilterDepartments
              departments={departments}
              updateCourseSearch={updateCourseSearch}
            />
            <Input
              type='text'
              placeholder='Course Number'
              value={courseSearch.course_number}
              onChange={(e) =>
                updateCourseSearch("course_number", e.target.value)
              }
            />
            <Input
              type='text'
              placeholder='Name'
              value={courseSearch.name}
              onChange={(e) => updateCourseSearch("name", e.target.value)}
            />
            <Button type='button' onClick={searchCourses}>
              Search
            </Button>
          </div>
          <CourseResults
            courses={courses}
            selectedCourse={selectedCourse}
            updateReviewData={updateReviewData}
          />
          <p className='text-sm text-slate-400'>
            {pageable && "More courses match the search."}
          </p>
        </div>
      )}
    </div>
  );
};

const SelectedCourse = ({ selectedCourse, defaultCourse, removeCourse }) => {
  return (
    <div>
      {(defaultCourse || selectedCourse) && (
        <Card className='flex space-x-3 items-center p-3'>
          {!defaultCourse && (
            <Button
              onClick={removeCourse}
              size='icon'
              variant='outline'
              type='button'
            >
              <Minus size={13} />
            </Button>
          )}
          <p className='text-sm font-semibold'>
            {defaultCourse?.department || selectedCourse.department}{" "}
            {defaultCourse?.course_number || selectedCourse.course_number}
          </p>
          <p className='text-sm'>
            {defaultCourse?.name || selectedCourse.name}
          </p>
        </Card>
      )}
    </div>
  );
};

const CourseResults = ({ courses, selectedCourse, updateReviewData }) => {
  return (
    <div>
      {courses.length ? (
        <div className='space-y-3'>
          {courses.map((course, index) => (
            <CourseFilterItem
              key={index}
              selectedDepartment={selectedCourse?.department}
              selectedCourseNumber={selectedCourse?.course_number}
              course={course}
              updateReviewData={updateReviewData}
            />
          ))}
        </div>
      ) : (
        <p className='text-sm text-slate-400'>No courses match search</p>
      )}
    </div>
  );
};

const CourseFilterDepartments = ({ departments, updateCourseSearch }) => {
  return (
    <Select onValueChange={(dept) => updateCourseSearch("department", dept)}>
      <SelectTrigger className='w-44'>
        <SelectValue placeholder='Department' />
      </SelectTrigger>
      <SelectContent>
        {departments.map(({ abbr_dept }) => (
          <SelectItem key={abbr_dept} value={abbr_dept}>
            {abbr_dept}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const CourseFilterItem = ({
  selectedDepartment,
  selectedCourseNumber,
  course,
  updateReviewData,
}) => {
  const selectCourse = () => {
    updateReviewData("course", course);
  };

  return (
    <div className='flex space-x-4 items-center'>
      {selectedDepartment && selectedCourseNumber ? (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button size='icon' variant='outline' type='button'>
              {selectedDepartment === course.department &&
              selectedCourseNumber === course.course_number ? (
                <Check size={13} />
              ) : (
                <Plus size={13} />
              )}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className='bg-slate-900 font-semibold text-sm w-40 text-white'>
            Remove chosen course first
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Button size='icon' variant='outline' type='button'>
          <Plus size={13} onClick={selectCourse} />
        </Button>
      )}
      <p className='text-sm font-semibold'>
        {course.department} {course.course_number}
      </p>
      <p className='text-sm'>{course.name}</p>
    </div>
  );
};

export default CourseFilter;
