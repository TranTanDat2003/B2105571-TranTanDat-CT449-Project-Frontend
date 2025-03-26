import createApiClient from "./api.service";

class DocGiaService {
  constructor(baseUrl = "/api/docgia") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      return (await this.api.get("/")).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách độc giả');
    }
  }

  async create(data) {
    try {
      return (await this.api.post("/", data)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi tạo độc giả');
    }
  }

  async get(id) {
    try {
      return (await this.api.get(`/${id}`)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy thông tin độc giả');
    }
  }

  async update(id, data) {
    try {
      return (await this.api.put(`/${id}`, data)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật độc giả');
    }
  }

  async delete(id) {
    try {
      return (await this.api.delete(`/${id}`)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi xóa độc giả');
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

export default new DocGiaService();