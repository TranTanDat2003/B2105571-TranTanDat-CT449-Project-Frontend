<template>
  <div class="input-group">
    <span class="input-group-text">
      <i class="fas fa-search"></i>
    </span>
    <input type="text" class="form-control" placeholder="Tìm kiếm..." v-model="searchText" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  computed: {
    searchText: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped>
.input-group-text {
  background-color: #e9f7ef; /* Gradient nhạt từ nền */
  color: #28A745; /* Màu xanh lá nhạt */
  border: 1px solid #28A745;
  border-right: none;
  border-radius: 5px 0 0 5px;
}

.form-control {
  border-radius: 0 5px 5px 0;
  border: 1px solid #28A745;
  transition: border-color 0.3s ease;
  color: #28A745;
}

.form-control:focus {
  border-color: #28A745;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.3);
  outline: none;
}

.form-control::placeholder {
  color: #6c757d; /* Màu xám nhạt cho placeholder */
}
</style>