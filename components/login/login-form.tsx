'use client'

import React, { BaseSyntheticEvent, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { request } from '@/lib/api'
import { LoginData, LoginResponse } from '@/types/api/auth'
import { toast, ToastContainer } from 'react-toastify'
import { ApiErrorResponse } from '@/types/api/api-response'

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
    e.preventDefault();

    if(!email || !password) {
      toast.warning("Dados inválidos.");
      return
    }

    setEmail("");
    setPassword("");

    const result = request<LoginResponse | ApiErrorResponse, LoginData>("auth/login", {
      method: "POST",
      body: { email, password },
    }).then(result => {
      if(!result.data.success) {
        if(result.status == 404) {
          toast.error("Credenciais inválidas.");
          return  
        }
        toast.error(result.data.errorMessage);
        return
      }
      document.cookie = `token=${result.data.token}; path=/; max-age=7200; SameSite=Lax`;
      toast.success("Login realizado com sucesso.");
      router.push("/customers");
    });

  };

  return (
    <>
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

      <ToastContainer autoClose={ 2000 } />
    </>
  )
}

export default LoginForm