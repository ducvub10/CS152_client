import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";

const ScheduleTable = async ({ courses }) => {
  return (
    <Table className='table-auto border-collapse'>
      <TableHeader>
        <TableRow className='text-xs text-left font-semibold'>
          <TableHead className='py-3.5'>Course</TableHead>
          <TableHead className='py-3.5'>Name</TableHead>
          <TableHead className='py-3.5'>Units</TableHead>
          <TableHead className='py-3.5'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course, index) => (
          <TableRow
            key={index}
            className='border-t text-left border-slate-200 text-xs  font-light text-slate-400'
          >
            <TableCell className='py-4'>
              {course.department} {course.course_number}
            </TableCell>
            <TableCell className='py-4'>{course.name}</TableCell>
            <TableCell className='py-4'>{course.units}</TableCell>
            <TableCell className='py-4'>
              <Link
                href={`/courses/${course.department}-${course.course_number}`}
                className='text-sky-400'
              >
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScheduleTable;
