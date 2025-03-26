<template>
  <div class="muonsach-container">
    <div class="row mt-5">
      <!-- Danh sách sách -->
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <i class="fas fa-book me-2"></i> Mượn sách
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <InputSearch v-model="searchText" />
              </div>
            </div>
            <SachListHome
              :sach-list="filteredSachList"
              :selected-sach="selectedSach"
              @select="selectSach"
            />
          </div>
        </div>
      </div>

      <!-- Chi tiết sách -->
      <div class="col-md-4">
        <SachDetail
          v-if="selectedSach"
          :sach="selectedSach"
          :nha-xuat-ban-list="nhaXuatBanList"
          @close="selectedSach = null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SachService from '@/services/sach.service';
import NhaXuatBanService from '@/services/nhaXuatBan.service';
import InputSearch from '@/components/InputSearch.vue';
import SachListHome from '@/components/SachListHome.vue';
import SachDetail from '@/components/SachDetail.vue';
import { useToast } from 'vue-toastification';

export default {
  components: { InputSearch, SachListHome, SachDetail },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      sachList: [],
      nhaXuatBanList: [],
      searchText: '',
      selectedSach: null,
    };
  },
  computed: {
    filteredSachList() {
      if (!this.searchText) return this.sachList;
      const searchLower = this.searchText.toLowerCase();
      return this.sachList.filter(sach =>
        sach.MaSach.toLowerCase().includes(searchLower) ||
        sach.TenSach.toLowerCase().includes(searchLower)
      );
    },
  },
  methods: {
    async fetchSachList() {
      try {
        this.sachList = await SachService.getAll();
      } catch (error) {
        this.toast.error('Không thể lấy danh sách sách: ' + error.message);
      }
    },
    async fetchNhaXuatBanList() {
      try {
        this.nhaXuatBanList = await NhaXuatBanService.getAll();
      } catch (error) {
        this.toast.error('Không thể lấy danh sách nhà xuất bản: ' + error.message);
      }
    },
    selectSach(sach) {
      this.selectedSach = sach;
    },
  },
  created() {
    this.fetchSachList();
    this.fetchNhaXuatBanList();
  },
};
</script>

<style scoped>
.muonsach-container {
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
</style>