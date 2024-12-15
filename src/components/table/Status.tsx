import React from 'react'
import { StatusType } from '@/app/_module/app.type';
import IconifyIcon from '../IconifyIcon';

type StatusProps = {
  status: StatusType;
  showIcon?: boolean;
}

export default function Status({ status, showIcon }: StatusProps) {
  const variation = {
    'inactive': 'bg-gray-700 text-gray-50',
    'suspended': 'bg-red-900 text-red-100',
    'active': 'bg-green-900 text-green-100',
    'accepted': 'bg-green-900 text-green-100',
    'pending': 'bg-yellow-900 text-yellow-100',
    'in-progress': 'bg-blue-900 text-blue-100',
    'completed': 'bg-green-900 text-green-100',
    'cancelled': 'bg-red-900 text-red-100',
    'paid': 'bg-green-900 text-green-100',
    'failed': 'bg-red-900 text-red-100',
    'refunded': 'bg-orange-900 text-orange-100',
    'available': 'bg-green-900 text-green-100',
    'unavailable': 'bg-red-900 text-red-100',
    'disabled': 'bg-grey-900 text-grey-300',
    'kyc-pending': 'bg-yellow-900 text-yellow-100',
    'rejected': 'bg-red-900 text-red-100',
  }[status]

  const displayText = status.replaceAll('-', ' ');

  return (
    <div className={`rounded py-1 px-3 flex items-center space-x-2 w-max ${variation}`}>
      <p className='text-xs font-medium capitalize'>{displayText}</p>
      {showIcon && status === 'pending' && <IconifyIcon icon="jam:refresh" width={12} />}
    </div>
  )
}
