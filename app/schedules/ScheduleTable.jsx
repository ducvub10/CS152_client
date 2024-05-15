import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const ScheduleTable = async ({ schedules }) => {
  return (
    <Table className='table-auto border-collapse'>
      <TableHeader>
        <TableRow className='text-xs text-left font-semibold'>
          <TableHead className='py-3.5'>Class Number</TableHead>
          <TableHead className='py-3.5'>Course</TableHead>
          <TableHead className='py-3.5'>Section</TableHead>
          <TableHead className='py-3.5'>Professor</TableHead>
          <TableHead className='py-3.5'>Title</TableHead>
          <TableHead className='py-3.5'>Days</TableHead>
          <TableHead className='py-3.5'>Times</TableHead>
          <TableHead className='py-3.5'>Type</TableHead>
          <TableHead className='py-3.5'>Units</TableHead>
          <TableHead className='py-3.5'>Location</TableHead>
          <TableHead className='py-3.5'>Mode</TableHead>
          <TableHead className='py-3.5'>Area</TableHead>
          <TableHead className='py-3.5'>Dates</TableHead>
        </TableRow>
      </TableHeader>
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
            <TableCell className='py-4'>
              {schedule.mode_of_instruction}
            </TableCell>
            <TableCell className='py-4'>{schedule.satisfies_area}</TableCell>
            <TableCell className='py-4'>{schedule.dates}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScheduleTable;
