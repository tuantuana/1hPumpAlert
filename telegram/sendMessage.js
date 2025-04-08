const axios = require('axios');
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = require('../config');

const sendToTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
        await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        console.log("✅ Đã gửi Telegram");
        console.log(`Message sent to chat ID: ${chat_id}`);

    } catch (err) {
        console.error("❌ Lỗi gửi Telegram:", err.response?.data || err.message);
    }
};

module.exports = sendToTelegram;
