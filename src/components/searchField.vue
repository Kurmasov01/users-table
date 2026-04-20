<template>
    <div class="section">
        <div class="search">
            <div class="search__wrapper">
                <input class="search__input" type="text" :placeholder="placeholder"
                    @keyup.enter="onInput" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/store/usersStore'

const store = useUsersStore()

interface Props {
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Поиск...'
})

function onInput(event: Event) {
    const target = event.target as HTMLInputElement
    store.search = target.value;
    store.loadUsers()
}
</script>

<style lang="scss" scoped>
.search {
    &__wrapper {
        width: 100%;

        display: flex;
        justify-content: center;
    }

    &__input {
        width: 100%;
        max-width: 400px;

        padding: 10px 14px;

        font-size: 14px;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        outline: none;
        transition: all 0.2s ease;

        &:focus {
            border-color: #4f46e5;
            box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
        }

        &::placeholder {
            color: #9ca3af;
        }
    }
}
</style>
