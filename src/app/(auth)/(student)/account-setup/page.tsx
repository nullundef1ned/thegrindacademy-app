'use client';

import React from 'react'
import AuthCard from '../../_components/AuthCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import Link from 'next/dist/client/link';
import { PasswordForm } from '../../_module/auth.interface';
import { useFormik } from 'formik';
import LoadingIcons from 'react-loading-icons';
import Image from 'next/image';
import { useTitle } from '@/providers/title.provider';
import StudentAuthQueries from '../_module/student.auth.queries';
import useStudentAuthMutations from '../_module/student.auth.mutations';

export default function SetupAccountPage({ searchParams }: { searchParams: { token: string } }) {
  const { setTitle } = useTitle();
  const { useVerifyAccountSetupTokenQuery } = StudentAuthQueries();
  const { setupAccountMutation } = useStudentAuthMutations();

  const token = searchParams.token;

  const { data: tokenData, isPending, isError } = useVerifyAccountSetupTokenQuery(token)

  const { values, handleChange, handleSubmit } = useFormik<PasswordForm>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values) => {
      setupAccountMutation.mutate({ ...values, token })
    }
  })

  if (isPending) {
    setTitle('Loading...')

    return (
      <div className='flex items-center justify-center h-full'>
        <LoadingIcons.TailSpin stroke="#FFF" />
      </div>
    )
  }

  if (!token || isError || !tokenData) {
    setTitle('Invalid Token')

    return (
      <div className='flex flex-col items-center space-y-3 justify-center h-full max-w-md'>
        <Image src='/images/invite-error-state.svg' alt='Invalid Token' width={140} height={140} />
        <p className='text-center text-2xl font-semibold'>The invitation link you used appears to be invalid</p>
        <p className='text-center text-sm text-accent'>Please verify the link or reach out to <Link
          className='underline'
          href='mailto:support@thegrindacademy.com'>support</Link> for further assistance</p>
      </div>
    )
  }

  return (
    <AuthCard title='Welcome to The Grind Academy' description="Let's set up your account so you can start learning. Create your password to get access to your dashboard">
      <form className='space-y-6 w-full' onSubmit={handleSubmit}>
        <Input icon='ri:lock-fill' type='password' name='password' className='w-full' placeholder='Password' value={values.password} onChange={handleChange} />
        <Input icon='ri:lock-fill' type='password' name='confirmPassword' className='w-full' placeholder='Confirm Password' value={values.confirmPassword} onChange={handleChange} />
        <Button loading={setupAccountMutation.isPending} className='w-full'>Proceed</Button>
      </form>
      <p className='text-sm text-accent text-center'>
        Already have an account? <Link className='text-primary font-semibold' href='/login'>Log In</Link>
      </p>
    </AuthCard>
  )
}
