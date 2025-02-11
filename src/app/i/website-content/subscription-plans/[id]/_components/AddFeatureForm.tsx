import { Input } from '@/components/ui/input';
import useSubscriptionPlanMutations from '../../_apis/subscription-plan.mutations';
import { useFormik } from 'formik';
import { ISubscriptionPlanFeatureForm } from '@/interfaces/subscription';
import { Button } from '@/components/ui/button';
import * as yup from 'yup';

export default function AddFeatureForm() {

  const { createPlanFeatureMutation } = useSubscriptionPlanMutations();

  const { values, errors, touched, handleChange, handleSubmit, resetForm } = useFormik<ISubscriptionPlanFeatureForm>({
    initialValues: {
      content: ''
    },
    validationSchema: yup.object({
      content: yup.string().required('Feature is required')
    }),
    onSubmit: (values) => {
      createPlanFeatureMutation.mutate(values);
      resetForm();
    }
  });

  return (
    <form>
      <div className="flex items-center gap-3 w-full">
        <Input
          name='content'
          required
          className='flex-1'
          value={values.content}
          onChange={handleChange}
          placeholder='Feature'
          errors={errors}
          touched={touched}
        />
        <Button type='button' loading={createPlanFeatureMutation.isPending} size='sm' variant="secondary" onClick={() => handleSubmit()}>Add Feature</Button>
      </div>
    </form>
  )
}