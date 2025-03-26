<template>
  <div class="card shadow-sm">
    <div class="card-header bg-success text-white">
      <i class="fas fa-book-reader me-2"></i> Danh sách yêu cầu mượn sách
    </div>
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Tên độc giả</th>
            <th>Mã sách</th>
            <th>Ngày mượn</th>
            <th>Tình trạng</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tdms in theoDoiMuonSach"
            :key="tdms._id"
            @click="$emit('edit', tdms)"
            style="cursor: pointer;"
          >
            <td>{{ tdms.Ten }}</td>
            <td>{{ tdms.MaSach }}</td>
            <td>{{ tdms.NgayMuon }}</td>
            <td>{{ tdms.TinhTrang }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="theoDoiMuonSach.length === 0" class="text-muted text-center">
        Không có yêu cầu mượn sách nào.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheoDoiMuonSachList',
  props: {
    theoDoiMuonSach: {
      type: Array,
      required: true,
    },
  },
  emits: ['edit'],
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