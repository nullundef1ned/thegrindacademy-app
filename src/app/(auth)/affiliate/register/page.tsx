'use client';

import React, { Fragment, useEffect } from 'react'
import AuthCard from '@/app/(auth)/_components/AuthCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import Link from 'next/dist/client/link';
import { useFormik } from 'formik';
import useAffiliateAuthMutations from '../_module/affiliate.auth.mutations';
import { RegisterForm } from '../../_module/auth.interface';
import * as yup from 'yup';

export default function RegisterPage() {
  const { registerMutation } = useAffiliateAuthMutations();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik<RegisterForm>({
    initialValues: {
      firstName: '',
      lastName: '',
      telegramUsername: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      telegramUsername: yup.string().matches(/^@[a-zA-Z0-9_]+$/, 'Telegram username must start with @').required('Telegram username is required'),
      email: yup.string().email('Invalid email address').required('Email is required'),
      password: yup.string().min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
        .required('Password is required'),
      confirmPassword: yup.string().equals([yup.ref('password')], 'Passwords must match').required('Confirm password is required')
    }),
    onSubmit: (values) => {
      registerMutation.mutate(values)
    }
  })

  return (
    <Fragment>
      <AuthCard title="Affiliate Registration" description="Enter your credentials to continue">
        <form className='space-y-6 w-full' onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input icon='ri:user-fill' errors={errors} touched={touched}
              required type='text'
              name='firstName'
              className='w-full'
              placeholder='First Name'
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input icon='ri:user-fill' errors={errors} touched={touched}
              required type='text'
              name='lastName'
              className='w-full'
              placeholder='Last Name'
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <Input icon='ri:mail-fill' errors={errors} touched={touched}
            required type='email'
            name='email'
            className='w-full'
            placeholder='Email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input icon='ri:telegram-fill' required type='text' pattern='^@[a-zA-Z0-9_]+$'
            name='telegramUsername' className='w-full'
            errors={errors} touched={touched}
            placeholder='Telegram Username'
            value={values.telegramUsername}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input icon='ri:lock-fill' required type='password'
            name='password'
            className='w-full'
            errors={errors} touched={touched}
            placeholder='Password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input icon='ri:lock-fill' required type='password'
            name='confirmPassword'
            className='w-full'
            errors={errors} touched={touched}
            placeholder='Confirm Password'
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button loading={registerMutation.isPending} type='submit' className='w-full'>Register</Button>
        </form>

        <p className='text-sm text-accent text-center'>
          Already have an account? <Link className='text-primary-200 font-semibold' href='/affiliate/login'>Login here</Link>
        </p>
      </AuthCard>
      <Link href='/login' className='text-sm text-accent'>
        Student login
      </Link>
    </Fragment>
  )
}
