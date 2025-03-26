<template>
  <div class="card shadow-sm">
    <div class="card-header bg-success text-white">
      <i class="fas fa-users me-2"></i> Danh sách độc giả
    </div>
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Họ lót</th>
            <th>Tên</th>
            <th>Ngày sinh</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="dg in docGia"
            :key="dg._id"
            @click="$emit('view', dg)"
            style="cursor: pointer;"
          >
            <td>{{ dg.HoLot }}</td>
            <td>{{ dg.Ten }}</td>
            <td>{{ dg.NgaySinh }}</td>
            <td>{{ dg.SoDienThoai }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="docGia.length === 0" class="text-muted text-center">
        Không có độc giả nào.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocGiaList',
  props: {
    docGia: {
      type: Array,
      required: true,
    },
  },
  emits: ['view'],
};
</script>

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
}

td {
  border: 1px solid #dee2e6;
}
</style>