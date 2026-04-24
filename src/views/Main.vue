<script setup lang="ts">
import searchField from '@/components/searchField.vue';
import usersTable from '@/components/usersTable.vue';
</script>

<template>
    <div class="layout">
        <searchField placeholder="Поиск по ФИО..." />
        <usersTable/>
    </div>
</template>

<style lang="scss" scoped></style>
