<script setup lang="ts">
import searchField from '@/components/searchField.vue';
import usersTable from '@/components/usersTable.vue';
import pagination from '@/components/pagination.vue';
</script>

<template>
    <div class="layout">
        <searchField placeholder="Поиск по ФИО..." />
        <usersTable/>
        <pagination/>
    </div>
</template>

<style lang="scss" scoped></style>
