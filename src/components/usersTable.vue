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

    <ul class="pagination">
      <!-- <li class="pagination__item pagination__item-first" v-if="usersStore.curPage != 1">
        <button type="button" @click="changePage(usersStore.firstPage)">
          «
        </button>
      </li> -->

      <li class="pagination__item pagination__item-prev" :class="{ 'pagination__item--disabled': !usersStore.prevPage }">
        <button type="button" @click="changePage(usersStore.prevPage)">
          ‹
        </button>
      </li>

      <li class="pagination__item" :class="{ 'pagination__item--active': page === usersStore.curPage }" v-for="page in pagesWithDots">
        <button type="button" @click="changePage(page)">
          {{ page }}
        </button>
      </li>

      <li class="pagination__item pagination__item-next" :class="{ 'pagination__item--disabled': !usersStore.nextPage }">
        <button type="button" @click="changePage(usersStore.nextPage)">
          ›
        </button>
      </li>

      <!-- <li class="pagination__item pagination__item-last" v-if="usersStore.curPage != usersStore.lastPage">
        <button type="button" @click="changePage(usersStore.lastPage)">
          »
        </button>
      </li> -->
    </ul>

  </div>





</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsersStore } from '@/store/usersStore'
import { computed } from 'vue'

const usersStore = useUsersStore()

onMounted(() => {
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

function changePage(page: string | number) {
  console.log(usersStore.isLoading)
  if (typeof page == 'number' && page !== usersStore.curPage) {
    usersStore.curPage = page;
    usersStore.loadUsers()
  }
  console.log(usersStore.isLoading)


}

const visiblePages = computed(() => {
  const total = usersStore.totalPages
  const current = usersStore.curPage
  const delta = 1 // сколько страниц вокруг текущей

  const range: number[] = []

  const start = Math.max(1, current - delta)
  const end = Math.min(total, current + delta)

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  // добавляем первую и последнюю
  if (start > 1) range.unshift(1)
  if (end < total) range.push(total)

  return range
})

const pagesWithDots = computed(() => {
  const pages = visiblePages.value
  const result: (number | string)[] = []

  for (let i = 0; i < pages.length; i++) {
    const current = pages[i]
    const prev = pages[i - 1]

    if (i > 0 && current !== undefined && prev !== undefined && current - prev > 1) {
      result.push('...')
    }

    if (current !== undefined) {
      result.push(current)
    }
  }

  return result
})
</script>