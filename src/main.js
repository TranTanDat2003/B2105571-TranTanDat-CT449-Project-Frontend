import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'vue-toastification/dist/index.css';
import './assets/toast.css';

const app = createApp(App);

app.use(router);
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  toastDefaults: {
    success: {
      icon: 'fas fa-check-circle',
      toastClassName: 'custom-toast-success',
    },
    error: {
      icon: 'fas fa-exclamation-triangle',
      toastClassName: 'custom-toast-error',
    },
  },
});

app.mount('#app');