import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export default (baseURL) => {
    const apiClient = axios.create({
        baseURL,
        ...commonConfig,
    });

    // Interceptor để thêm token vào header
    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Interceptor để xử lý lỗi
    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            // Không can thiệp vào lỗi 401 nếu yêu cầu là đăng nhập
            const isLoginRequest = error.config.url.includes('/login');
            if (isLoginRequest) {
                return Promise.reject(error);
            }

            if (error.response?.status === 401 || error.response?.status === 403) {
                // Token không hợp lệ hoặc hết hạn
                localStorage.removeItem('token');
                localStorage.removeItem('isAuthenticated');
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                localStorage.removeItem('currentUser');
                const redirectPath = currentUser?.role === 'docgia' ? '/DocGiaLogin' : '/NhanVienLogin';
                window.location.href = `${redirectPath}?message=Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.`;
            }
            return Promise.reject(error);
        }
    );

    return apiClient;
};