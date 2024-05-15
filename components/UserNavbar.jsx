"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { User, LogOut } from "lucide-react";

const UserNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      {user ? (
        <UserDropdown user={user} logout={logout} />
      ) : (
        <div className='flex space-x-5'>
          <Link href='/login'>
            <Button>Sign In</Button>
          </Link>
          <Link href='/login'>
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const UserDropdown = ({ user, logout }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='outline' className='w-40 space-x-2 p-4'>
        <Avatar className='w-7 h-7'>
          <AvatarImage src={user?.photo} alt='avatar' />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        <span>{user?.name}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56'>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href='/profile'>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={logout}>
          {/* <Button onClick={logout}> */}
          <LogOut className='mr-2 h-4 w-4' />
          <span>Logout</span>
          {/* </Button> */}
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserNavbar;
