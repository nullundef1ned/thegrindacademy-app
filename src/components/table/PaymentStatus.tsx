import React from 'react'
import { StatusType } from '@/app/_module/app.type';
import Status from './Status';
import clsx from 'clsx';

type PaymentStatusProps = {
  status: StatusType;
  paymentURL?: string | null;
}

export default function PaymentStatus({ status, paymentURL }: PaymentStatusProps) {

  const handlePayment = () => {
    if (paymentURL) {
      window.open(paymentURL, '_blank');
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <Status status={status} />
      {paymentURL &&
        <p className='text-xs hover:underline cursor-pointer' onClick={handlePayment}>Make Payment</p>
      }
    </div>
  )
}
