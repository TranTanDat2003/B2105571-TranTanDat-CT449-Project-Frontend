<template>
  <div class="sach-container">
    <div class="row mt-5">
      <!-- Danh sách sách -->
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <i class="fas fa-book me-2"></i> Quản lý sách
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
                <button
                  class="btn btn-success btn-sm"
                  @click="showAddForm"
                  :disabled="nhaXuatBanList.length === 0"
                >
                  <i class="fas fa-plus me-2"></i> Thêm sách mới
                </button>
              </div>
            </div>
            <SachList :sach-list="filteredSach" @edit="editSach" />
          </div>
        </div>
      </div>

      <!-- Form thêm/sửa sách -->
      <div class="col-md-4">
        <SachForm
          v-if="isDataLoaded"
          v-model:sachForm="sachForm"
          :is-editing="isEditing"
          :nha-xuat-ban-list="nhaXuatBanList"
          @submit="handleSubmitSach"
          @delete="deleteSach"
          @reset="resetForm"
        />
        <div v-else class="text-center p-4">
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SachService from '@/services/sach.service';
import NhaXuatBanService from '@/services/nhaXuatBan.service';
import InputSearch from '@/components/InputSearch.vue';
import SachForm from '@/components/SachForm.vue';
import SachList from '@/components/SachList.vue';
import { useToast } from 'vue-toastification';

export default {
  components: { InputSearch, SachForm, SachList },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      sachList: [],
      nhaXuatBanList: [],
      searchText: '',
      sachForm: {
        MaSach: '',
        TenSach: '',
        DonGia: 0,
        SoQuyen: 0,
        NamXuatBan: 0,
        MaNXB: '',
        NguonGocTacGia: '',
      },
      isEditing: false,
      isDataLoaded: false,
    };
  },
  computed: {
    sachStrings() {
      return this.sachList.map((sach) => {
        const { MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, NguonGocTacGia } = sach;
        return [MaSach, TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, NguonGocTacGia].join('');
      });
    },
    filteredSach() {
      if (!this.searchText) return this.sachList;
      return this.sachList.filter((_sach, index) =>
        this.sachStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    async fetchSach() {
      try {
        this.sachList = await SachService.getAll();
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sách:', error);
        this.toast.error('Không thể lấy danh sách sách.');
      }
    },
    async fetchNhaXuatBan() {
      try {
        this.nhaXuatBanList = await NhaXuatBanService.getAll();
        if (this.nhaXuatBanList.length === 0) {
          this.toast.warning('Không có nhà xuất bản nào. Vui lòng thêm trước.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà xuất bản:', error);
        this.toast.error('Không thể lấy danh sách nhà xuất bản.');
      }
    },
    refreshList() {
      this.isDataLoaded = false;
      Promise.all([this.fetchSach(), this.fetchNhaXuatBan()]).finally(() => {
        this.isDataLoaded = true;
      });
      this.searchText = '';
      this.resetForm();
      this.isEditing = false;
    },
    resetForm() {
      this.sachForm = {
        MaSach: '',
        TenSach: '',
        DonGia: 0,
        SoQuyen: 0,
        NamXuatBan: 0,
        MaNXB: this.nhaXuatBanList.length > 0 ? this.nhaXuatBanList[0].MaNXB : '',
        NguonGocTacGia: '',
      };
      this.isEditing = false;
    },
    showAddForm() {
      if (this.nhaXuatBanList.length === 0) {
        this.toast.warning('Không có nhà xuất bản nào. Vui lòng thêm trước.');
        return;
      }
      this.resetForm();
    },
    editSach(sach) {
      this.sachForm = { ...sach };
      this.isEditing = true;
    },
    async handleSubmitSach() {
      try {
        if (this.nhaXuatBanList.length === 0) {
          this.toast.warning('Không có nhà xuất bản nào. Vui lòng thêm trước.');
          return;
        }
        if (this.isEditing) {
          await SachService.update(this.sachForm.MaSach, this.sachForm);
          this.toast.success('Cập nhật sách thành công!');
        } else {
          await SachService.create(this.sachForm);
          this.toast.success('Thêm sách thành công!');
        }
        this.resetForm();
        this.refreshList();
      } catch (error) {
        this.toast.error(error.message || 'Lỗi khi lưu sách.');
      }
    },
    async deleteSach(id) {
      if (confirm('Bạn có chắc chắn muốn xóa sách này?')) {
        try {
          await SachService.delete(id);
          this.toast.success('Xóa sách thành công!');
          this.resetForm();
          this.refreshList();
        } catch (error) {
          this.toast.error(error.message || 'Lỗi khi xóa sách.');
        }
      }
    },
  },
  async created() {
    await Promise.all([this.fetchSach(), this.fetchNhaXuatBan()]);
    this.isDataLoaded = true;
  },
};
</script>

<style scoped>
.sach-container {
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