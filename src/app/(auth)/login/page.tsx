'use client';

import React from 'react'
import AuthCard from '../_components/AuthCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import Link from 'next/dist/client/link';
import { LoginForm } from '../_module/auth.interface';
import { useFormik } from 'formik';
import useAuthMutations from '../_module/auth.mutations';
export default function LoginPage() {
  const { loginMutation } = useAuthMutations()

  const { values, handleChange, handleSubmit } = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      loginMutation.mutate(values)
    }
  })

  return (
    <AuthCard title='Log In' description='Welcome back! Enter your credentials to continue.'>
      <form className='space-y-6 w-full' onSubmit={handleSubmit}>
        <Input icon='ri:mail-fill' type='email' name='email' className='w-full' placeholder='Email' value={values.email} onChange={handleChange} />
        <Input icon='ri:lock-fill' type='password' name='password' className='w-full' placeholder='Password' value={values.password} onChange={handleChange} />
        <Button className='w-full'>Log In</Button>
      </form>
      <div className='flex flex-col gap-4 w-full'>
        <Link className='text-sm text-accent font-semibold text-right' href='/forgot-password'>Forgot Password?</Link>
        <p className='text-sm text-accent text-center'>
          Don&apos;t have an account? <Link className='text-primary font-semibold' href='https://thegrindacademy.co'>Create Account</Link>
        </p>
      </div>
    </AuthCard>
  )
}
