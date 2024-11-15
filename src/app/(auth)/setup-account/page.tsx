'use client';

import React from 'react'
import AuthCard from '../_components/AuthCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import Link from 'next/dist/client/link';
import { PasswordForm } from '../_module/auth.interface';
import { useFormik } from 'formik';
import useAuthMutations from '../_module/auth.mutations';


export default function SetupAccountPage() {
  const { setupAccountMutation } = useAuthMutations()

  const { values, handleChange, handleSubmit } = useFormik<PasswordForm>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values) => {
      setupAccountMutation.mutate(values)
    }
  })

  return (
    <AuthCard title='Welcome to The Grind Academy' description='Let’s set up your account so you can start learning. Create your password to get access to your dashboard'>
      <form className='space-y-6 w-full' onSubmit={handleSubmit}>
        <Input icon='ri:lock-fill' type='password' name='password' className='w-full' placeholder='Password' value={values.password} onChange={handleChange} />
        <Input icon='ri:lock-fill' type='password' name='confirmPassword' className='w-full' placeholder='Confirm Password' value={values.confirmPassword} onChange={handleChange} />
        <Button className='w-full'>Proceed</Button>
      </form>
      <p className='text-sm text-accent text-center'>
        Already have an account? <Link className='text-primary font-semibold' href='/login'>Log In</Link>
      </p>
    </AuthCard>
  )
}
