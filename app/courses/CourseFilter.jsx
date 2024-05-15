"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { recreateParams } from "@/utils/searchparamsclient";

const CourseFilter = ({
  departments,
  department,
  course_number,
  course_name,
  limit,
}) => {
  return (
    <div className='flex justify-between items-center'>
      <CourseFilterSearch
        departments={departments}
        department={department}
        course_number={course_number}
        course_name={course_name}
      />
      <CourseFilterLimit limit={limit} />
    </div>
  );
};

const CourseFilterSearch = ({
  departments,
  department,
  course_number,
  course_name,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState({
    department,
    course_number,
    course_name,
  });
  const changeSearch = (e) => {
    e.preventDefault();
    const oldParams = recreateParams(searchParams, [
      "page",
      "department",
      "course_number",
      "course_name",
    ]);
    router.push(
      `/courses?${oldParams}page=1&department=${search.department}&course_number=${search.course_number}&course_name=${search.course_name}`
    );
  };

  const updateSearch = (key, value) => {
    setSearch({ ...search, [key]: value });
  };

  return (
    <form
      className='flex w-full max-w-sm items-center space-x-2'
      onSubmit={changeSearch}
    >
      <CourseFilterSearchDepartment
        departments={departments}
        department={department}
        updateSearch={updateSearch}
      />
      <Input
        type='text'
        onChange={(e) => updateSearch("course_number", e.target.value)}
        placeholder='Number'
        value={search.course_number}
      />
      <Input
        type='text'
        onChange={(e) => updateSearch("course_name", e.target.value)}
        placeholder='Name'
        value={search.course_name}
      />
      <Button type='submit'>Search</Button>
    </form>
  );
};

const CourseFilterSearchDepartment = ({
  departments,
  department,
  updateSearch,
}) => {
  //   const [departments, setDepartments] = useState(departments);

  //   useEffect(() => {
  //     const getDepartments = async () => {
  //       const data = await fetch("/departments");
  //       setDepartments(data);
  //     };

  //     getDepartments();
  //   }, []);

  return (
    <Select
      defaultValue={department}
      onValueChange={(dept) => updateSearch("department", dept)}
    >
      <SelectTrigger className='w-[100px]'>
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

const CourseFilterLimit = ({ limit }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const changeLimit = (limit) => {
    const oldParams = recreateParams(searchParams, ["page", "limit"]);
    router.push(`/courses?${oldParams}page=1&limit=${limit}`);
  };
  return (
    <Select defaultValue={limit} onValueChange={changeLimit}>
      <SelectTrigger className='w-[100px]'>
        <SelectValue placeholder='Limit' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='10'>10</SelectItem>
        <SelectItem value='20'>20</SelectItem>
        <SelectItem value='50'>50</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CourseFilter;
