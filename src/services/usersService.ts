import { httpClient } from '@/services/httpClient'

interface FetchUsersParams {
  search: string
  page: number
  limit: number
  sortBy: string
  sortOrder: string
}

export const fetchUsers = async function (params: FetchUsersParams) {
  const queryParams = new URLSearchParams()

  queryParams.append("fio:contains", params.search)
  queryParams.append("_page", String(params.page))
  queryParams.append("_per_page", String(params.limit))
  queryParams.append("_sort", params.sortOrder + params.sortBy)

  const { data } = await httpClient.get(`/users?${queryParams.toString()}`)

  return data
}