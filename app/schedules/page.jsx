import ScheduleTable from "./ScheduleTable";
import SchedulePagination from "./SchedulePagination";
import ScheduleFilter from "./ScheduleFilter";
import fetch from "@/utils/fetch";

const fetchSchedules = async (page, limit, search) => {
  const data = await fetch(
    `/schedules?page=${page}&limit=${limit}&search=${search}`,
    {
      cache: "no-store",
    }
  );

  return data;
};

const Schedules = async ({ searchParams }) => {
  const data = await fetchSchedules(
    searchParams.page,
    searchParams.limit,
    searchParams.search || ""
  );
  return (
    <div className='flex flex-col space-y-5'>
      <h1>Schedules</h1>
      <ScheduleFilter
        search={searchParams.search || ""}
        limit={searchParams.limit}
      />
      <ScheduleTable schedules={data.data} />
      {data.pagination && (
        <SchedulePagination
          searchParams={searchParams}
          pagination={data.pagination}
        />
      )}
    </div>
  );
};

export default Schedules;
