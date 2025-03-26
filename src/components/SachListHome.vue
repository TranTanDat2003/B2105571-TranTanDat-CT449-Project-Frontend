<template>
  <div class="card shadow-sm">
    <div class="card-header bg-success text-white">
      <i class="fas fa-book me-2"></i> Danh sách sách
    </div>
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Mã Sách</th>
            <th>Tên Sách</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="sach in sachList"
            :key="sach._id"
            @click="$emit('select', sach)"
            style="cursor: pointer;"
            :class="{ 'table-active': selectedSach && selectedSach._id === sach._id }"
          >
            <td>{{ sach.MaSach }}</td>
            <td>{{ sach.TenSach }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="sachList.length === 0" class="text-muted text-center">
        Không có sách nào.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SachListHome',
  props: {
    sachList: {
      type: Array,
      required: true,
    },
    selectedSach: {
      type: Object,
      default: null,
    },
  },
  emits: ['select'],
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

.table-active {
  background-color: #e9ecef;
}

th {
  color: #495057;
  font-weight: 600;
}

td {
  border: 1px solid #dee2e6;
}
</style>