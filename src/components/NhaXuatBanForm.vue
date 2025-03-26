<template>
  <div class="card shadow-sm">
    <h5 class="card-header bg-success text-white">
      <i class="fas fa-building me-2"></i>
      {{ isEditing ? 'Sửa nhà xuất bản' : 'Thêm nhà xuất bản' }}
    </h5>
    <Form @submit="onSubmit" :validation-schema="nxbSchema" class="card-body p-4">
      <div class="mb-3">
        <label for="maNXB" class="form-label">Mã nhà xuất bản</label>
        <Field
          name="MaNXB"
          type="text"
          v-model="localForm.MaNXB"
          class="form-control"
          :readonly="isEditing"
        />
        <ErrorMessage name="MaNXB" class="text-danger small" />
      </div>

      <div class="mb-3">
        <label for="tenNXB" class="form-label">Tên nhà xuất bản</label>
        <Field
          name="TenNXB"
          type="text"
          v-model="localForm.TenNXB"
          class="form-control"
        />
        <ErrorMessage name="TenNXB" class="text-danger small" />
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
            @click="$emit('delete', localForm.MaNXB)"
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
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    nhaXuatBanForm: { type: Object, required: true },
    isEditing: { type: Boolean, default: false },
  },
  emits: ['update:nhaXuatBanForm', 'submit', 'delete', 'reset'],
  data() {
    return {
      nxbSchema: yup.object().shape({
        MaNXB: yup
          .string()
          .required('Mã NXB là bắt buộc.')
          .min(6, 'Mã quá ngắn.')
          .max(6, 'Mã quá dài.'),
        TenNXB: yup
          .string()
          .required('Tên nhà xuất bản là bắt buộc.')
          .min(2, 'Tên quá ngắn.')
          .max(100, 'Tên quá dài.'),
        DiaChi: yup.string().max(150, 'Địa chỉ quá dài.'),
      }),
    };
  },
  computed: {
    localForm: {
      get() {
        return this.nhaXuatBanForm;
      },
      set(value) {
        this.$emit('update:nhaXuatBanForm', value);
      },
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
  background-color: #28A745;
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