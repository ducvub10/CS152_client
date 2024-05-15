"use client";

import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import fetchData from "@/utils/fetchClient";
import { useRouter, usePathname } from "next/navigation";

const OptionsMenu = ({
  path,
  id,
  onDeleteFilter = () => {},
  onUpdateTrigger = () => {},
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const onDelete = async () => {
    await fetchData(`${path}/${id}`, router, pathname, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });

    onDeleteFilter(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onUpdateTrigger}>Update</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsMenu;
