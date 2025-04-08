const { from, to, API_KEY } = require('../config');

const fetchLiquidation = async (symbol) => {
    const url = `https://api.coinalyze.net/v1/liquidation-history?symbols=${symbol}_PERP.A&interval=1hour&from=${from}&to=${to}&api_key=${API_KEY}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const history = data?.[0]?.history?.[0];
        return {
            long: history?.l ?? 0,
            short: history?.s ?? 0
        };
    } catch (err) {
        console.error(`❌ Lỗi fetchLiquidation: ${err.message}`);
        return { long: 0, short: 0 };
    }
};

module.exports = fetchLiquidation;
//
// const axios = require('axios');
// const { from, to, API_KEY } = require('../config');
// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
//
// const fetchLiquidation = async (symbol, retries = 3) => {
//     const url = "https://api.coinalyze.net/v1/liquidation-history";
//
//     for (let attempt = 0; attempt < retries; attempt++) {
//         try {
//             const response = await axios.get(url, {
//                 params: {
//                     symbols: `${symbol}_PERP.A`,
//                     interval: "1hour",
//                     from,
//                     to,
//                     api_key: API_KEY
//                 }
//             });
//
//             const item = response.data?.[0];
//             const latest = item?.history?.at(-1);
//
//             if (!latest) {
//                 console.warn(`⚠️ Không có dữ liệu liquidation cho ${symbol}`);
//                 return { long: 0, short: 0 };
//             }
//
//             const { l: long, s: short } = latest;
//             return { long, short };
//
//         } catch (err) {
//             if (err.response?.status === 429) {
//                 console.warn(`❌ Lỗi fetchLiquidation (${symbol}) [429]: Đợi 30s rồi thử lại (${attempt + 1}/${retries})...`);
//                 await sleep(30000); // Đợi 30 giây nếu bị giới hạn
//             } else {
//                 console.error(`❌ Lỗi fetchLiquidation (${symbol}): ${err.message}`);
//                 await sleep(500); // Delay nhẹ khi gặp lỗi khác
//             }
//         }
//     }
//
//     console.error(`❌ fetchLiquidation (${symbol}) thất bại sau ${retries} lần thử.`);
//     return { long: 0, short: 0 };
// };
//
// module.exports = fetchLiquidation;
