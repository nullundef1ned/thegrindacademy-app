'use client';

import AccountInformationSection from './_components/AccountInformationSection'
import BankSection from './_components/BankSection';
import DeleteAccountSection from './_components/DeleteAccountSection';
import SecuritySection from './_components/SecuritySection';

export default function SettingsPage() {

  return (
    <div className='w-full responsive-section space-y-6'>
      <AccountInformationSection />
      <SecuritySection />
      {/* <BankSection /> */}
      <DeleteAccountSection />
    </div>
  )
}
