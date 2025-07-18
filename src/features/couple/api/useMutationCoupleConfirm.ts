import { coupleApi } from '@/entities/couple'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useMutationCoupleConfirm = () =>
  useMutation<void, AxiosError, string>({
    mutationFn: (code: string) => coupleApi.confirmCoupleCode(code),
  })
