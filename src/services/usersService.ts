import axios from 'axios'

interface FetchUsersParams {
  search?: string
  page?: number
  limit?: number
  sortBy: string
  sortOrder: string
}

export const fetchUsers = async (params?: FetchUsersParams) => {
  const { data } = await axios.get(`http://localhost:3001/users?fio:contains=${params?.search}&_page=${params?.page}&_per_page=10&_sort=${params?.sortOrder}${params?.sortBy}`)
  console.log(data)
  return data
}