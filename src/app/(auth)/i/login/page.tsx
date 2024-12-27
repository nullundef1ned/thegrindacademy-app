'use client';

import React, { Fragment, useEffect } from 'react'
import AuthCard from '@/app/(auth)/_components/AuthCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import Link from 'next/dist/client/link';
import { LoginForm } from '@/app/(auth)/_module/auth.interface';
import { useFormik } from 'formik';
import useURL from '@/hooks/useURL';
import { URLKeyEnum } from '@/app/_module/app.enum';
import { useAppStore } from '@/app/_module/app.store';
import useAdminAuthMutations from '../_module/admin.auth.mutations';
import { anchor } from '@/app/i/_module/admin.routes';

export default function LoginPage() {
  const logout = useAppStore((state) => state.logout);

  const { searchParams, clearParams } = useURL();
  const { loginMutation } = useAdminAuthMutations();

  const logoutParam = searchParams.get(URLKeyEnum.LOGOUT);

  const { values, handleChange, handleSubmit } = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      loginMutation.mutate(values)
    }
  })

  useEffect(() => {
    if (logoutParam) {
      logout();
      clearParams();
    }
  }, [logoutParam])

  return (
    <Fragment>
      <AuthCard title="Welcome to Dexter's Lab" description="Enter your credentials to continue">
        <form className='space-y-6 w-full' onSubmit={handleSubmit}>
          <Input icon='ri:mail-fill' type='email' name='email' className='w-full' placeholder='Email' value={values.email} onChange={handleChange} />
          <Input icon='ri:lock-fill' type='password' name='password' className='w-full' placeholder='Password' value={values.password} onChange={handleChange} />
          <Button loading={loginMutation.isPending} className='w-full'>Log In</Button>
        </form>
        <Link className='text-sm text-accent font-semibold text-right' href={`/${anchor}/forgot-password`}>Forgot Password?</Link>
      </AuthCard>
      <Link href='/login' className='text-sm text-accent'>Return to civilian life</Link>
    </Fragment>
  )
}
