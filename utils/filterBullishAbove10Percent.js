const filterBullishAbove10Percent = (data) => {
    const filtered = {};
    for (const symbol in data) {
        const candles = data[symbol];
        const valid = candles.filter(c => {
            const percentChange = ((c.c - c.o) / c.o) * 100;
            const buyVolume = c.bv;
            const sellVolume = c.v - c.bv;
            const buyVsSellPercent = ((buyVolume - sellVolume) / sellVolume) * 100;
            return percentChange >= 5 && buyVsSellPercent >= 10;
        });
        if (valid.length > 0) {
            filtered[symbol] = valid;
        }
    }
    return filtered;
};

module.exports =  filterBullishAbove10Percent ;
