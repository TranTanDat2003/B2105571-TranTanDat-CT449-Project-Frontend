<template>
  <div class="nhanvien-container">
    <div class="row mt-5">
      <!-- Danh sách nhân viên -->
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <i class="fas fa-users me-2"></i> Quản lý nhân viên
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <InputSearch v-model="searchText" />
              </div>
              <div class="col-md-6 text-end">
                <button class="btn btn-outline-success btn-sm me-2" @click="refreshList">
                  <i class="fas fa-redo me-2"></i> Làm mới
                </button>
                <button class="btn btn-success btn-sm" @click="showAddForm">
                  <i class="fas fa-plus me-2"></i> Thêm nhân viên mới
                </button>
              </div>
            </div>
            <NhanVienList :nhan-vien="filteredNhanVien" @edit="editNhanVien" />
          </div>
        </div>
      </div>

      <!-- Form thêm/sửa nhân viên -->
      <div class="col-md-4">
        <NhanVienForm
          v-model:nhanVienForm="nhanVienForm"
          :is-editing="isEditing"
          @submit="handleSubmitNhanVien"
          @delete="deleteNhanVien"
          @reset="resetForm"
          @change-password="handleChangePassword"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NhanVienService from '@/services/nhanvien.service';
import InputSearch from '@/components/InputSearch.vue';
import NhanVienForm from '@/components/NhanVienForm.vue';
import NhanVienList from '@/components/NhanVienList.vue';
import { useToast } from 'vue-toastification';

export default {
  components: { InputSearch, NhanVienForm, NhanVienList },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      nhanVienList: [],
      searchText: '',
      nhanVienForm: {
        HoTenNV: '',
        Password: '',
        ChucVu: '',
        DiaChi: '',
        SoDienThoai: '',
      },
      isEditing: false,
    };
  },
  computed: {
    nhanVienStrings() {
      return this.nhanVienList.map((nv) => {
        const { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = nv;
        return [HoTenNV, Password, ChucVu, DiaChi, SoDienThoai].join('');
      });
    },
    filteredNhanVien() {
      if (!this.searchText) return this.nhanVienList;
      return this.nhanVienList.filter((_nv, index) =>
        this.nhanVienStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    async fetchNhanVien() {
      try {
        this.nhanVienList = await NhanVienService.getAll();
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhân viên:', error);
        this.toast.error('Không thể lấy danh sách nhân viên.');
      }
    },
    refreshList() {
      this.fetchNhanVien();
      this.searchText = '';
      this.resetForm();
      this.isEditing = false;
    },
    resetForm() {
      this.nhanVienForm = {
        HoTenNV: '',
        Password: '',
        ChucVu: '',
        DiaChi: '',
        SoDienThoai: '',
      };
      this.isEditing = false;
    },
    showAddForm() {
      this.resetForm();
    },
    editNhanVien(nv) {
      this.nhanVienForm = { ...nv };
      this.isEditing = true;
    },
    async handleSubmitNhanVien() {
      try {
        if (this.isEditing) {
          await NhanVienService.update(this.nhanVienForm._id, this.nhanVienForm);
          this.toast.success('Cập nhật nhân viên thành công!');
        } else {
          await NhanVienService.create(this.nhanVienForm);
          this.toast.success('Thêm nhân viên thành công!');
        }
        this.resetForm();
        this.refreshList();
      } catch (error) {
        this.toast.error(error.message || 'Lỗi khi lưu nhân viên.');
      }
    },
    async handleChangePassword(newPassword) {
      try {
        const updatedData = { Password: newPassword };
        await NhanVienService.update(this.nhanVienForm._id, updatedData);
        this.toast.success('Đổi mật khẩu thành công!');
        this.refreshList();
      } catch (error) {
        this.toast.error(error.message || 'Lỗi khi đổi mật khẩu.');
      }
    },
    async deleteNhanVien(id) {
      if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
        try {
          await NhanVienService.delete(id);
          this.toast.success('Xóa nhân viên thành công!');
          this.resetForm();
          this.refreshList();
        } catch (error) {
          this.toast.error(error.message || 'Lỗi khi xóa nhân viên.');
        }
      }
    },
  },
  async created() {
    await this.fetchNhanVien();
  },
};
</script>

<style scoped>
.nhanvien-container {
  padding: 20px;
  background-color: #f8f9fa;
}

h1 {
  color: #28A745;
  font-weight: 600;
}

.card {
  border: none;
  border-radius: 10px;
  background-color: #fff;
}

.card-header {
  border-radius: 10px 10px 0 0;
  padding: 15px;
  font-weight: 500;
  background-color: #28A745;
}

.btn-outline-success {
  border-color: #28A745;
  color: #28A745;
}

.btn-outline-success:hover {
  background-color: #28A745;
  color: #fff;
}

.btn-success {
  background-color: #28A745;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
}

.btn-success:hover {
  background-color: #218838;
}
</style>