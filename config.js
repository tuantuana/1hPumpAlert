
const now = new Date(); // Lấy thời gian hiện tại
const nowTimestamp = Math.floor(now.getTime() / 1000); // Unix timestamp hiện tại
const from = Math.floor(nowTimestamp / 3600) * 3600; // Làm tròn về đầu giờ
const to = from; // Thời gian hiện tại

// const from = 1744034400
// const to = 1744034400; // Thời gian hiện tại

module.exports = {
    TELEGRAM_BOT_TOKEN: '7910394851:AAG85N-YL1WpQVkVRGuIrjjCx1Fim4s_ZY0',
    TELEGRAM_CHAT_ID: '5710130520',
    API_KEY: '8f5b4a93-52d8-4b4b-8f7c-4eacf91ac3c9',
    from,
    to
};


