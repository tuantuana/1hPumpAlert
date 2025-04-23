

const now = new Date(); // Lấy thời gian hiện tại
const nowTimestamp = Math.floor(now.getTime() / 1000); // Unix timestamp hiện tại
const from = Math.floor(nowTimestamp / 3600) * 3600; // Làm tròn về đầu giờ
const to = from; // Thời gian hiện tại



module.exports = {
    TELEGRAM_BOT_TOKEN: '7910394851:AAG85N-YL1WpQVkVRGuIrjjCx1Fim4s_ZY0',
    // TELEGRAM_BOT_TOKEN: '7640879888:AAGc6mAoVGNJKGmETLrZq3q3UTQ6QIWTZrE',
    TELEGRAM_CHAT_ID: '5710130520',
    API_KEY: '8f5b4a93-52d8-4b4b-8f7c-4eacf91ac3c9',
    from,
    to
};


