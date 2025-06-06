import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { useFormik } from 'formik';
import { PasswordForm } from '@/app/(auth)/_module/auth.interface';
import useAdminAuthMutations from '@/app/(auth)/i/_module/admin.auth.mutations';
import ProfileSection from '@/components/ProfileSection';

export default function SecuritySection() {
  const { changePasswordMutation } = useAdminAuthMutations()

  const { values, handleChange, handleSubmit, resetForm } = useFormik<PasswordForm>({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    onSubmit: async (values) => {
      await changePasswordMutation.mutateAsync(values)
      resetForm()
    }
  })

  return (
    <ProfileSection title='Password & Security' description='Update your password and secure your account'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* <Input icon='ri:lock-password-line' type='password' placeholder='Current Password' /> */}
        <Input icon='ri:lock-password-fill' name='password' type='password' placeholder='New Password' value={values.password} onChange={handleChange} />
        <Input icon='ri:lock-password-fill' name='confirmPassword' type='password' placeholder='Confirm New Password' value={values.confirmPassword} onChange={handleChange} />
        <Button loading={changePasswordMutation.isPending} className='w-full' variant='outline'>
          Change Password
        </Button>
      </form>
    </ProfileSection>
  )
}
