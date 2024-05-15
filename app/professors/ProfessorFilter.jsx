"use client";

import { useState } from "react";
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

const ScheduleFilter = ({ name, limit }) => {
  return (
    <div className='flex justify-between items-center'>
      <ProfessorFilterName n={name} />
      <ProfessorFilterLimit limit={limit} />
    </div>
  );
};

const ProfessorFilterName = ({ n }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState(n);
  const changeName = (e) => {
    e.preventDefault();
    const oldParams = recreateParams(searchParams, ["page", "name"]);
    router.push(`/professors?${oldParams}page=1&name=${name}`);
  };
  return (
    <form
      className='flex w-full max-w-sm items-center space-x-2'
      onSubmit={changeName}
    >
      <Input
        type='text'
        onChange={(e) => setName(e.target.value)}
        placeholder='Name'
        value={name}
      />
      <Button type='submit'>Search</Button>
    </form>
  );
};

const ProfessorFilterLimit = ({ limit }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const changeLimit = (limit) => {
    const oldParams = recreateParams(searchParams, ["limit", "page"]);
    router.push(`/professors?${oldParams}page=1&limit=${limit}`);
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

export default ScheduleFilter;
