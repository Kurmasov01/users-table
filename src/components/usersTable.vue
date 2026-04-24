<template>
  <div class="section">
    <table class="table" v-if="!usersStore.isLoading">
      <thead class="table__head">
        <tr>
          <th scope="col" class="table__header-cell">
            ФИО
            <span class="table__sort-btn" :class="{ 'table__sort--active': usersStore.sortBy === 'fio' }"
              @click="changeSort('fio')">
              {{
                usersStore.sortBy === 'fio'
                  ? (usersStore.sortOrder === 'asc' ? '↑' : '↓')
                  : '⇅'
              }}
            </span>
          </th>
          <th scope="col" class="table__header-cell">
            Возраст
            <span class="table__sort-btn" :class="{ 'table__sort--active': usersStore.sortBy === 'age' }"
              @click="changeSort('age')">
              {{
                usersStore.sortBy === 'age'
                  ? (usersStore.sortOrder === 'asc' ? '↑' : '↓')
                  : '⇅'
              }}
            </span>
          </th>
          <th scope="col" class="table__header-cell">
            Должность
            <span class="table__sort-btn" :class="{ 'table__sort--active': usersStore.sortBy === 'position' }"
              @click="changeSort('position')">
              {{
                usersStore.sortBy === 'position'
                  ? (usersStore.sortOrder === 'asc' ? '↑' : '↓')
                  : '⇅'
              }}
            </span>
          </th>
          <th scope="col" class="table__header-cell">
            Зарплата
            <span class="table__sort-btn" :class="{ 'table__sort--active': usersStore.sortBy === 'salary' }"
              @click="changeSort('salary')">
              {{
                usersStore.sortBy === 'salary'
                  ? (usersStore.sortOrder === 'asc' ? '↑' : '↓')
                  : '⇅'
              }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr class="table__row" v-for="user in usersStore.users" :key="user.id">
          <td class="table__cell">{{ user.fio }}</td>
          <td class="table__cell">{{ user.age }}</td>
          <td class="table__cell">{{ user.position }}</td>
          <td class="table__cell">{{ user.salary }}</td>
        </tr>
      </tbody>
    </table>

    <div class="preloader" v-else>Загрузка...</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsersStore } from '@/store/usersStore'

const usersStore = useUsersStore()

onMounted(function () {
  usersStore.loadUsers();
})

function changeSort(sortColumn: string) {
  if (usersStore.sortBy === sortColumn) {
    usersStore.sortOrder = usersStore.sortOrder === 'asc' ? 'desc' : 'asc'
  }
  else {
    usersStore.sortOrder = "asc"
  }
  usersStore.sortBy = sortColumn;
  usersStore.loadUsers()
}
</script>