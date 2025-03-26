import createApiClient from "./api.service";

class NhanVienService {
  constructor(baseUrl = "/api/nhanvien") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      return (await this.api.get("/")).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách nhân viên');
    }
  }

  async create(data) {
    try {
      return (await this.api.post("/", data)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi tạo nhân viên');
    }
  }

  async get(id) {
    try {
    return (await this.api.get(`/${id}`)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy thông tin nhân viên');
    }
  }

  async update(id, data) {
    try {
      return (await this.api.put(`/${id}`, data)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật nhân viên');
    }
  }

  async delete(id) {
    try {
      return (await this.api.delete(`/${id}`)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi xóa nhân viên');
    }
  }

  async login(data) {
    try {
      return (await this.api.post("/login", data)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi đăng nhập');
    }
  }
}

export default new NhanVienService();