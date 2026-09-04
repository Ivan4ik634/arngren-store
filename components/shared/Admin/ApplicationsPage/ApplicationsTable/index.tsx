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
import { ApplicationWithProductT } from '@/types/ApplicationT';
import dayjs from 'dayjs';
import { Check, Eye, X } from 'lucide-react';
import { FC } from 'react';

interface Props {
  applications: ApplicationWithProductT[];
}

const ApplicationsTable: FC<Props> = ({ applications }) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] ">
            <Checkbox />
          </TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Seller</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Submitted Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableHead className="w-[50px] ">
              <Checkbox />
            </TableHead>
            <TableCell className="font-medium flex">
              <img
                src={application.product_id.image}
                className="w-[50px] aspect-square rouded-[5px]"
              />
              <div className="ml-5">
                <h1>
                  <span className="font-bold">{application.product_id.name}</span>
                </h1>
                <p className="opacity-50">${application.product_id.price}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Avatar size="lg">
                  <AvatarFallback>{application.product_id.seller.name[0]}</AvatarFallback>
                  <AvatarImage src={application.product_id.seller.avatar} />
                </Avatar>
                <div className="ml-5">
                  <h1>
                    <span className="font-bold">{application.product_id.seller.name}</span>
                  </h1>
                  <p className="opacity-50">{application.product_id.seller.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="text-primary">{application.product_id.category}</p>
            </TableCell>
            <TableCell>
              <div>
                <p>{dayjs(application.created_at).format('MMM DD YYYY')}</p>
                <p className="opacity-50">{dayjs(application.created_at).format('hh:mm A')}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="px-4 py-2 bg-green-500/20 w-min rounded-full ">
                <p className="text-green-500">{application.status}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-start justify-start  space-x-5">
                <Eye />
                <Check className="text-green-500" />
                <X className="text-red-500" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicationsTable;
