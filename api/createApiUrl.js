// createApiUrl.js
const dayjs = require('dayjs');
const now = new Date(); // Lấy thời gian hiện tại
const nowTimestamp = Math.floor(now.getTime() / 1000); // Unix timestamp hiện tại
const from = Math.floor(nowTimestamp / 3600) * 3600; // Làm tròn về đầu giờ
const to = from; // Thời gian hiện tại




function createApiUrl(symbols) {
    const symbolParam = symbols.join(',');
    return `https://api.coinalyze.net/v1/ohlcv-history?symbols=${symbolParam}&interval=1hour&from=${from}&to=${to}&api_key=${API_KEY}`;
}

module.exports = {
    createApiUrl,

};