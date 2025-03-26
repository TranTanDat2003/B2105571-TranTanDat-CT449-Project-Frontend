import createApiClient from "./api.service";

class NhaXuatBanService {
  constructor(baseUrl = "/api/nhaxuatban") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      return (await this.api.get("/")).data;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách nhà xuất bản');
    }
  }

  async create(data) {
    try {
      return (await this.api.post("/", data)).data;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi tạo nhà xuất bản');
    }
  }

  async get(id) {
    try {
      return (await this.api.get(`/${id}`)).data;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi lấy thông tin nhà xuất bản');
    }
  }

  async update(id, data) {
    try {
      return (await this.api.put(`/${id}`, data)).data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật nhà xuất bản');
    }
  }

  async delete(id) {
    try {
      return (await this.api.delete(`/${id}`)).data;
    }
    catch (error) {
      throw new Error(error.response?.data?.message || 'Lỗi khi xóa nhà xuất bản');
    }
  }
}

export default new NhaXuatBanService();