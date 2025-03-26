import createApiClient from "./api.service";

class TheodoimuonsachService {
  constructor(baseUrl = "/api/theodoimuonsach") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      return (await this.api.get("/")).data;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách theo dõi mượn sách');
    }
  }

  async create(data) {
    try {
      return (await this.api.post("/", data)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi tạo theo dõi mượn sách');
    }
  }

  async get(id) {
    try {
      return (await this.api.get(`/${id}`)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy thông tin theo dõi mượn sách');
    }
  }

  async update(id, data) {
    try {
      return (await this.api.put(`/${id}`, data)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật theo dõi mượn sách');
    }
  }

  async delete(id) {
    try {
      return (await this.api.delete(`/${id}`)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi xóa theo dõi mượn sách');
    }
  }
}

export default new TheodoimuonsachService();