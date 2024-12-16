'use client';

import AccountInformationSection from './_components/AccountInformationSection'
import BankSection from './_components/BankSection';
import DeleteAccountSection from './_components/DeleteAccountSection';
import SecuritySection from './_components/SecuritySection';
import SubscriptionSection from './_components/SubscriptionSection';

export default function ProfilePage() {

  return (
    <div className='w-full responsive-section space-y-6'>
      <AccountInformationSection />
      <SubscriptionSection />
      <SecuritySection />
      <BankSection />
      <DeleteAccountSection />
    </div>
  )
}
