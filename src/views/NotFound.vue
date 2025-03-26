<template>
    <div class="not-found-page d-flex align-items-center justify-content-center min-vh-100">
        <div class="container text-center">
            <!-- Tiêu đề 404 với hiệu ứng -->
            <h1 class="display-1 fw-bold text-success animate__animated animate__bounceInDown">
                404
            </h1>
            <h2 class="mb-4 text-secondary animate__animated animate__fadeIn animate__delay-1s">
                Oops! Trang không tìm thấy
            </h2>
            <p class="lead mb-5 text-muted animate__animated animate__fadeIn animate__delay-2s">
                Có vẻ như bạn đã đi lạc. Đừng lo, hãy quay lại trang chủ nhé!
            </p>

            <!-- Nút quay lại trang chủ -->
            <router-link to="/" class="btn btn-success btn-lg animate__animated animate__pulse animate__delay-4s">
                <i class="fas fa-home me-2"></i> Quay lại Trang chủ
            </router-link>

            <!-- Hiệu ứng bong bóng nền -->
            <div class="bubbles">
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>

<style scoped>
/* Gradient nền */
.not-found-page {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3e2ce 100%);
    position: relative;
    overflow: hidden;
}

/* Hiệu ứng bong bóng */
.bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

.bubble {
    position: absolute;
    bottom: -100px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: float 15s infinite;
    opacity: 0.6;
}

.bubble:nth-child(1) {
    width: 40px;
    height: 40px;
    left: 10%;
    animation-duration: 10s;
}

.bubble:nth-child(2) {
    width: 60px;
    height: 60px;
    left: 20%;
    animation-duration: 12s;
    animation-delay: 1s;
}

.bubble:nth-child(3) {
    width: 30px;
    height: 30px;
    left: 30%;
    animation-duration: 8s;
    animation-delay: 2s;
}

.bubble:nth-child(4) {
    width: 50px;
    height: 50px;
    left: 40%;
    animation-duration: 14s;
}

.bubble:nth-child(5) {
    width: 70px;
    height: 70px;
    left: 50%;
    animation-duration: 11s;
    animation-delay: 3s;
}

.bubble:nth-child(6) {
    width: 20px;
    height: 20px;
    left: 60%;
    animation-duration: 9s;
    animation-delay: 1s;
}

.bubble:nth-child(7) {
    width: 80px;
    height: 80px;
    left: 70%;
    animation-duration: 13s;
}

.bubble:nth-child(8) {
    width: 35px;
    height: 35px;
    left: 80%;
    animation-duration: 10s;
    animation-delay: 2s;
}

.bubble:nth-child(9) {
    width: 55px;
    height: 55px;
    left: 90%;
    animation-duration: 12s;
    animation-delay: 4s;
}

.bubble:nth-child(10) {
    width: 45px;
    height: 45px;
    left: 95%;
    animation-duration: 15s;
    animation-delay: 1s;
}

@keyframes float {
    0% {
        transform: translateY(0);
        opacity: 0.6;
    }

    50% {
        opacity: 0.8;
    }

    100% {
        transform: translateY(-100vh);
        opacity: 0;
    }
}

/* Tùy chỉnh giao diện */
h1 {
    font-size: 8rem;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

h2 {
    font-size: 2.5rem;
}

.lead {
    font-size: 1.25rem;
}

.btn-success {
    background-color: #28a745;
    padding: 0.75rem 2rem;
    font-size: 1.1rem;
    border-radius: 50px;
    transition: transform 0.3s ease;
}

.btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.illustration img {
    filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2));
}
</style>