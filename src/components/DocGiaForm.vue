<template>
  <Form @submit="$emit('submit', form)" :validation-schema="signupSchema">
    <div class="mb-3">
      <label for="holot" class="form-label">Họ lót</label>
      <Field
        name="HoLot"
        type="text"
        v-model="form.HoLot"
        class="form-control"
      />
      <ErrorMessage name="HoLot" class="text-danger small" />
    </div>

    <div class="mb-3">
      <label for="ten" class="form-label">Tên</label>
      <Field
        name="Ten"
        type="text"
        v-model="form.Ten"
        class="form-control"
      />
      <ErrorMessage name="Ten" class="text-danger small" />
    </div>

    <div class="mb-3">
      <label for="ngaysinh" class="form-label">Ngày sinh</label>
      <Field
        name="NgaySinh"
        type="date"
        v-model="form.NgaySinh"
        class="form-control"
      />
      <ErrorMessage name="NgaySinh" class="text-danger small" />
    </div>

    <div class="mb-3">
      <label for="phai" class="form-label">Giới tính</label>
      <Field
        name="Phai"
        as="select"
        v-model="form.Phai"
        class="form-control"
      >
        <option value="" disabled>Chọn giới tính</option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </Field>
      <ErrorMessage name="Phai" class="text-danger small" />
    </div>

    <div class="mb-3">
      <label for="diachi" class="form-label">Địa chỉ</label>
      <Field
        name="DiaChi"
        type="text"
        v-model="form.DiaChi"
        class="form-control"
      />
      <ErrorMessage name="DiaChi" class="text-danger small" />
    </div>

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
        <i class="fas fa-user-plus me-2"></i>Đăng ký
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'DocGiaForm',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    initialForm: {
      type: Object,
      default: () => ({
        HoLot: '',
        Ten: '',
        NgaySinh: '',
        Phai: '',
        DiaChi: '',
        SoDienThoai: '',
        Password: '',
      }),
    },
  },
  data() {
    return {
      form: { ...this.initialForm },
      signupSchema: yup.object().shape({
        HoLot: yup.string().required('Họ lót là bắt buộc.'),
        Ten: yup.string().required('Tên là bắt buộc.'),
        NgaySinh: yup
          .date()
          .required('Ngày sinh là bắt buộc.')
          .typeError('Ngày sinh không hợp lệ.'),
        Phai: yup
          .string()
          .required('Giới tính là bắt buộc.')
          .oneOf(['Nam', 'Nữ'], 'Giới tính phải là Nam hoặc Nữ.'),
        DiaChi: yup.string().max(50, 'Địa chỉ quá dài.'),
        SoDienThoai: yup
          .string()
          .required('Số điện thoại là bắt buộc.')
          .matches(
            /((09|03|07|08|05)+([0-9]{8})\b)/g,
            'Số điện thoại không hợp lệ.'
          ),
        Password: yup
          .string()
          .required('Mật khẩu là bắt buộc.')
          .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.'),
      }),
    };
  },
  emits: ['submit'],
};
</script>

<style scoped>
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
  background-color: #218838;
}

.text-danger {
  color: #dc3545;
}
</style>