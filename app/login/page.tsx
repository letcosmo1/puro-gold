import React from 'react'
import Image from "next/image";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="relative h-screen">
      <div className="relative z-10 h-full">
        <main className="h-full flex flex-col justify-center items-center p-8">
          <Image 
            src="/images/logo-horizontal-color.png" 
            alt="Puro Gold Logo" 
            width="250" 
            height="52"
            className="w-full mb-12"
          />
          <div className="w-full">
            <Label htmlFor="customer-name" className="mb-2 text-zinc-400 font-normal">Email</Label>
            <Input />
          </div>
          <div className="w-full mt-6">
            <Label htmlFor="customer-name" className="mb-2 text-zinc-400 font-normal">Senha</Label>
            <Input />
          </div>
          <Link href="/customers" className="w-full mt-12">
            <Button className="w-full">Entrar</Button>
          </Link>
        </main>
      </div>

      <div className="z-0 w-full h-[40vh] absolute bottom-0 bg-gradient-to-b from-white to-[#CF2395BF]"></div>
    </div>
  )
}

export default LoginPage