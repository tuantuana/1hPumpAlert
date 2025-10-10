

const now = new Date(); // Lấy thời gian hiện tại
const nowTimestamp = Math.floor(now.getTime() / 1000); // Unix timestamp hiện tại
const from = Math.floor(nowTimestamp / 3600) * 3600; // Làm tròn về đầu giờ
const to = from; // Thời gian hiện tại



module.exports = {
    TELEGRAM_BOT_TOKEN: '7717549284:AAEpMjq34WtlW6mx67srG1TEU9AbHOsHY5s',
    // TELEGRAM_BOT_TOKEN: '7640879888:AAGG-YwTdCiAjimmnMZnAXDqYeNYmn78OsI',
    TELEGRAM_CHAT_ID: '5710130520',
    API_KEY: '8f852b1e8-89e1-43e6-9c5e-67e497be4ee6',
    from,
    to
};


