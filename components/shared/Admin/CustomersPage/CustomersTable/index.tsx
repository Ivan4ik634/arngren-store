'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { userService } from '@/services/User.service';
import { UserT } from '@/types/UserT';
import dayjs from 'dayjs';
import { Eye, Trash2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  users: UserT[] | undefined | null;
  idsChecked: string[];
  allChecked: boolean;
  handleCheckAll: () => void;
  setUsers: Dispatch<SetStateAction<UserT[] | undefined | null>>;
  handleCheck: (id: string) => void;
}

const CustomersTable: FC<Props> = ({
  users,
  allChecked,
  idsChecked,
  setUsers,
  handleCheckAll,
  handleCheck,
}) => {
  const handleDelete = async (id: string) => {
    await userService.deleteUser(id);
    setUsers((prev) => prev?.filter((user) => user.id !== id));
  };
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] ">
            <Checkbox checked={allChecked} onCheckedChange={handleCheckAll} />
          </TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Joined At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow>
            <TableCell className="w-[50px] ">
              <Checkbox
                checked={idsChecked.includes(user.id)}
                onCheckedChange={() => handleCheck(user.id)}
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                <Avatar size="lg">
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                  <AvatarImage src={user.avatar} />
                </Avatar>
                <div className="ml-5">
                  <h1>
                    <span className="font-bold">{user.name}</span>
                  </h1>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="opacity-50">{user.email}</p>
            </TableCell>
            <TableCell>
              <div>
                <p>{dayjs(user.created_at).format('MMM DD YYYY')} </p>
                <p className="opacity-50">{dayjs(user.created_at).format('hh:mm A')}</p>
              </div>
            </TableCell>
            <TableCell>
              <Trash2 onClick={() => handleDelete(user.id)} className="mr-2 text-red-500" />
              <Eye />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomersTable;
