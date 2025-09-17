import { ddayApi } from '@/entities/dday'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useMutationDdayEdit = () =>
  useMutation<
    void,
    AxiosError,
    { dayId: number; title: string; startDate: string; file?: File | null }
  >({
    mutationFn: async ({ dayId, title, startDate, file }) => {
      if (file !== undefined) {
        await ddayApi.setDdayThumbnail({ dayId, file })
      }
      await ddayApi.setDdayInfo({ dayId, title, startDate })
    },
  })
