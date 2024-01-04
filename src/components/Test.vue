<template>
    <button @click="getData">
        請按
    </button>
    <div v-if="isloading">Loading...</div>
    <ul v-else>
        <li v-for="(i) in data" :key="i">
            {{ i }}
        </li>
    </ul>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
const isloading = ref(false);
const error = ref(null);
const data = ref([]);

const getData = async () => {
    isloading.value = true;
    const fetchData = await axios.get("123");
    const response = fetchData.data;
    const responseData = response.data;
    data.value = responseData;
    isloading.value = false;
}
</script>