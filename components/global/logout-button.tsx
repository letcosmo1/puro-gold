'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

const LogoutButton = () => {
  const router = useRouter();

  const handleLogoutButtonClick = async () => {
    document.cookie = "token=; path=/; max-age=0";
    router.push("/");
    //TODO: add success toast
  }

  return (
    <LogOut onClick={ handleLogoutButtonClick } className="text-white stroke-[2.3px]"/>
  )
}

export default LogoutButton