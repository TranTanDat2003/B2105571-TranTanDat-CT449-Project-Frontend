<template>
  <div id="app" class="d-flex">
    <Sidebar
      :is-authenticated="isAuthenticated"
      :current-user="currentUser"
      @logout="logout"
    />
    <div class="content flex-grow-1">
      <router-view @update-auth="updateAuthState" />
    </div>
  </div>
</template>

<script>
// Giữ nguyên logic từ file gốc
import { useToast } from 'vue-toastification';
import { ref } from 'vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'App',
  components: { Sidebar },
  setup() {
    const toast = useToast();
    const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
    const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || {});
    return { toast, isAuthenticated, currentUser };
  },
  methods: {
    updateAuthState({ isAuthenticated, currentUser }) {
      this.isAuthenticated = isAuthenticated;
      this.currentUser = currentUser;
    },
    logout() {
      const role = this.currentUser?.role || 'nhanvien';
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
      this.isAuthenticated = false;
      this.currentUser = {};
      const redirectPath = role === 'docgia' ? '/DocGiaLogin' : '/NhanVienLogin';
      this.$router.push(redirectPath);
    },
  },
  watch: {
    '$route.query.message'(newMessage) {
      if (newMessage) this.toast.error(newMessage);
    },
  },
};
</script>

<style scoped>
#app {
  min-height: 100vh;
  background-color: #f1f5f9;
}

.content {
  margin-left: 200px;
  padding: 20px;
}
</style>