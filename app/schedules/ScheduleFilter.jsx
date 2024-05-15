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

const ScheduleFilter = ({ search, limit }) => {
  return (
    <div className='flex justify-between items-center'>
      <ScheduleFilterSearch s={search} />
      <ScheduleFilterLimit limit={limit} />
    </div>
  );
};

const ScheduleFilterSearch = ({ s }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(s);
  const changeSearch = (e) => {
    e.preventDefault();
    const oldParams = recreateParams(searchParams, ["page", "search"]);
    router.push(`/schedules?${oldParams}page=1&search=${search}`);
  };
  return (
    <form
      className='flex w-full max-w-sm items-center space-x-2'
      onSubmit={changeSearch}
    >
      <Input
        type='text'
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Course'
        value={search}
      />
      <Button type='submit'>Search</Button>
    </form>
  );
};

const ScheduleFilterLimit = ({ limit }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const changeLimit = (limit) => {
    const oldParams = recreateParams(searchParams, ["limit", "page"]);
    router.push(`/schedules?${oldParams}page=1&limit=${limit}`);
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
