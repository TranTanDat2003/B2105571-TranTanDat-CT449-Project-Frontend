<template>
  <div class="nhaxuatban-container">
    <div class="row mt-5">
      <!-- Danh sách nhà xuất bản -->
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <i class="fas fa-building me-2"></i> Quản lý nhà xuất bản
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
                  <i class="fas fa-plus me-2"></i> Thêm nhà xuất bản mới
                </button>
              </div>
            </div>
            <NhaXuatBanList :nha-xuat-ban="filteredNhaXuatBan" @edit="editNhaXuatBan" />
          </div>
        </div>
      </div>

      <!-- Form thêm/sửa nhà xuất bản -->
      <div class="col-md-4">
        <NhaXuatBanForm
          v-model:nhaXuatBanForm="nhaXuatBanForm"
          :is-editing="isEditing"
          @submit="handleSubmitNhaXuatBan"
          @delete="deleteNhaXuatBan"
          @reset="resetForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NhaXuatBanService from '@/services/nhaXuatBan.service';
import InputSearch from '@/components/InputSearch.vue';
import NhaXuatBanForm from '@/components/NhaXuatBanForm.vue';
import NhaXuatBanList from '@/components/NhaXuatBanList.vue';
import { useToast } from 'vue-toastification';

export default {
  components: {
    InputSearch,
    NhaXuatBanForm,
    NhaXuatBanList,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      nhaXuatBanList: [],
      searchText: '',
      nhaXuatBanForm: {
        MaNXB: '',
        TenNXB: '',
        DiaChi: '',
      },
      isEditing: false,
    };
  },
  computed: {
    nhaXuatBanStrings() {
      return this.nhaXuatBanList.map((nxb) => {
        const { MaNXB, TenNXB, DiaChi } = nxb;
        return [MaNXB, TenNXB, DiaChi].join('');
      });
    },
    filteredNhaXuatBan() {
      if (!this.searchText) return this.nhaXuatBanList;
      return this.nhaXuatBanList.filter((_nxb, index) =>
        this.nhaXuatBanStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    async fetchNhaXuatBan() {
      try {
        this.nhaXuatBanList = await NhaXuatBanService.getAll();
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà xuất bản:', error);
        this.toast.error('Không thể lấy danh sách nhà xuất bản.');
      }
    },
    refreshList() {
      this.fetchNhaXuatBan();
      this.searchText = '';
      this.resetForm();
      this.isEditing = false;
    },
    resetForm() {
      this.nhaXuatBanForm = {
        MaNXB: '',
        TenNXB: '',
        DiaChi: '',
      };
      this.isEditing = false;
    },
    showAddForm() {
      this.resetForm();
    },
    editNhaXuatBan(nxb) {
      this.nhaXuatBanForm = { ...nxb };
      this.isEditing = true;
    },
    async handleSubmitNhaXuatBan() {
      try {
        if (this.isEditing) {
          await NhaXuatBanService.update(this.nhaXuatBanForm.MaNXB, this.nhaXuatBanForm);
          this.toast.success('Sửa nhà xuất bản thành công!');
        } else {
          await NhaXuatBanService.create(this.nhaXuatBanForm);
          this.toast.success('Thêm nhà xuất bản thành công!');
        }
        this.resetForm();
        this.refreshList();
      } catch (error) {
        this.toast.error(error.message || 'Lỗi khi lưu nhà xuất bản.');
      }
    },
    async deleteNhaXuatBan(id) {
      if (confirm('Bạn có chắc chắn muốn xóa nhà xuất bản này?')) {
        try {
          await NhaXuatBanService.delete(id);
          this.toast.success('Xóa nhà xuất bản thành công!');
          this.resetForm();
          this.refreshList();
        } catch (error) {
          this.toast.error(error.message || 'Lỗi khi xóa nhà xuất bản.');
        }
      }
    },
  },
  async created() {
    await this.fetchNhaXuatBan();
  },
};
</script>

<style scoped>
.nhaxuatban-container {
  padding: 20px;
  background-color: #f8f9fa;
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