import axios from 'axios';
import { IPaystackBank, IPaystackResolveAccountNumberResponse } from './app.interface';
import useAxios from '@/hooks/useAxios';

export default function useAppHooks() {

  const axiosHandler = useAxios();

  const getBanks = async (): Promise<IPaystackBank[]> => {
    const response = await axiosHandler.get('https://api.paystack.co/bank')
    return response.data
  }

  const resolveAccountNumber = async (accountNumber: string, bankCode: string): Promise<IPaystackResolveAccountNumberResponse> => {
    const response = await axios.get(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`
      }
    })
    return response.data.data
  }

  return { getBanks, resolveAccountNumber }
}
