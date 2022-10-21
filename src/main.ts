import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
// import {marked} from 'marked';
// const markedMixin = {
//     methods: {
//         md: function (input: string): string {
//             return marked(input);
//         },
//     },
// };
const app = createApp(App)

app.use(router)

// app.mixin(markedMixin)

app.mount('#app')
