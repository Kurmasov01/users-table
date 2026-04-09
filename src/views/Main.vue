<script setup lang="ts">
import { watch, ref } from 'vue'
import { useUsersStore } from '@/store/usersStore'
import searchField from '@/components/searchField.vue';
import usersTable from '@/components/usersTable.vue';

const search = ref('')
const usersStore = useUsersStore()

watch(search, () => {
    usersStore.loadUsers()
})
</script>

<template>
    <div class="layout">
        <searchField v-model="search" placeholder="Поиск по ФИО..." />
        <usersTable/>
        
    </div>

</template>

<style lang="scss" scoped></style>
