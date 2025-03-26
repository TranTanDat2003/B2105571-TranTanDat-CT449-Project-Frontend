<template>
  <div class="card shadow-sm">
    <div class="card-header bg-success text-white">
      <i class="fas fa-book me-2"></i> Chi tiết sách
    </div>
    <div class="card-body p-4">
      <div class="mb-3">
        <label class="form-label">Mã Sách</label>
        <p class="form-control-static">{{ sach.MaSach }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Tên Sách</label>
        <p class="form-control-static">{{ sach.TenSach }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Đơn Giá</label>
        <p class="form-control-static">{{ sach.DonGia }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Số Quyển</label>
        <p class="form-control-static">{{ sach.SoQuyen }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Năm Xuất Bản</label>
        <p class="form-control-static">{{ sach.NamXuatBan }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Nhà Xuất Bản</label>
        <p class="form-control-static">{{ nhaXuatBan ? nhaXuatBan.TenNXB : 'Đang tải...' }}</p>
      </div>
      <div class="mb-3">
        <label class="form-label">Nguồn Gốc Tác Giả</label>
        <p class="form-control-static">{{ sach.NguonGocTacGia }}</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-secondary" @click="$emit('close')">
          <i class="fas fa-times me-2"></i> Đóng
        </button>
        <button class="btn btn-primary" @click="muonSach" :disabled="isBorrowing">
          <i class="fas fa-book me-2"></i> {{ isBorrowing ? 'Đang xử lý...' : 'Mượn sách' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NhaXuatBanService from '@/services/nhaXuatBan.service';
import TheoDoiMuonSachService from '@/services/theoDoiMuonSach.service';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

export default {
  name: 'SachDetail',
  props: {
    sach: {
      type: Object,
      required: true,
    },
  },
  emits: ['close'],
  setup() {
    const toast = useToast();
    const router = useRouter();
    return { toast, router };
  },
  data() {
    return {
      nhaXuatBan: null,
      isBorrowing: false,
    };
  },
  methods: {
    async fetchNhaXuatBan() {
      if (!this.sach.MaNXB) {
        this.nhaXuatBan = null;
        return;
      }
      try {
        this.nhaXuatBan = await NhaXuatBanService.get(this.sach.MaNXB);
      } catch (error) {
        this.toast.error('Không thể lấy thông tin nhà xuất bản: ' + error.message);
        this.nhaXuatBan = null;
      }
    },
    async muonSach() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser || currentUser.role !== 'docgia') {
        this.toast.error('Vui lòng đăng nhập với tư cách độc giả để mượn sách!');
        this.router.push({ path: '/DocGiaLogin', query: { message: 'Vui lòng đăng nhập để mượn sách.' } });
        return;
      }

      const muonSachData = {
        MaDocGia: currentUser.id,
        MaSach: this.sach.MaSach,
        NgayMuon: new Date().toISOString().split('T')[0],
        TinhTrang: 'Chờ duyệt',
        MaNhanVien: null,
        HanTra: null,
        ChiPhi: 0,
      };

      this.isBorrowing = true;
      try {
        await TheoDoiMuonSachService.create(muonSachData);
        this.toast.success('Yêu cầu mượn sách đã được gửi thành công!');
        this.$emit('close');
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || 'Lỗi không xác định';
        this.toast.error(`Lỗi khi gửi yêu cầu mượn sách: ${errorMsg}`);
      } finally {
        this.isBorrowing = false;
      }
    },
  },
  watch: {
    'sach.MaNXB': {
      immediate: true,
      handler() {
        this.fetchNhaXuatBan();
      },
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
}

.card-header {
  border-radius: 10px 10px 0 0;
  padding: 15px;
  font-weight: 500;
}

.form-label {
  font-weight: 500;
  color: #495057;
}

.form-control-static {
  padding: 0.375rem 0.75rem;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.btn-primary {
  background-color: #28A745;
  border: none;
}

.btn-primary:hover {
  background-color: #218838;
}

.btn-secondary {
  background-color: #6C757D;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>