<template>
  <div class="card shadow-sm">
    <div class="card-header bg-success text-white">
      <i class="fas fa-book me-2"></i>
      {{ isEditing ? 'Sửa sách' : 'Thêm sách' }}
    </div>
    <Form @submit="onSubmit" :validation-schema="sachSchema" class="card-body p-4">
      <div class="mb-3">
        <label for="maSach" class="form-label">Mã sách</label>
        <Field
          name="MaSach"
          type="text"
          v-model="localForm.MaSach"
          class="form-control"
          :readonly="isEditing"
        />
        <ErrorMessage name="MaSach" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="tenSach" class="form-label">Tên sách</label>
        <Field
          name="TenSach"
          type="text"
          v-model="localForm.TenSach"
          class="form-control"
        />
        <ErrorMessage name="TenSach" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="donGia" class="form-label">Đơn giá</label>
        <Field
          name="DonGia"
          type="number"
          v-model="localForm.DonGia"
          class="form-control"
        />
        <ErrorMessage name="DonGia" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="soQuyen" class="form-label">Số quyển</label>
        <Field
          name="SoQuyen"
          type="number"
          v-model="localForm.SoQuyen"
          class="form-control"
        />
        <ErrorMessage name="SoQuyen" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="namXuatBan" class="form-label">Năm xuất bản</label>
        <Field
          name="NamXuatBan"
          type="number"
          v-model="localForm.NamXuatBan"
          class="form-control"
        />
        <ErrorMessage name="NamXuatBan" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="maNXB" class="form-label">Mã NXB</label>
        <Field
          name="MaNXB"
          as="select"
          v-model="localForm.MaNXB"
          class="form-control"
        >
          <option value="">Chọn mã NXB</option>
          <option v-for="nxb in nhaXuatBanList" :key="nxb.MaNXB" :value="nxb.MaNXB">
            {{ nxb.MaNXB }} - {{ nxb.TenNXB }}
          </option>
        </Field>
        <ErrorMessage name="MaNXB" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="nguonGocTacGia" class="form-label">Nguồn gốc tác giả</label>
        <Field
          name="NguonGocTacGia"
          type="text"
          v-model="localForm.NguonGocTacGia"
          class="form-control"
        />
        <ErrorMessage name="NguonGocTacGia" class="text-danger small" />
      </div>

      <div class="d-flex gap-2">
        <template v-if="!isEditing">
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-save me-2"></i> Lưu
          </button>
          <button type="button" class="btn btn-secondary" @click="$emit('reset')">
            <i class="fas fa-undo me-2"></i> Reset
          </button>
        </template>
        <template v-if="isEditing">
          <button type="submit" class="btn btn-warning">
            <i class="fas fa-edit me-2"></i> Sửa
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('delete', localForm.MaSach)"
          >
            <i class="fas fa-trash me-2"></i> Xóa
          </button>
        </template>
      </div>
    </Form>
  </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  components: { Form, Field, ErrorMessage },
  props: {
    sachForm: { type: Object, required: true },
    isEditing: { type: Boolean, default: false },
    nhaXuatBanList: { type: Array, required: true },
  },
  emits: ['update:sachForm', 'submit', 'delete', 'reset'],
  computed: {
    localForm: {
      get() {
        return this.sachForm;
      },
      set(value) {
        this.$emit('update:sachForm', value);
      },
    },
    sachSchema() {
      return yup.object().shape({
        MaSach: yup
          .string()
          .required('Mã sách là bắt buộc.')
          .min(5, 'Mã sách quá ngắn.')
          .max(5, 'Mã sách quá dài.'),
        TenSach: yup
          .string()
          .required('Tên sách là bắt buộc.')
          .min(2, 'Tên sách quá ngắn.')
          .max(100, 'Tên sách quá dài.'),
        DonGia: yup
          .number()
          .required('Đơn giá là bắt buộc.')
          .min(0, 'Đơn giá không được âm.'),
        SoQuyen: yup
          .number()
          .required('Số quyển là bắt buộc.')
          .min(0, 'Số quyển không được âm.')
          .integer('Số quyển phải là số nguyên.'),
        NamXuatBan: yup
          .number()
          .required('Năm xuất bản là bắt buộc.')
          .min(1900, 'Năm xuất bản không hợp lệ.')
          .max(new Date().getFullYear(), 'Năm xuất bản không được lớn hơn năm hiện tại.')
          .integer('Năm xuất bản phải là số nguyên.'),
        MaNXB: yup
          .string()
          .required('Mã NXB là bắt buộc.')
          .test('valid-maNXB', 'Mã NXB không hợp lệ.', (value) =>
            this.nhaXuatBanList.some((nxb) => String(nxb.MaNXB) === String(value))
          ),
        NguonGocTacGia: yup.string().max(100, 'Nguồn gốc tác giả quá dài.'),
      });
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit');
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