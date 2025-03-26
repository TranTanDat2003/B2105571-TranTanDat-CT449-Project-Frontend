<template>
  <div class="card shadow-sm">
    <div class="card-header bg-success text-white">
      <i class="fas fa-users me-2"></i> Danh sách nhân viên
    </div>
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Chức vụ</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="nv in nhanVien"
            :key="nv._id"
            @click="$emit('edit', nv)"
            style="cursor: pointer;"
          >
            <td>{{ nv.HoTenNV }}</td>
            <td>{{ nv.ChucVu }}</td>
            <td>{{ nv.DiaChi }}</td>
            <td>{{ nv.SoDienThoai }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="nhanVien.length === 0" class="text-muted text-center">
        Không có nhân viên nào.
      </p>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  border-radius: 10px 10px 0 0;
  padding: 15px;
  font-weight: 500;
}

.table {
  margin-bottom: 0;
}

.table-hover tr:hover {
  background-color: #e9f7ef;
}

th {
  color: #495057;
  font-weight: 600;
  border-bottom: 2px solid #218838;
}

td {
  border: 1px solid #dee2e6;
}

</style>

<script>
export default {
  name: 'NhanVienList',
  props: {
    nhanVien: {
      type: Array,
      required: true,
    },
  },
  emits: ['edit'],
};
</script>