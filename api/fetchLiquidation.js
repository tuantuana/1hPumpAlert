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
