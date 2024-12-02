import React from 'react'
import { IReferral } from './student.interface';
import { IBankDetails } from './student.interface';
import useAxios from '@/hooks/useAxios';
import { useStudentStore } from './student.store';

export default function useStudentHooks() {
  const axiosHandler = useAxios();
  const setReferral = useStudentStore((state) => state.setReferral);
  const setBankDetails = useStudentStore((state) => state.setBankDetails);

  const fetchReferral = async (): Promise<IReferral> => {
    const response = await axiosHandler.get(`/student/referral/code`)
    const referral = response.data;
    setReferral(referral);
    return referral;
  }

  const fetchBankDetails = async (): Promise<IBankDetails> => {
    const response = await axiosHandler.get(`/student/bank-detail`)
    const bankDetails = response.data;
    setBankDetails(bankDetails);
    return bankDetails;
  }

  return { fetchReferral, fetchBankDetails }
}
