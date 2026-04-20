import { defineStore } from "pinia";
import type { User } from "@/types/User";
import { fetchUsers } from "@/services/usersService";
import { computed } from "vue";

export const useUsersStore = defineStore("usersData", {
  state: () => ({
    users: [] as User[],
    isLoading: false,
    search: "",
    sortBy: "fio",
    sortOrder: "asc",
    curPage: 1,
    firstPage: 1,
    lastPage: 0,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
    nextPage: 0,
    prevPage: 0,
  }),

  actions: {
    async loadUsers() {
      try {
        this.isLoading = true;
        let usersData = await fetchUsers({
          search: this.search,
          page: this.curPage,
          limit: this.itemsPerPage,
          sortBy: this.sortBy,
          sortOrder: this.sortOrder === "desc" ? "-" : ""
        });
        this.users = usersData.data;
        this.totalPages = usersData.pages;
        this.prevPage = usersData.prev;
        this.nextPage = usersData.next;
        this.firstPage = usersData.first;
        this.lastPage = usersData.last;
      } catch (err) {
        console.error("Ошибка при загрузке пользователей", err);
      } finally {
        this.isLoading = false;
      }
      console.log(this.isLoading);
    },
  },
});
