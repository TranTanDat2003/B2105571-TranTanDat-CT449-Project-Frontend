<template>
  <div class="card shadow-sm">
    <div class="card-header bg-success text-white">
      <i class="fas fa-book-reader me-2"></i> Chi tiết yêu cầu mượn sách
    </div>
    <div class="card-body p-4">
      <div class="mb-3">
        <label class="form-label">Tên độc giả</label>
        <input type="text" v-model="localForm.Ten" class="form-control" readonly />
      </div>

      <div class="mb-3">
        <label class="form-label">Mã sách</label>
        <input type="text" v-model="localForm.MaSach" class="form-control" readonly />
      </div>

      <div class="mb-3">
        <label class="form-label">Ngày mượn</label>
        <input type="text" v-model="localForm.NgayMuon" class="form-control" readonly />
      </div>

      <div class="mb-3">
        <label class="form-label">Ngày trả</label>
        <input type="text" v-model="localForm.NgayTra" class="form-control" readonly />
      </div>

      <div class="mb-3">
        <label class="form-label">Hạn trả</label>
        <input type="text" v-model="localForm.HanTra" class="form-control" readonly />
      </div>

      <div class="mb-3">
        <label class="form-label">Họ tên nhân viên</label>
        <input type="text" v-model="localForm.HoTenNV" class="form-control" readonly />
      </div>

      <div class="mb-3">
        <label class="form-label">Chi phí</label>
        <input type="number" v-model="localForm.ChiPhi" class="form-control" readonly />
      </div>

      <div class="mb-3">
        <label class="form-label">Tình trạng</label>
        <input type="text" v-model="localForm.TinhTrang" class="form-control" readonly />
      </div>

      <div class="d-flex gap-2">
        <template v-if="localForm.TinhTrang === 'Chờ duyệt'">
          <button type="button" class="btn btn-primary" @click="$emit('approve')">
            <i class="fas fa-check me-2"></i> Duyệt đơn
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('delete', localForm._id)">
            <i class="fas fa-trash me-2"></i> Xóa
          </button>
        </template>
        <template v-if="localForm.TinhTrang === 'Đang mượn'">
          <button type="button" class="btn btn-warning" @click="$emit('return')">
            <i class="fas fa-undo me-2"></i> Trả sách
          </button>
        </template>
        <button type="button" class="btn btn-secondary" @click="$emit('close')">
          <i class="fas fa-times me-2"></i> Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theoDoiMuonSachForm: { type: Object, required: true },
    currentUser: { type: Object, required: true },
  },
  emits: ['update:theoDoiMuonSachForm', 'approve', 'return', 'delete', 'close'],
  computed: {
    localForm: {
      get() {
        return this.theoDoiMuonSachForm;
      },
      set(value) {
        this.$emit('update:theoDoiMuonSachForm', value);
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

.form-control {
  border-radius: 5px;
  border: 1px solid #ced4da;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #28A745;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.3);
}

.btn-primary {
  background-color: #28A745;
  border: none;
}

.btn-primary:hover {
  background-color: #218838;
}

.btn-warning {
  background-color: #FFC107;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #DC3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-secondary {
  background-color: #6C757D;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>