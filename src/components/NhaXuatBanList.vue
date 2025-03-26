<template>
  <div class="card shadow-sm">
    <div class="card-header bg-success text-white">
      <i class="fas fa-users me-2"></i> Danh sách nhà xuất bản
    </div>
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Mã nhà xuất bản</th>
            <th>Tên nhà xuất bản</th>
            <th>Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="nxb in nhaXuatBan"
            :key="nxb._id"
            @click="$emit('edit', nxb)"
            style="cursor: pointer;"
          >
            <td class="border-end">{{ nxb.MaNXB }}</td>
            <td class="border-end">{{ nxb.TenNXB }}</td>
            <td>{{ nxb.DiaChi }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="nhaXuatBan.length === 0" class="text-muted text-center">
        Không có nhà xuất bản nào.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NhaXuatBanList',
  props: {
    nhaXuatBan: {
      type: Array,
      required: true,
    },
  },
  emits: ['edit'],
};
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
  background-color: #fff;
}

.card-header {
  border-radius: 10px 10px 0 0;
  padding: 15px;
  font-weight: 500;
}

.card-body {
  padding: 20px;
}

.table {
  margin-bottom: 0;
}

thead tr {
  background-color: #28A745;
  color: #fff;
}

th {
  font-weight: 600;
  padding: 15px;
  border-bottom: 2px solid #218838;
}

.table-hover tbody tr:hover {
  background-color: #e9f7ef;
}

td {
  color: #495057;
  padding: 12px;
  vertical-align: middle;
  border: 1px solid #dee2e6;
}

.border-end {
  border-right: 1px solid #dee2e6;
}

.text-muted {
  color: #6c757d;
  padding: 20px 0;
}
</style>