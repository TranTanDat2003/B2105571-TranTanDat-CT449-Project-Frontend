<template>
  <div class="card shadow-sm">
    <div class="card-header bg-success text-white">
      <i class="fas fa-user me-2"></i> Chi tiết độc giả
    </div>
    <div class="card-body p-4">
      <div class="mb-3">
        <label class="form-label">Họ lót</label>
        <p class="form-control-static">{{ docGia.HoLot }}</p>
      </div>

      <div class="mb-3">
        <label class="form-label">Tên</label>
        <p class="form-control-static">{{ docGia.Ten }}</p>
      </div>

      <div class="mb-3">
        <label class="form-label">Ngày sinh</label>
        <p class="form-control-static">{{ docGia.NgaySinh }}</p>
      </div>

      <div class="mb-3">
        <label class="form-label">Phái</label>
        <p class="form-control-static">{{ docGia.Phai }}</p>
      </div>

      <div class="mb-3">
        <label class="form-label">Địa chỉ</label>
        <p class="form-control-static">{{ docGia.DiaChi ?? 'Không có dữ liệu' }}</p>
      </div>

      <div class="mb-3">
        <label class="form-label">Số điện thoại</label>
        <p class="form-control-static">{{ docGia.SoDienThoai }}</p>
      </div>

      <div class="d-flex gap-2">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">
          <i class="fas fa-times me-2"></i> Đóng
        </button>
        <button type="button" class="btn btn-danger" @click="$emit('delete', docGia._id)">
          <i class="fas fa-trash me-2"></i> Xóa độc giả
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    docGia: { type: Object, required: true },
  },
  emits: ['close', 'delete'],
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
  transition: border-color 0.3s ease;
}

.btn-secondary {
  background-color: #6C757D;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-danger {
  background-color: #DC3545;
  border: none;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>