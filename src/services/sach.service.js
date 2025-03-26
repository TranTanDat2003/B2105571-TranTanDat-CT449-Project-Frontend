import createApiClient from "./api.service";

class SachService {
  constructor(baseUrl = "/api/sach") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      return (await this.api.get("/")).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách sách');
    }
  }

  async create(data) {
    try {
      return (await this.api.post("/", data)).data;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi tạo sách');
    }
  }

  async get(id) {
    try {
      return (await this.api.get(`/${id}`)).data;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy thông tin sách');
    }
  }

  async update(id, data) {
    try {
      return (await this.api.put(`/${id}`, data)).data;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật sách');
    }
  }

  async delete(id) {
    try {
      return (await this.api.delete(`/${id}`)).data;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi xóa sách');
    }
  }
}

export default new SachService();