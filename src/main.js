import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { worker } from "./mocks/browser";
if(process.env.NODE_ENV === 'development') {
    worker.start()
}


createApp(App).use(ElementPlus).mount('#app');

