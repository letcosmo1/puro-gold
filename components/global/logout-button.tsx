'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import LoadingOverlay from './loading-overlay';
import { LogOut } from 'lucide-react'

const LogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleLogoutButtonClick = async () => {
    document.cookie = "token=; path=/; max-age=0";
    startTransition(() => router.push("/"));
  }

  return (
    <>
      <LoadingOverlay show={ isPending } />
      <LogOut onClick={ handleLogoutButtonClick } className="text-white stroke-[2.3px]"/>
    </>
  )
}

export default LogoutButton