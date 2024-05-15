import fetch from "@/utils/fetch";
import { cache } from "react";
import CourseTable from "./CourseTable";
import CourseFilter from "./CourseFilter";
import CoursePagination from "./CoursePagination";

const fetchCourses = async (
  page,
  limit,
  department,
  course_number,
  course_name
) => {
  if (!department) {
    return { data: [], pagination: null };
  }
  const data = await fetch(
    `/courses?page=${page}&limit=${limit}&department=${department}&course_number=${course_number}&course_name=${course_name}`,
    { cache: "no-store" }
  );

  return data;
};

const fetchDepartments = async (projection) => {
  const data = await fetch(`/departments?projection=${projection}`);

  return data.data;
};

const Courses = async ({ searchParams }) => {
  const data = await fetchCourses(
    searchParams.page,
    searchParams.limit,
    searchParams.department || "",
    searchParams.course_number || "",
    searchParams.course_name || ""
  );
  const departments = await fetchDepartments("abbr_dept");
  return (
    <div className='flex flex-col space-y-5'>
      <h1>Courses</h1>
      <CourseFilter
        departments={departments}
        department={searchParams.department || ""}
        course_name={searchParams.course_name || ""}
        course_number={searchParams.course_number || ""}
        limit={searchParams.limit}
      />
      {searchParams.department ? (
        <CourseTable courses={data.data} />
      ) : (
        <p className='text-center text-sm text-slate-400'>
          Choose a department
        </p>
      )}
      {data.pagination && (
        <CoursePagination
          searchParams={searchParams}
          pagination={data.pagination}
        />
      )}
    </div>
  );
};

export default Courses;
