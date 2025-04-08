// createApiUrl.js
const dayjs = require('dayjs');
const { API_KEY, from, to } = require('../config');




function createApiUrl(symbols) {
    const symbolParam = symbols.join(',');
    return `https://api.coinalyze.net/v1/ohlcv-history?symbols=${symbolParam}&interval=1hour&from=${from}&to=${to}&api_key=${API_KEY}`;
}

module.exports = {
    createApiUrl,

};