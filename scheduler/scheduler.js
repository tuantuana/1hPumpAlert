// scheduler/scheduler.js

const cron = require('node-cron');
const fetchAllData = require('../index'); // ← Đường dẫn đúng đến file chứa fetchAllData

module.exports = () => {
    cron.schedule('47 * * * *', () => {
        console.log('⏰ [CRON] Đến phút 47 rồi, đang chạy fetchAllData...');
        fetchAllData();
    });

    // Thêm các cron khác ở đây nếu cần
};
