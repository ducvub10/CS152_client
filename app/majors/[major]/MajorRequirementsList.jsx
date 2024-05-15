"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MajorRequirementsList = ({ major_name, r }) => {
  const [requirements, setRequirements] = useState(r);
  const [search, setSearch] = useState("");

  const filterMajorRequirement = (e) => {
    e.preventDefault();

    const filteredMajors = r.filter((requirement) =>
      requirement.name.toLowerCase().includes(search.toLowerCase())
    );
    setRequirements(filteredMajors);
  };

  return (
    <div className='space-y-10'>
      <h1>{major_name} Requirements</h1>
      <form
        className='flex w-full max-w-sm items-center space-x-2'
        onSubmit={filterMajorRequirement}
      >
        <Input
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Course name'
          value={search}
        />
        <Button type='submit'>Search</Button>
      </form>
      <div className='space-y-10'>
        {requirements.map((requirement, i) => (
          <Link
            key={i}
            href={`/courses/${requirement.department}-${requirement.course_number}`}
          >
            <p className='text-sky-400 underline'>
              {requirement.department} {requirement.course_number} -{" "}
              {requirement.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MajorRequirementsList;
