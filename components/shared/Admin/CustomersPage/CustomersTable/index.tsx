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
import { UserT } from '@/types/UserT';
import dayjs from 'dayjs';
import { EllipsisVertical } from 'lucide-react';
import { FC } from 'react';

interface Props {
  users: UserT[] | undefined | null;
}

const CustomersTable: FC<Props> = ({ users }) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] ">
            <Checkbox />
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
              <Checkbox />
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
              <EllipsisVertical />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomersTable;
