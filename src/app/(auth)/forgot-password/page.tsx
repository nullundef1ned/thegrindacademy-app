'use client';

import React from 'react'
import AuthCard from '../_components/AuthCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { ForgotPasswordForm } from '../_module/auth.interface';
import { useFormik } from 'formik';
import useAuthMutations from '../_module/auth.mutations';


export default function ForgotPasswordPage() {
  const { forgotPasswordMutation } = useAuthMutations()

  const { values, handleChange, handleSubmit } = useFormik<ForgotPasswordForm>({
    initialValues: {
      email: ''
    },
    onSubmit: (values) => {
      forgotPasswordMutation.mutate(values)
    }
  })

  if (forgotPasswordMutation.isSuccess) {
    return (
      <AuthCard title='Check Your Email' description='Instructions await'>
        <p className='text-sm text-center'>
          We've sent an email with instructions to <span className='font-bold'>[{values.email}]</span>. Please check your inbox and follow the instructions to reset your password.
        </p>
      </AuthCard>
    )
  }

  return (
    <AuthCard title='Forgot Password?' description="Enter your email address, and we'll send you instructions to reset your password">
      <form className='space-y-6 w-full' onSubmit={handleSubmit}>
        <Input icon='ri:mail-fill' type='email' name='email' className='w-full' placeholder='Email' value={values.email} onChange={handleChange} />
        <Button className='w-full'>Send Reset Link</Button>
      </form>
    </AuthCard>
  )
}
