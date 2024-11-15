'use client';

import React from 'react'
import AuthCard from '../_components/AuthCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { PasswordForm } from '../_module/auth.interface';
import { useFormik } from 'formik';
import useAuthMutations from '../_module/auth.mutations';


export default function ResetPasswordPage() {
  const { resetPasswordMutation } = useAuthMutations()

  const { values, handleChange, handleSubmit } = useFormik<PasswordForm>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values) => {
      resetPasswordMutation.mutate(values)
    }
  })

  return (
    <AuthCard title='Reset Password' description='Create your new password'>
      <form className='space-y-6 w-full' onSubmit={handleSubmit}>
        <Input icon='ri:lock-fill' type='password' name='password' className='w-full' placeholder='Password' value={values.password} onChange={handleChange} />
        <Input icon='ri:lock-fill' type='password' name='confirmPassword' className='w-full' placeholder='Confirm Password' value={values.confirmPassword} onChange={handleChange} />
        <Button className='w-full'>Reset Password</Button>
      </form>
    </AuthCard>
  )
}
