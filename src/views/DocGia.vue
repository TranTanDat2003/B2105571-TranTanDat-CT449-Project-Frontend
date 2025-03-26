<template>
  <div class="docgia-container">
    <div class="row mt-5">
      <!-- Danh sách độc giả -->
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <i class="fas fa-users me-2"></i> Quản lý độc giả
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
              </div>
            </div>
            <DocGiaList :doc-gia="filteredDocGia" @view="viewDocGia" />
          </div>
        </div>
      </div>

      <!-- Chi tiết độc giả -->
      <div class="col-md-4">
        <DocGiaDetail
          v-if="selectedDocGia"
          :docGia="selectedDocGia"
          @close="closeDetail"
          @delete="deleteDocGia"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DocGiaService from '@/services/docGia.service';
import InputSearch from '@/components/InputSearch.vue';
import DocGiaList from '@/components/DocGiaList.vue';
import DocGiaDetail from '@/components/DocGiaDetail.vue';
import { useToast } from 'vue-toastification';

export default {
  components: { InputSearch, DocGiaList, DocGiaDetail },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      docGiaList: [],
      searchText: '',
      selectedDocGia: null,
    };
  },
  computed: {
    docGiaStrings() {
      return this.docGiaList.map((dg) => {
        const { HoLot, Ten, NgaySinh, Phai, DiaChi, SoDienThoai } = dg;
        return [HoLot, Ten, NgaySinh, Phai, DiaChi, SoDienThoai].join('');
      });
    },
    filteredDocGia() {
      if (!this.searchText) return this.docGiaList;
      return this.docGiaList.filter((_dg, index) =>
        this.docGiaStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    async fetchDocGia() {
      try {
        this.docGiaList = await DocGiaService.getAll();
      } catch (error) {
        console.error('Lỗi khi lấy danh sách độc giả:', error);
        this.toast.error('Không thể lấy danh sách độc giả.');
      }
    },
    refreshList() {
      this.fetchDocGia();
      this.searchText = '';
      this.selectedDocGia = null;
    },
    viewDocGia(dg) {
      this.selectedDocGia = { ...dg };
    },
    closeDetail() {
      this.selectedDocGia = null;
    },
    async deleteDocGia(id) {
      if (confirm('Bạn có chắc chắn muốn xóa độc giả này?')) {
        try {
          await DocGiaService.delete(id);
          this.toast.success('Xóa độc giả thành công!');
          this.selectedDocGia = null;
          this.refreshList();
        } catch (error) {
          this.toast.error(error.message || 'Lỗi khi xóa độc giả.');
        }
      }
    },
  },
  async created() {
    await this.fetchDocGia();
  },
};
</script>

<style scoped>
.docgia-container {
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
</style>