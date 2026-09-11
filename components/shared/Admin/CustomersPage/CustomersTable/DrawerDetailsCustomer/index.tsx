'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { UserT } from '@/types/UserT';
import {
  Cake,
  Calendar,
  Eye,
  Hash,
  Languages,
  Mail,
  ShieldCheck,
  Trash2,
  VenusAndMars,
} from 'lucide-react';
import { FC } from 'react';

interface Props {
  user: UserT;
  handleDeleteUser: (id: string) => void;
}

const DrawerDetailsCustomer: FC<Props> = (props) => {
  const { user, handleDeleteUser } = props;

  return (
    <Drawer>
      <DrawerTrigger className="transition-colors hover:text-primary">
        <Eye />
      </DrawerTrigger>
      <DrawerContent className="w-[700px]">
        <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-4">
          {/* ID пользователя */}
          <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
            <Hash className="h-3 w-3" />
            <span>{user.id}</span>
          </div>

          {/* Шапка профиля */}
          <div className="mb-6 flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-xl">{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span>{user.email}</span>
              </div>
              <Badge variant="secondary" className="mt-2">
                <ShieldCheck className="mr-1 h-3 w-3" />
                {user.role}
              </Badge>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Детали */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border p-4">
              <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Cake className="h-3.5 w-3.5" />
                <span>Date of birth</span>
              </div>
              <p className="text-sm font-medium">
                {new Date(user.dateOfBirth).toLocaleDateString()}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                <VenusAndMars className="h-3.5 w-3.5" />
                <span>Gender</span>
              </div>
              <p className="text-sm font-medium">{user.gender}</p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Languages className="h-3.5 w-3.5" />
                <span>Language</span>
              </div>
              <p className="text-sm font-medium">{user.language}</p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Data of registration</span>
              </div>
              <p className="text-sm font-medium">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Админское действие */}
          <Button
            onClick={() => handleDeleteUser(user.id)}
            variant="destructive"
            className="w-full">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete profile
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDetailsCustomer;
