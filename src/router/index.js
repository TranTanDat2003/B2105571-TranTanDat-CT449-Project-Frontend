import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import DocGia from "@/views/DocGia.vue";
import Sach from "@/views/Sach.vue";
import QuanLyMuonSach from "@/views/TheoDoiMuonSach.vue";
import MuonSach from "@/views/MuonSach.vue";
import NhaXuatBan from "@/views/NhaXuatBan.vue";
import NhanVien from "@/views/NhanVien.vue";
import NotFound from "@/views/NotFound.vue";
import NhanVienLogin from "@/views/NhanVienLogin.vue";
import DocGiaLogin from "@/views/DocGiaLogin.vue";
import DocGiaSignup from "@/views/DocGiaSignup.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/NhanVienLogin',
    name: 'NhanVienLogin',
    component: NhanVienLogin,
  },
  {
    path: '/DocGiaLogin',
    name: 'DocGiaLogin',
    component: DocGiaLogin,
  },
  {
    path: '/DocGiaSignup',
    name: 'DocGiaSignup',
    component: DocGiaSignup,
  },
  {
    path: '/docgia',
    name: 'DocGia',
    component: DocGia,
    meta: { requiresAuth: true },
  },
  {
    path: '/sach',
    name: 'Sach',
    component: Sach,
    meta: { requiresAuth: true },
  },
  {
    path: '/muonsachuser',
    name: 'MuonSachUser',
    component: MuonSach,
    meta: { requiresAuth: true },
  },
  {
    path: '/muonsach',
    name: 'MuonSach',
    component: QuanLyMuonSach,
    meta: { requiresAuth: true },
  },
  {
    path: '/nhaxuatban',
    name: 'NhaXuatBan',
    component: NhaXuatBan,
    meta: { requiresAuth: true },
  },
  {
    path: '/nhanvien',
    name: 'NhanVien',
    component: NhanVien,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

// Tạo router trước khi sử dụng router.beforeEach
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard (bảo vệ route và phân quyền)
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Nếu đã đăng nhập và truy cập /NhanVienLogin, /DocGiaLogin hoặc /DocGiaSignup, chuyển hướng về trang chủ
  if (isAuthenticated && (to.path === '/NhanVienLogin' || to.path === '/DocGiaLogin' || to.path === '/DocGiaSignup')) {
    next({ path: '/', query: { message: 'Bạn đã đăng nhập. Vui lòng đăng xuất để truy cập trang đăng nhập hoặc đăng ký.' } });
    return;
  }

  if (to.meta?.requiresAuth) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!isAuthenticated) {
      const redirectPath = currentUser?.role === 'docgia' ? '/DocGiaLogin' : '/NhanVienLogin';
      next({ path: redirectPath, query: { message: 'Vui lòng đăng nhập để truy cập.' } });
      return;
    }

    // Nếu không có thông tin người dùng (currentUser), chuyển hướng đến đăng nhập
    if (!currentUser) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      const redirectPath = currentUser?.role === 'docgia' ? '/DocGiaLogin' : '/NhanVienLogin';
      next({ path: redirectPath, query: { message: 'Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.' } });
      return;
    }

    // Phân quyền dựa trên role và ChucVu
    if (currentUser.role === 'docgia') {
      // Độc giả chỉ được truy cập các trang / và /muonsach
      if ([ '/' ,'/muonsachuser'].includes(to.path)) {
        next();
      } else {
        next({ path: '/', query: { message: 'Bạn không có quyền truy cập trang này.' } });
      }
    } else if (currentUser.role === 'nhanvien') {
      const chucVu = currentUser.ChucVu;

      if (!chucVu) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        next({ path: '/NhanVienLogin', query: { message: 'Chức vụ không hợp lệ. Vui lòng đăng nhập lại.' } });
        return;
      }

      // Phân quyền cho nhân viên
      if (chucVu === 'Quản lý') {
        next();
      } else if (chucVu === 'Thủ thư') {
        if (['/', '/sach', '/muonsach'].includes(to.path)) {
          next();
        } else {
          next({ path: '/', query: { message: 'Bạn không có quyền truy cập trang này.' } });
        }
      } else if (chucVu === 'Nhân viên hỗ trợ') {
        if (['/', '/muonsach'].includes(to.path)) {
          next();
        } else {
          next({ path: '/', query: { message: 'Bạn không có quyền truy cập trang này.' } });
        }
      } else if (chucVu === 'Nhân viên kho') {
        if (['/', '/sach', '/nhaxuatban'].includes(to.path)) {
          next();
        } else {
          next({ path: '/', query: { message: 'Bạn không có quyền truy cập trang này.' } });
        }
      } else {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        next({ path: '/NhanVienLogin', query: { message: 'Chức vụ không hợp lệ. Vui lòng đăng nhập lại.' } });
      }
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      const redirectPath = currentUser?.role === 'docgia' ? '/DocGiaLogin' : '/NhanVienLogin';
      next({ path: redirectPath, query: { message: 'Vai trò không hợp lệ. Vui lòng đăng nhập lại.' } });
    }
  } else {
    next();
  }
});

export default router;