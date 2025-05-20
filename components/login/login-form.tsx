'use client'

import React, { BaseSyntheticEvent, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { request } from '@/lib/api'
import { LoginData } from '@/types/api/auth'
import { DefaultApiData } from '@/types/api/api-response'

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

    const loginResult = await request<LoginData>("auth/login", {
      method: "POST",
      body: { email, password },
    });

    if (!loginResult.ok) {
      alert(loginResult.data.errorMessage || "Login failed");
      //TODO: add toast for error
      return
    }

    const tokenCookieResult = await request<DefaultApiData>("api/token", {
      method: "POST",
      body: { token: loginResult.data.token },
    }, { internalRequest: true });

    if(!tokenCookieResult.ok) {
      alert(tokenCookieResult.data.errorMessage || "Login failed");
      //TODO: add toast for error
      return
    }

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