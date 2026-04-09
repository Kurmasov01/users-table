import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import { fetchUsers } from '@/services/usersService'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    isLoading: false,
    search: '',
    page: 1,
    limit: 10
  }),

  actions: {
    async loadUsers() {
      try {
        this.isLoading = true
        this.users = await fetchUsers({
          search: this.search,
          page: this.page,
          limit: this.limit
        })
      } catch (err) {
        console.error('Ошибка при загрузке пользователей', err)
      } finally {
        this.isLoading = false
      }
    }
  }
})

