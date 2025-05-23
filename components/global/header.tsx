import React from 'react'
import { Abhaya_Libre } from 'next/font/google';
import LogoutButton from './logout-button';

const abhayaLibre = Abhaya_Libre({subsets: ['latin'], weight: ['700'], display: 'swap' });

const Header = () => {
  return (
    <header className="flex justify-between items-center h-[50px] bg-primary p-4">
      <h1 className={`${abhayaLibre.className} text-xl text-white tracking-[0.2em]`}>PURO GOLD</h1>
      <LogoutButton />
    </header>
  )
}

export default Header