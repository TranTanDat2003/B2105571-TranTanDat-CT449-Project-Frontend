<template>
  <div class="container signup-container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <i class="fas fa-user-plus me-2"></i> Đăng ký độc giả
          </div>
          <div class="card-body p-4">
            <h3 class="text-center mb-4 text-success">Đăng ký độc giả</h3>
            <DocGiaForm @submit="handleSignup" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocGiaService from '@/services/docGia.service';
import { useToast } from 'vue-toastification';
import DocGiaForm from '@/components/DocGiaForm.vue';

export default {
  components: {
    DocGiaForm,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async handleSignup(form) {
      try {
        console.log('Form data before sending:', form);
        const formData = { ...form };
        if (formData.DiaChi === '') {
          formData.DiaChi = undefined;
        }
        const response = await DocGiaService.create(formData);
        if (!response._id) {
          throw new Error('Đăng ký thất bại. Vui lòng thử lại.');
        }
        this.toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
        this.$router.push('/DocGiaLogin');
      } catch (error) {
        this.toast.error(error.message || 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  padding: 40px 20px;
  align-items: center;
  background: linear-gradient(135deg, #e9f7ef 0%, #ffffff 100%);
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

h3 {
  color: #28A745;
  font-weight: 600;
}
</style>