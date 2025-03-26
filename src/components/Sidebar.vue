<template>
  <nav class="sidebar text-white">
    <div class="sidebar-header p-3 text-center">
      <img src="@/assets/logo.png" alt="Logo" class="logo mb-2" />
      <h4 class="mb-0">Quản lý mượn sách</h4>
    </div>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/">
          <i class="fas fa-home me-2"></i> Trang chủ
        </router-link>
      </li>
      <li v-if="canAccess('docgia')" class="nav-item">
        <router-link class="nav-link text-white" to="/docgia">
          <i class="fas fa-users me-2"></i> Độc giả
        </router-link>
      </li>
      <li v-if="canAccess('sach')" class="nav-item">
        <router-link class="nav-link text-white" to="/sach">
          <i class="fas fa-book me-2"></i> Sách
        </router-link>
      </li>
      <li v-if="canAccess('muonsach')" class="nav-item">
        <router-link class="nav-link text-white" to="/muonsach">
          <i class="fas fa-book-reader me-2"></i> Theo dõi mượn sách
        </router-link>
      </li>
      <li v-if="canAccess('muonsachuser')" class="nav-item">
        <router-link class="nav-link text-white" to="/muonsachuser">
          <i class="fas fa-book-reader me-2"></i> Mượn sách
        </router-link>
      </li>
      <li v-if="canAccess('nhaxuatban')" class="nav-item">
        <router-link class="nav-link text-white" to="/nhaxuatban">
          <i class="fas fa-building me-2"></i> Nhà xuất bản
        </router-link>
      </li>
      <li v-if="canAccess('nhanvien')" class="nav-item">
        <router-link class="nav-link text-white" to="/nhanvien">
          <i class="fas fa-user-tie me-2"></i> Nhân viên
        </router-link>
      </li>
      <li class="nav-item" v-if="!isAuthenticated">
        <router-link class="nav-link text-white" to="/NhanVienLogin">
          <i class="fas fa-sign-in-alt me-2"></i> Đăng nhập (Nhân viên)
        </router-link>
      </li>
      <li class="nav-item" v-if="!isAuthenticated">
        <router-link class="nav-link text-white" to="/DocGiaLogin">
          <i class="fas fa-sign-in-alt me-2"></i> Đăng nhập (Độc giả)
        </router-link>
      </li>
      <li class="nav-item" v-if="!isAuthenticated">
        <router-link class="nav-link text-white" to="/DocGiaSignup">
          <i class="fas fa-user-plus me-2"></i> Đăng ký (Độc giả)
        </router-link>
      </li>
      <li class="nav-item" v-if="isAuthenticated">
        <a class="nav-link text-white" href="#" @click.prevent="logout">
          <i class="fas fa-sign-out-alt me-2"></i> Đăng xuất
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isAuthenticated: { type: Boolean, required: true },
    currentUser: { type: Object, required: true },
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    canAccess(routeName) {
      if (!this.isAuthenticated) return false;
      if (this.currentUser.role === 'docgia') {
        return ['muonsachuser'].includes(routeName);
      }
      const chucVu = this.currentUser.ChucVu;
      if (chucVu === 'Quản lý') {
        return routeName !== 'muonsachuser';
      } else if (chucVu === 'Thủ thư') {
        return ['sach', 'muonsach'].includes(routeName);
      } else if (chucVu === 'Nhân viên hỗ trợ') {
        return ['muonsach'].includes(routeName);
      } else if (chucVu === 'Nhân viên kho') {
        return ['sach', 'nhaxuatban'].includes(routeName);
      }
      return false;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #28A745;
}

.sidebar-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.nav-link {
  padding: 12px 20px;
  transition: background-color 0.3s ease, padding-left 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  padding-left: 25px;
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.3);
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #fff;
}
</style>