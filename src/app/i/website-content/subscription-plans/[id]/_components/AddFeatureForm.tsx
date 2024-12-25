import { Input } from '@/components/ui/input';
import React from 'react'
import useSubscriptionPlanMutations from '../../_apis/subscription-plan.mutations';
import { useFormik } from 'formik';
import { ISubscriptionPlanFeatureForm } from '@/interfaces/subscription';
import { Button } from '@/components/ui/button';

export default function AddFeatureForm() {

  const { createPlanFeatureMutation } = useSubscriptionPlanMutations();

  const { values, handleChange, handleSubmit, resetForm } = useFormik<ISubscriptionPlanFeatureForm>({
    initialValues: {
      content: ''
    },
    onSubmit: (values) => {
      createPlanFeatureMutation.mutate(values);
      resetForm();
    }
  });

  return (
    <form>
      <div className="flex items-end gap-3 w-full">
        <Input
          name='content'
          required
          className='flex-1'
          value={values.content}
          onChange={handleChange}
          placeholder='Feature'
        />
        <Button type='button' loading={createPlanFeatureMutation.isPending} size='sm' variant="secondary" onClick={() => handleSubmit()}>Add Feature</Button>
      </div>
    </form>
  )
}