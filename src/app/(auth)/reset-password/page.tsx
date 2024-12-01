'use client';

import React from 'react'
import AuthCard from '../_components/AuthCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { PasswordForm } from '../_module/auth.interface';
import { useFormik } from 'formik';
import useAuthMutations from '../_module/auth.mutations';
import LoadingIcons from 'react-loading-icons';
import { useTitle } from '@/providers/title.provider';
import Image from 'next/image';
import Link from 'next/link';
import AuthQueries from '../_module/auth.queries';


export default function ResetPasswordPage({ searchParams }: { searchParams: { token: string } }) {
  const { setTitle } = useTitle()
  const { resetPasswordMutation } = useAuthMutations()
  const { useVerifyResetPasswordTokenQuery } = AuthQueries()

  const token = searchParams.token;

  const { data: tokenData, isPending, isError } = useVerifyResetPasswordTokenQuery(token)

  const { values, handleChange, handleSubmit } = useFormik<PasswordForm>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values) => {
      resetPasswordMutation.mutate({ ...values, token })
    }
  })

  if (isPending) {
    return <div className='flex items-center justify-center h-full'>
      <LoadingIcons.TailSpin stroke="#FFF" />
    </div>
  }

  if (!token || isError || !tokenData) {
    setTitle('Invalid Token')

    return (
      <div className='flex flex-col items-center space-y-3 justify-center h-full max-w-md'>
        <Image src='/images/invite-error-state.svg' alt='Invalid Token' width={140} height={140} />
        <p className='text-center text-2xl font-semibold'>This link you used appears to be invalid</p>
        <p className='text-center text-sm text-accent'>Please verify the link or reach out to <Link
          className='underline'
          href='mailto:support@thegrindacademy.com'>support</Link> for further assistance</p>
      </div>
    )
  }

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
