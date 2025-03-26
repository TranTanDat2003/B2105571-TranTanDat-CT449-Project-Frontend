<template>
  <div class="theodoimuonsach-container">
    <div class="row mt-5">
      <!-- Danh sách yêu cầu mượn sách -->
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <i class="fas fa-book-reader me-2"></i> Quản lý theo dõi mượn sách
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <InputSearch v-model="searchText" />
              </div>
              <div class="col-md-6 text-end">
                <button class="btn btn-outline-success btn-sm" @click="refreshList">
                  <i class="fas fa-redo me-2"></i> Làm mới
                </button>
              </div>
            </div>
            <TheoDoiMuonSachList :theo-doi-muon-sach="filteredTheoDoiMuonSach" @edit="editTheoDoiMuonSach" />
          </div>
        </div>
      </div>

      <!-- Form hiển thị chi tiết yêu cầu mượn sách -->
      <div class="col-md-4">
        <TheoDoiMuonSachForm
          v-model:theoDoiMuonSachForm="theoDoiMuonSachForm"
          :current-user="currentUser"
          @approve="approveRequest"
          @return="returnBook"
          @delete="deleteTheoDoiMuonSach"
          @close="resetForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TheoDoiMuonSachService from '@/services/theoDoiMuonSach.service';
import SachService from '@/services/sach.service';
import InputSearch from '@/components/InputSearch.vue';
import TheoDoiMuonSachForm from '@/components/TheoDoiMuonSachForm.vue';
import TheoDoiMuonSachList from '@/components/TheoDoiMuonSachList.vue';
import { useToast } from 'vue-toastification';

export default {
  components: { InputSearch, TheoDoiMuonSachForm, TheoDoiMuonSachList },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      theoDoiMuonSachList: [],
      searchText: '',
      theoDoiMuonSachForm: {
        MaDocGia: '',
        MaSach: '',
        NgayMuon: '',
        NgayTra: '',
        HanTra: '',
        MaNhanVien: '',
        ChiPhi: 0,
        TinhTrang: '',
      },
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
    };
  },
  computed: {
    theoDoiMuonSachStrings() {
      return this.theoDoiMuonSachList.map((tdms) => {
        const { MaDocGia, MaSach, TinhTrang } = tdms;
        return [MaDocGia, MaSach, TinhTrang].join('');
      });
    },
    filteredTheoDoiMuonSach() {
      if (!this.searchText) return this.theoDoiMuonSachList;
      return this.theoDoiMuonSachList.filter((_, index) =>
        this.theoDoiMuonSachStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    async fetchTheoDoiMuonSach() {
      try {
        this.theoDoiMuonSachList = await TheoDoiMuonSachService.getAll();
      } catch (error) {
        console.error('Lỗi khi lấy danh sách theo dõi mượn sách:', error);
        this.toast.error('Không thể lấy danh sách theo dõi mượn sách.');
      }
    },
    refreshList() {
      this.fetchTheoDoiMuonSach();
      this.searchText = '';
      this.resetForm();
    },
    resetForm() {
      this.theoDoiMuonSachForm = {
        MaDocGia: '',
        MaSach: '',
        NgayMuon: '',
        NgayTra: '',
        HanTra: '',
        MaNhanVien: '',
        ChiPhi: 0,
        TinhTrang: '',
      };
    },
    editTheoDoiMuonSach(tdms) {
      this.theoDoiMuonSachForm = { ...tdms };
    },
    async approveRequest() {
      if (this.currentUser.role !== 'nhanvien') {
        this.toast.error('Chỉ nhân viên mới có thể duyệt yêu cầu!');
        return;
      }
      const updateData = {
        TinhTrang: 'Đang mượn',
        MaNhanVien: this.currentUser.id,
        HanTra: new Date(Date.now() + 4 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 tuần sau
      };
      try {
        await TheoDoiMuonSachService.update(this.theoDoiMuonSachForm._id, updateData);
        this.toast.success('Đã duyệt yêu cầu mượn sách!');
        this.refreshList();
      } catch (error) {
        this.toast.error(error.message || 'Lỗi khi duyệt yêu cầu.');
      }
    },
    async returnBook() {
      if (this.currentUser.role !== 'nhanvien') {
        this.toast.error('Chỉ nhân viên mới có thể xử lý trả sách!');
        return;
      }
      const currentDate = new Date().toISOString().split('T')[0];
      const hanTraDate = new Date(this.theoDoiMuonSachForm.HanTra);
      const ngayTraDate = new Date(currentDate);
      const overdueDays = Math.max(0, Math.floor((ngayTraDate - hanTraDate) / (1000 * 60 * 60 * 24)));

      const sach = await SachService.get(this.theoDoiMuonSachForm.MaSach);
      const donGia = sach.DonGia || 0;
      const chiPhi = donGia + (overdueDays * donGia);

      const updateData = {
        TinhTrang: 'Đã trả',
        NgayTra: currentDate,
        ChiPhi: chiPhi,
      };
      try {
        await TheoDoiMuonSachService.update(this.theoDoiMuonSachForm._id, updateData);
        this.toast.success('Đã cập nhật trạng thái trả sách!');
        this.refreshList();
      } catch (error) {
        this.toast.error(error.message || 'Lỗi khi trả sách.');
      }
    },
    async deleteTheoDoiMuonSach(id) {
      if (this.currentUser.role !== 'nhanvien') {
        this.toast.error('Chỉ nhân viên mới có thể xóa yêu cầu!');
        return;
      }
      if (confirm('Bạn có chắc chắn muốn xóa yêu cầu này?')) {
        try {
          await TheoDoiMuonSachService.delete(id);
          this.toast.success('Xóa yêu cầu mượn sách thành công!');
          this.resetForm();
          this.refreshList();
        } catch (error) {
          this.toast.error(error.message || 'Lỗi khi xóa yêu cầu.');
        }
      }
    },
  },
  async created() {
    await this.fetchTheoDoiMuonSach();
  },
};
</script>

<style scoped>
.theodoimuonsach-container {
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