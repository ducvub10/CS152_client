import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";

const ProfessorTable = async ({ professors }) => {
  return (
    <Table className='table-auto border-collapse'>
      <TableHeader>
        <TableRow className='text-xs text-left font-semibold'>
          <TableHead className='py-3.5'>Name</TableHead>
          <TableHead className='py-3.5'>Email</TableHead>
          <TableHead className='py-3.5'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {professors.map((professor) => (
          <TableRow
            key={professor.email}
            className='border-t text-left border-slate-200 text-xs  font-light text-slate-400'
          >
            <TableCell className='py-4'>{professor.name}</TableCell>
            <TableCell className='py-4'>{professor.email}</TableCell>
            <TableCell className='py-4'>
              <Link
                href={`/professors/${professor.id}`}
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

export default ProfessorTable;
