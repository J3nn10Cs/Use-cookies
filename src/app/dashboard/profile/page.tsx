'use client'

import { useSession } from "next-auth/react";

export default function ProfilePage() {

  const { data } = useSession();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col">
        <span>{data?.user?.name ?? ''}</span>
        <span>{data?.user?.email ?? ''}</span>
        <span>{data?.user?.image ?? ''}</span>
      </div>
    </div>
  );
}