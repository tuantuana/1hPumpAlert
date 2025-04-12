const axios = require('axios');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const { API_KEY } = require('../config'); // Bạn nên lưu API key ở đây cho tiện quản lý

const fetchPredictedFundingRate = async (symbol, retries = 3) => {
    const now = new Date();
    const nowTimestamp = Math.floor(now.getTime() / 1000);
    const from = Math.floor(nowTimestamp / 3600) * 3600;
    const to = from;

    const url = "https://api.coinalyze.net/v1/predicted-funding-rate";

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await axios.get(url, {
                params: {
                    symbols: symbol,
                    interval: "1hour",
                    from,
                    to,
                    api_key: API_KEY
                }
            });

            const item = response.data.find(entry => entry.symbol === symbol);
            if (!item) return null;

            const { value, update } = item;
            return {
                symbol,
                value,
                update
            };

        } catch (err) {
            if (err.response?.status === 429) {
                console.warn(`❌ Lỗi fetchPredictedFundingRate (429): Đợi 30s rồi thử lại (${attempt + 1}/${retries})...`);
                await sleep(30000);
            } else {
                console.error(`❌ Lỗi fetchPredictedFundingRate: ${err.message}`);
                return null;
            }
        }
    }

    console.error(`❌ fetchPredictedFundingRate thất bại sau ${retries} lần thử.`);
    return null;
};

module.exports = fetchPredictedFundingRate;
