import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center px-5 py-8'>
      <div>
        <Link href='/'>
          <h1>SJSU Hub</h1>
        </Link>
      </div>
      <div className='flex space-x-10 text-sm font-semibold text-slate-400'>
        <Link href='/majors'>Majors</Link>
        <Link href='/courses?page=1&limit=10'>Courses</Link>
        <Link href='/professors?page=1&limit=10'>Professors</Link>
        <Link href='/schedules?page=1&limit=10'>Schedules</Link>
      </div>
      <UserNavbar />
    </div>
  );
};

export default Navbar;
