import { defineStore } from 'pinia'
import type { User } from '@/types/User'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    loading: false
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      const res = await fetch('http://localhost:3001/users')
      this.users = await res.json()
      this.loading = false
    }
  }
})

