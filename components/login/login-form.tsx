'use client'

import React, { BaseSyntheticEvent, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { request } from '@/lib/api'
import { LoginBody, LoginResponse } from '@/types/api/auth'

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailInputChange = (e: BaseSyntheticEvent) => {
    setEmail(e.target.value);
  }

  const handlePasswordInputChange = (e: BaseSyntheticEvent) => {
    setPassword(e.target.value);
  }

  const handleLoginButtonSubmit = async (e: React.FormEvent) => {
    //TODO: check if email and password are valid
    e.preventDefault();

    setEmail("");
    setPassword("");

    const result = await request<LoginResponse, LoginBody>("auth/login", {
      method: "POST",
      body: { email, password },
    });

    if (!result.ok) {
      alert(result.data.errorMessage || "Login failed");
      //TODO: add toast for error
      return
    }

    document.cookie = `token=${result.data.token}; path=/; max-age=7200; SameSite=Lax`;

    router.push("/customers");
    //TODO: add success toast
  };

  return (
    <form className="w-full">
      <div className="w-full">
        <Label htmlFor="email" className="mb-2 text-zinc-400 font-normal">Email</Label>
        <Input 
          id="email"
          onChange={ handleEmailInputChange }
          value={ email }
        />
      </div>
      <div className="w-full mt-6">
        <Label htmlFor="password" className="mb-2 text-zinc-400 font-normal">Senha</Label>
        <Input 
          id="password" 
          type="password"
          onChange={ handlePasswordInputChange }
          value={ password }
        />
      </div>
      <Button 
        type="submit" 
        className="w-full mt-12" 
        onClick={ handleLoginButtonSubmit }
      >
        Entrar
      </Button>
    </form>
  )
}

export default LoginForm