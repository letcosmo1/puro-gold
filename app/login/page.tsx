import React from 'react'
import Image from "next/image";
import LoginForm from '@/components/login/login-form';

const LoginPage = () => {
  return (
    <div className="relative h-dvh">
      <div className="relative z-10 h-full">
        <main className="h-full flex flex-col justify-center items-center p-8">
          <Image 
            src="/images/logo-horizontal-color.png" 
            alt="Puro Gold Logo" 
            width="250" 
            height="52"
            className="w-full mb-12"
          />
          <LoginForm />
        </main>
      </div>
      <div className="z-0 w-full h-[40vh] absolute bottom-0 bg-gradient-to-b from-white to-[#CF2395BF]"></div>
    </div>
  )
}

export default LoginPage