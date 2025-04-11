// ❌ Đừng import ../index nữa
// const fetchAllData = require('../index'); ← gây lỗi

// ✅ Thay bằng import trực tiếp hàm
const fetchAllData = require('../services/fetchAllData');
const cron = require('node-cron');

module.exports = () => {
    cron.schedule('50 * * * *', () => {
        console.log('⏰ [CRON] Đến phút 47 rồi, đang chạy fetchAllData...');
        fetchAllData();
    });
};
