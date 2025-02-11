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
import useAdminAuthMutations from '../_module/affiliate.auth.mutations';
import * as yup from 'yup';

export default function LoginPage() {
  const logout = useAppStore((state) => state.logout);

  const { searchParams, clearParams } = useURL();
  const { loginMutation } = useAdminAuthMutations();

  const logoutParam = searchParams.get(URLKeyEnum.LOGOUT);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Email is required'),
      password: yup.string().required('Password is required')
    }),
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
      <AuthCard title="Affiliate Login" description="Enter your credentials to continue">
        <form className='space-y-6 w-full' onSubmit={handleSubmit}>
          <Input icon='ri:mail-fill' type='email' name='email'
            className='w-full'
            placeholder='Email'
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors} touched={touched}
          />
          <Input icon='ri:lock-fill' type='password' name='password'
            className='w-full'
            placeholder='Password'
            required
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors} touched={touched}
          />
          <Button loading={loginMutation.isPending} className='w-full'>Log In</Button>
        </form>

        <div className='flex flex-col gap-4 w-full'>
          <Link className='text-sm text-accent font-semibold text-right' href='/affiliate/forgot-password'>Forgot Password?</Link>
          <p className='text-sm text-accent text-center'>
            Want to become an affiliate? <Link className='text-primary-200 font-semibold' href='/affiliate/register'>Register here</Link>
          </p>
        </div>
      </AuthCard>
      <Link href='/login' className='text-sm text-accent'>
        Go to student dashboard
      </Link>
    </Fragment>
  )
}
