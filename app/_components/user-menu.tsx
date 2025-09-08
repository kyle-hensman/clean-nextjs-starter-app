'use client';

import Image from 'next/image';

import { User } from '@/src/entities/models/user';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { signOut } from '../(auth)/actions';

export function UserMenu({
  user,
}: {
  user: User,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <Image
            src={user?.image || ''}
            alt="user image"
            height={100}
            width={100}
          />
          <AvatarFallback>👤</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={() => {
          signOut();
        }}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}