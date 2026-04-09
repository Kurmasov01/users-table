<template>
    <table v-if="!usersStore.isLoading">
        <tr v-for="user in usersStore.users" :key="user.id">
            <td>{{ user.fio }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.position }}</td>
            <td>{{ user.salary }}</td>
        </tr>
    </table>

    <div v-else>Загрузка...</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsersStore } from '@/store/usersStore'

const usersStore = useUsersStore()

onMounted(()=>{
    usersStore.loadUsers();
})
</script>