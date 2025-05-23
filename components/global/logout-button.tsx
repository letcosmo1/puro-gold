'use client'

import { request } from '@/lib/api';
import { DefaultApiResponse } from '@/types/api/api-response';
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

const LogoutButton = () => {
  const router = useRouter();

  const handleLogoutButtonClick = async () => {
    const logoutResult = await request<DefaultApiResponse, null>(
      "/api/token", 
      { method: "DELETE" }, 
      { internalRequest: true }
    );

    if (!logoutResult.ok) {
      alert(logoutResult.data.errorMessage || "Logout failed");
      //TODO: add toast for error
      return
    }

    router.push("/");
    //TODO: add success toast
  }

  return (
    <LogOut onClick={ handleLogoutButtonClick } className="text-white stroke-[2.3px]"/>
  )
}

export default LogoutButton