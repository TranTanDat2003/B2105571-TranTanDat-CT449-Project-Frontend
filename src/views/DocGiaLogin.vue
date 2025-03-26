<template>
  <div class="container login-container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <i class="fas fa-sign-in-alt me-2"></i> Đăng nhập độc giả
          </div>
          <div class="card-body p-4">
            <Form @submit="handleLogin" :validation-schema="loginSchema">
              <div class="mb-3">
                <label for="sodienthoai" class="form-label">Số điện thoại</label>
                <Field
                  name="SoDienThoai"
                  type="text"
                  v-model="form.SoDienThoai"
                  class="form-control"
                />
                <ErrorMessage name="SoDienThoai" class="text-danger small" />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <Field
                  name="Password"
                  type="password"
                  v-model="form.Password"
                  class="form-control"
                />
                <ErrorMessage name="Password" class="text-danger small" />
              </div>

              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-success">
                  <i class="fas fa-sign-in-alt me-2"></i> Đăng nhập
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import DocGiaService from '@/services/docGia.service';
import { useToast } from 'vue-toastification';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      form: {
        SoDienThoai: '',
        Password: '',
      },
      loginSchema: yup.object().shape({
        SoDienThoai: yup
          .string()
          .required('Số điện thoại là bắt buộc.')
          .matches(/^[0-9]{10}$/, 'Số điện thoại phải có đúng 10 chữ số.'),
        Password: yup
          .string()
          .required('Mật khẩu là bắt buộc.')
          .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
      }),
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await DocGiaService.login(this.form);
        if (!response.token) {
          throw new Error('Không nhận được token từ server.');
        }
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAuthenticated', 'true');

        const user = {
          id: response._id || '',
          SoDienThoai: response.SoDienThoai || this.form.SoDienThoai,
          Ten: response.Ten || '',
          role: 'docgia',
        };
        localStorage.setItem('currentUser', JSON.stringify(user));

        this.$emit('update-auth', {
          isAuthenticated: true,
          currentUser: user,
        });

        this.toast.success('Đăng nhập thành công!');
        this.$router.push('/');
      } catch (error) {
        this.toast.error(error.message || 'Đã xảy ra lỗi khi đăng nhập.');
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  padding: 40px 20px;
  min-height: 100vh;
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
  background-color: #28A745; /* Xanh lá nhạt */
}

h3 {
  color: #28A745;
  font-weight: 600;
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

.btn-success {
  background-color: #28A745;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.btn-success:hover {
  background-color: #218838; /* Xanh lá đậm hơn khi hover */
}

.text-danger {
  color: #dc3545;
}
</style>