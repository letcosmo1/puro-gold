import React from 'react'
import { Abhaya_Libre } from 'next/font/google';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

const abhayaLibre = Abhaya_Libre({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

const Header = () => {
  return (
    <header className="flex justify-between items-center h-[50px] bg-primary p-4">
      <h1 className={`${abhayaLibre.className} text-xl text-white tracking-[0.2em]`}>PURO GOLD</h1>
      <Link href="/">
        <LogOut className="text-white stroke-[2.3px]"/>
      </Link>
    </header>
  )
}

export default Header