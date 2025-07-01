'use client';

import Breadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs"
import { adminRoutes } from "../../_module/admin.routes"
import { useFormik } from "formik";
import { IUserForm } from "@/interfaces/user";
import notificationUtil from "@/utils/notification.util";
import { useRouter } from "next/navigation";
import useAdminMutations from "../../_module/admin.mutations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFetchSubscriptionPlans } from "../../website-content/subscription-plans/_apis/useFetchSubscriptionPlans";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetchCourses } from "../../_module/_apis/useFetchCourses";
import { Switch } from "@/components/ui/switch";

export default function NewUserPage() {

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Users', link: adminRoutes.users },
    { name: 'New User' },
  ]

  const router = useRouter();
  const { registerUserMutation } = useAdminMutations();

  const { data: courses } = useFetchCourses();
  const { data: subscriptionPlans } = useFetchSubscriptionPlans();
  const { fetchUserSubscriptionPlansMutation, updateUserStatusMutation, updateUserSubscriptionPlanMutation } = useAdminMutations();

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik<IUserForm & { startDate: string }>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      telegramUserName: '',
      autoRenewal: false,
      referralCode: '',
      courseSlug: '',
      subscriptionPlanId: '',
      startDate: new Date().toISOString().split('T')[0],
    },
    onSubmit: async (values) => {
      const { startDate, ...payload } = values;
      const user = await registerUserMutation.mutateAsync(payload);
      await updateUserStatusMutation.mutateAsync({ id: user.id, status: 'active' });
      const plans = await fetchUserSubscriptionPlansMutation.mutateAsync(user.id);
      const plan = plans.result[0];
      await updateUserSubscriptionPlanMutation.mutateAsync({
        userId: user.id,
        subscriptionPlanId: plan.subscriptionPlanId,
        startDate: startDate,
        status: 'active',
        subscriptionId: plan.id,
      }, {
        onSuccess: () => {
          notificationUtil.success('Student created successfully');
          router.push(adminRoutes.users);
        }
      });
    }
  });

  const isFormValid = values.firstName && values.lastName && values.email && values.subscriptionPlanId;

  return (
    <div className='w-full responsive-section !max-w-screen-md space-y-8 pb-10'>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex items-center justify-between">
        <div className='flex flex-col gap-1'>
          <p className='text-lg font-medium'>New User</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className="grid grid-cols-2 gap-4">
          <Input
            name='firstName'
            title='First Name'
            required
            value={values.firstName}
            onChange={handleChange}
            placeholder='Name'
          />
          <Input
            name='lastName'
            title='Last Name'
            required
            value={values.lastName}
            onChange={handleChange}
            placeholder='Last Name'
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            name='email'
            title='Email'
            type='email'
            required
            value={values.email}
            onChange={handleChange}
            placeholder='Email'
          />
          <div className="flex flex-col gap-2">
            <Input
              name='telegramUserName'
              title='Telegram Username'
              pattern='^@[a-zA-Z0-9_]+$'
              value={values.telegramUserName}
              onChange={handleChange}
              placeholder='Telegram Username'
            />

            <p className='text-xs text-accent'>Enter telegram username beginning with the @</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-accent">Subscription Plan</p>
            <Select
              name='subscriptionPlanId'
              required
              value={values.subscriptionPlanId}
              onValueChange={(value) => setFieldValue('subscriptionPlanId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Subscription Plan' />
              </SelectTrigger>
              <SelectContent>
                {subscriptionPlans?.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            name='startDate'
            title='Start Date'
            type='date'
            min={new Date().toISOString().split('T')[0]}
            value={values.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            name='referralCode'
            title='Referral Code'
            value={values.referralCode}
            onChange={handleChange}
            placeholder='Referral Code'
          />

          <div className="flex flex-col gap-2">
            <p className="text-xs text-accent">Course</p>
            <Select
              name='courseSlug'
              value={values.courseSlug}
              onValueChange={(value) => setFieldValue('courseSlug', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select Course' />
              </SelectTrigger>
              <SelectContent>
                {courses?.result?.map((course) => (
                  <SelectItem key={course.id} value={course.slug}>{course.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            name='autoRenewal'
            checked={values.autoRenewal}
            onCheckedChange={(checked) => setFieldValue('autoRenewal', checked)}
          />
          <p className="text-sm text-accent">Auto renew the subscription plan after the duration</p>
        </div>

        <Button
          loading={registerUserMutation.isPending}
          type='submit'
          disabled={registerUserMutation.isPending || !isFormValid}
          className='w-full col-span-2'>
          Register Student
        </Button>
      </form>
    </div>
  )
}
