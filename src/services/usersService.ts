import axios from 'axios'
import type { User } from '@/types/User'

interface FetchUsersParams {
  search?: string
  page?: number
  limit?: number
}

export const fetchUsers = async (params?: FetchUsersParams): Promise<User[]> => {
  // Превращаем параметры в query string
  const query = new URLSearchParams(params as any).toString()
  const { data } = await axios.get<User[]>(`http://localhost:3001/users?fio:contains=${params?.search}`)
  console.log(data)
  return data
}