"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MajorList = ({ m }) => {
  const [majors, setMajors] = useState(m);
  const [search, setSearch] = useState("");

  const filterMajor = (e) => {
    e.preventDefault();

    const filteredMajors = m.filter((major) =>
      major.name.toLowerCase().includes(search.toLowerCase())
    );
    setMajors(filteredMajors);
  };

  return (
    <div className='space-y-10'>
      <form
        className='flex w-full max-w-sm items-center space-x-2'
        onSubmit={filterMajor}
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
        {majors.map((major, i) => (
          <Link key={i} href={`/majors/${major.name}`}>
            <p className='text-sky-400 underline'>{major.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MajorList;
