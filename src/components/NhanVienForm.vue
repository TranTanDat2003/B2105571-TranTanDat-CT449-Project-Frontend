<template>
  <div class="card shadow-sm">
    <!-- Form thêm/sửa nhân viên -->
    <div v-if="!isChangingPassword">
      <h5 class="mb-4 card-header bg-success">
        <i class="fas fa-users me-2"></i>
        {{ isEditing ? 'Sửa nhân viên' : 'Thêm nhân viên' }}
      </h5>

      <Form @submit="onSubmit" :validation-schema="nhanVienSchema" class="card-body p-4">

        <div class="mb-3">
          <label for="hoTenNV" class="form-label">Họ tên nhân viên</label>
          <Field
            name="HoTenNV"
            type="text"
            v-model="localForm.HoTenNV"
            class="form-control"
          />
          <ErrorMessage name="HoTenNV" class="text-danger small" />
        </div>

        <!-- Chỉ hiển thị input Mật khẩu trong form thêm -->
        <div v-if="!isEditing" class="mb-3">
          <label for="password" class="form-label">Mật khẩu</label>
          <Field
            name="Password"
            type="password"
            v-model="localForm.Password"
            class="form-control"
          />
          <ErrorMessage name="Password" class="text-danger small" />
        </div>

        <div class="mb-3">
          <label for="chucVu" class="form-label">Chức vụ</label>
          <Field
            name="ChucVu"
            as="select"
            v-model="localForm.ChucVu"
            class="form-control"
          >
            <option value="" disabled>Chọn chức vụ</option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </Field>
          <ErrorMessage name="ChucVu" class="text-danger small" />
        </div>

        <div class="mb-3">
          <label for="diaChi" class="form-label">Địa chỉ</label>
          <Field
            name="DiaChi"
            type="text"
            v-model="localForm.DiaChi"
            class="form-control"
          />
          <ErrorMessage name="DiaChi" class="text-danger small" />
        </div>

        <div class="mb-3">
          <label for="soDienThoai" class="form-label">Số điện thoại</label>
          <Field
            name="SoDienThoai"
            type="text"
            v-model="localForm.SoDienThoai"
            class="form-control"
          />
          <ErrorMessage name="SoDienThoai" class="text-danger small" />
        </div>

        <div class="d-flex gap-2">
          <template v-if="!isEditing">
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-save me-2"></i>Lưu
            </button>
            <button type="button" class="btn btn-secondary" @click="$emit('reset')">
              <i class="fas fa-undo me-2"></i>Reset
            </button>
          </template>
          <template v-if="isEditing">
            <button type="submit" class="btn btn-warning">
              <i class="fas fa-edit me-2"></i>Sửa
            </button>
            <button type="button" class="btn btn-info" @click="startChangePassword">
              <i class="fas fa-key me-2"></i>Đổi mật khẩu
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="$emit('delete', localForm._id)"
            >
              <i class="fas fa-trash me-2"></i>Xóa
            </button>
          </template>
        </div>
      </Form>
    </div>

    <!-- Form đổi mật khẩu -->
    <div v-else>
      <h5 class="mb-4">
        <i class="fas fa-key me-2"></i>Đổi mật khẩu
      </h5>

      <Form @submit="onChangePasswordSubmit" :validation-schema="changePasswordSchema">
        <div class="mb-3">
          <label for="newPassword" class="form-label">Mật khẩu mới</label>
          <Field
            name="newPassword"
            type="password"
            v-model="newPassword"
            class="form-control"
          />
          <ErrorMessage name="newPassword" class="text-danger small" />
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-save me-2"></i>Lưu
          </button>
          <button type="button" class="btn btn-secondary" @click="cancelChangePassword">
            <i class="fas fa-times me-2"></i>Hủy
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    nhanVienForm: { type: Object, required: true },
    isEditing: { type: Boolean, default: false },
  },
  emits: ['update:nhanVienForm', 'submit', 'delete', 'reset', 'change-password'],
  data() {
    return {
      roles: [
        'Quản lý',
        'Thủ thư',
        'Nhân viên hỗ trợ',
        'Nhân viên kho'
      ],
      isChangingPassword: false,
      newPassword: '',
      changePasswordSchema: yup.object().shape({
        newPassword: yup
          .string()
          .required('Mật khẩu mới là bắt buộc.')
          .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.')
          .max(50, 'Mật khẩu quá dài.'),
      }),
    };
  },
  computed: {
    nhanVienSchema() {
      return yup.object().shape({
        HoTenNV: yup
          .string()
          .required('Họ tên nhân viên là bắt buộc.')
          .min(2, 'Họ tên quá ngắn.')
          .max(100, 'Họ tên quá dài.'),
        Password: this.isEditing
          ? yup.string().notRequired()
          : yup
              .string()
              .required('Mật khẩu là bắt buộc.')
              .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.')
              .max(50, 'Mật khẩu quá dài.'),
        ChucVu: yup
          .string()
          .required('Chức vụ là bắt buộc.')
          .oneOf(
            ['Quản lý', 'Thủ thư', 'Nhân viên hỗ trợ', 'Nhân viên kho'],
            'Chức vụ không hợp lệ.'
          ),
        DiaChi: yup.string().max(150, 'Địa chỉ quá dài.'),
        SoDienThoai: yup
          .string()
          .required('Số điện thoại là bắt buộc.')
          .matches(
            /((09|03|07|08|05)+([0-9]{8})\b)/g,
            'Số điện thoại không hợp lệ.'
          ),
      });
    },
    localForm: {
      get() {
        return this.nhanVienForm;
      },
      set(value) {
        this.$emit('update:nhanVienForm', value);
      },
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit');
    },
    startChangePassword() {
      this.isChangingPassword = true;
      this.newPassword = '';
    },
    cancelChangePassword() {
      this.isChangingPassword = false;
      this.newPassword = '';
    },
    onChangePasswordSubmit() {
      this.$emit('change-password', this.newPassword);
      this.isChangingPassword = false;
      this.newPassword = '';
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
  background-color: #28A745;
  color: #fff;
}

h5 {
  color: #28A745;
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

.btn-info {
  background-color: #17A2B8;
}

.btn-info:hover {
  background-color: #138496;
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

.text-danger {
  color: #dc3545;
}
</style>