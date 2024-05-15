import { TableBody, TableCell, TableRow } from "@/components/ui/table";
const fetchSchedules = async (page, limit) => {
  const data = await fetch(`/schedules?page=${page}&limit=${limit}`, {
    cache: "no-store",
  });
  return data.data;
};

const ScheduleTableBody = async ({ page, limit }) => {
  const schedules = await fetchSchedules(page, limit);
  return (
    <TableBody>
      {schedules.map((schedule) => (
        <TableRow
          key={schedule.class_number}
          className='border-t text-left border-slate-200 text-xs  font-light text-slate-400'
        >
          <TableCell className='py-4'>{schedule.class_number}</TableCell>
          <TableCell className='py-4'>{schedule.course}</TableCell>
          <TableCell className='py-4'>{schedule.section}</TableCell>
          <TableCell className='py-4'>{schedule.professor_name}</TableCell>
          <TableCell className='py-4'>{schedule.course_title}</TableCell>
          <TableCell className='py-4'>{schedule.days}</TableCell>
          <TableCell className='py-4'>{schedule.times}</TableCell>
          <TableCell className='py-4'>{schedule.class_type}</TableCell>
          <TableCell className='py-4'>{schedule.units}</TableCell>
          <TableCell className='py-4'>{schedule.location}</TableCell>
          <TableCell className='py-4'>{schedule.mode_of_instruction}</TableCell>
          <TableCell className='py-4'>{schedule.satisfies_area}</TableCell>
          <TableCell className='py-4'>{schedule.dates}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ScheduleTableBody;
