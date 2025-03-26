<template>
  <div class="home-container">
    <div class="card shadow-sm">
      <div class="card-header bg-success text-white">
        <i class="fas fa-book-open me-2"></i> Hệ thống quản lý mượn sách
      </div>
      <div class="card-body text-center">
        <i class="fas fa-book-reader display-4 text-success mb-3"></i>
        <h1 class="mb-4 text-success">Chào mừng bạn!</h1>
        <p class="lead text-muted">
          Hệ thống giúp quản lý độc giả, sách, nhà xuất bản và các giao dịch mượn sách một cách hiệu quả.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 40px 20px;
  background: linear-gradient(135deg, #e9f7ef 0%, #ffffff 100%);
  min-height: 100vh;
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
}

.card-body {
  padding: 30px;
}

.text-success {
  color: #28A745 !important;
}

.lead {
  font-size: 1.2rem;
  line-height: 1.6;
}
</style>