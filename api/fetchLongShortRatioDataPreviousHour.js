const axios = require('axios');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));




const { API_KEY } = require('../config');

const fetchLongShortRatioDataPreviousHour = async (symbol, retries = 3) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const nowTimestamp = Math.floor(now.getTime() / 1000); // Unix timestamp hiện tại
    const from = (Math.floor(nowTimestamp / 3600) - 1) * 3600; // Làm tròn về đầu giờ trước đó 
    const to = from; // Thời gian hiện tại



    // console.log("📦 from:Long", from, "| to:", to);

    const url = "https://api.coinalyze.net/v1/long-short-ratio-history";

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await axios.get(url, {
                params: { symbols: symbol, interval: "1hour", from, to, api_key: API_KEY }
            });

            const item = response.data.find(entry => entry.symbol === symbol);
            const latest = item?.history?.at(-1);
            if (!latest) return null;

            const { t, r, l, s } = latest;
            return { timestamp: t, ratio: r, longRatio: l, shortRatio: s };

        } catch (err) {
            if (err.response?.status === 429) {
                console.warn(`❌ Lỗi fetchLongShortRatioData (429): Đợi 30s rồi thử lại (${attempt + 1}/${retries})...`);
                await sleep(30000); // Đợi 30 giây
            } else {
                console.error(`❌ Lỗi fetchLongShortRatioData: ${err.message}`);
                return null;
            }
        }
    }

    console.error(`❌ fetchLongShortRatioData thất bại sau ${retries} lần thử.`);
    return null;
};

module.exports = fetchLongShortRatioDataPreviousHour;
