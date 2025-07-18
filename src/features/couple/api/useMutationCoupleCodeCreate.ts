import { coupleApi } from '@/entities/couple'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useMutationCoupleCodeCreate = () =>
  useMutation<string, AxiosError, { startDate: Date; coupleTitle: string }>({
    mutationFn: ({ startDate, coupleTitle }) =>
      coupleApi.createCoupleCode({ startDate, coupleTitle }),
  })
