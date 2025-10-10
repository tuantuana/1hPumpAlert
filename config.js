

const now = new Date(); // Lấy thời gian hiện tại
const nowTimestamp = Math.floor(now.getTime() / 1000); // Unix timestamp hiện tại
const from = Math.floor(nowTimestamp / 3600) * 3600; // Làm tròn về đầu giờ
const to = from; // Thời gian hiện tại



module.exports = {
    TELEGRAM_BOT_TOKEN: '7717549284:AAEpMjq34WtlW6mx67srG1TEU9AbHOsHY5s',
    // TELEGRAM_BOT_TOKEN: '7640879888:AAGG-YwTdCiAjimmnMZnAXDqYeNYmn78OsI',
    TELEGRAM_CHAT_ID: '5710130520',
    API_KEY: '54274687-2fd7-406c-8785-05e986c2f246',
    from,
    to
};


