const axios = require('axios');
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_IDS } = require('../config');

const sendToTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    for (const chatId of TELEGRAM_CHAT_IDS) {
        try {
            await axios.post(url, {
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            });

            console.log(`✅ Đã gửi Telegram → ${chatId}`);
        } catch (err) {
            console.error(
                `❌ Lỗi gửi Telegram (${chatId}):`,
                err.response?.data || err.message
            );
        }
    }
};

module.exports = sendToTelegram;
