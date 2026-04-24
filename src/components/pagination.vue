<template>
    <ul class="pagination">
        <li class="pagination__item pagination__item-prev"
            :class="{ 'pagination__item--disabled': !usersStore.prevPage }">
            <button type="button" @click="changePage(usersStore.prevPage)">
                ‹
            </button>
        </li>

        <li class="pagination__item" :class="{ 'pagination__item--active': page === usersStore.curPage }"
            v-for="page in pagesWithDots">
            <button type="button" @click="changePage(page)">
                {{ page }}
            </button>
        </li>

        <li class="pagination__item pagination__item-next"
            :class="{ 'pagination__item--disabled': !usersStore.nextPage }">
            <button type="button" @click="changePage(usersStore.nextPage)">
                ›
            </button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/store/usersStore'
import { computed } from 'vue'

const usersStore = useUsersStore()

function changePage(page: string | number) {
    if (typeof page == 'number' && page !== usersStore.curPage) {
        usersStore.curPage = page;
        usersStore.loadUsers()
    }
}

const visiblePages = computed(function () {
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

const pagesWithDots = computed(function () {
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