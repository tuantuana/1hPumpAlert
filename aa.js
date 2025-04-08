








const axios = require('axios');
const cron = require('node-cron');

// ==== CẤU HÌNH TELEGRAM ====
const TELEGRAM_BOT_TOKEN = '7858381329:AAHVREoUQPaSgfO2tQyEzbo2fuuEt8I-hWc';
const TELEGRAM_CHAT_ID = '5710130520';
const API_KEY = "8f72096a-b39b-4913-8812-39b89240d2fd";  // Thay API Key của bạn


// ==== CONFIG COINALYZE ====
const now = new Date(); // Lấy thời gian hiện tại
const nowTimestamp = Math.floor(now.getTime() / 1000); // Unix timestamp hiện tại
const from = Math.floor(nowTimestamp / 3600) * 3600; // Làm tròn về đầu giờ
const to = from; // Thời gian hiện tại




// ==== SYMBOL GROUPS ====
const symbolGroups = [
    // ['BTCUSDT_PERP.A,ETHUSDT_PERP.A,NEARUSDT_PERP.A,APTUSDT_PERP.A,1000PEPEUSDT_PERP.A'],


    // ['BTCUSDT_PERP.A,ETHUSDT_PERP.A,XRPUSDT_PERP.A,BNBUSDT_PERP.A,SOLUSDT_PERP.A,USDCUSDT_PERP.A,DOGEUSDT_PERP.A,ADAUSDT_PERP.A,TRXUSDT_PERP.A,LINKUSDT_PERP.A,AVAXUSDT_PERP.A,XLMUSDT_PERP.A,TONUSDT_PERP.A,HBARUSDT_PERP.A,1000SHIBUSDT_PERP.A,SUIUSDT_PERP.A,DOTUSDT_PERP.A,LTCUSDT_PERP.A,BCHUSDT_PERP.A,OMUSDT_PERP.A'],
    // ['UNIUSDT_PERP.A,XMRUSDT_PERP.A,NEARUSDT_PERP.A,APTUSDT_PERP.A,1000PEPEUSDT_PERP.A,FETUSDT_PERP.A,ICPUSDT_PERP.A,ONDOUSDT_PERP.A,AAVEUSDT_PERP.A,ETCUSDT_PERP.A,POLUSDT_PERP.A,TRUMPUSDT_PERP.A,VETUSDT_PERP.A,TAOUSDT_PERP.A,ENAUSDT_PERP.A,RENDERUSDT_PERP.A,TIAUSDT_PERP.A,FILUSDT_PERP.A,KASUSDT_PERP.A,ATOMUSDT_PERP.A'],
    // ['ARBUSDT_PERP.A,ALGOUSDT_PERP.A,SUSDT_PERP.A,IPUSDT_PERP.A,JUPUSDT_PERP.A,DEXEUSDT_PERP.A,OPUSDT_PERP.A,MOVEUSDT_PERP.A,IMXUSDT_PERP.A,WLDUSDT_PERP.A,1000BONKUSDT_PERP.A,MKRUSDT_PERP.A,INJUSDT_PERP.A,STXUSDT_PERP.A,GRTUSDT_PERP.A,SEIUSDT_PERP.A,THETAUSDT_PERP.A,QNTUSDT_PERP.A,LDOUSDT_PERP.A,FORMUSDT_PERP.A'],
    ['EOSUSDT_PERP.A,BERAUSDT_PERP.A,GALAUSDT_PERP.A,CAKEUSDT_PERP.A,SANDUSDT_PERP.A,XTZUSDT_PERP.A,JTOUSDT_PERP.A,IOTAUSDT_PERP.A,BSVUSDT_PERP.A,FLOWUSDT_PERP.A,CRVUSDT_PERP.A,1000FLOKIUSDT_PERP.A,KAIAUSDT_PERP.A,SUPERUSDT_PERP.A,ENSUSDT_PERP.A,PYTHUSDT_PERP.A,JASMYUSDT_PERP.A,1000SATSUSDT_PERP.A,SPXUSDT_PERP.A,ZECUSDT_PERP.A'],
    ['AXSUSDT_PERP.A,NEOUSDT_PERP.A,FARTCOINUSDT_PERP.A,EGLDUSDT_PERP.A,MANAUSDT_PERP.A,WIFUSDT_PERP.A,KAVAUSDT_PERP.A,VIRTUALUSDT_PERP.A,ARUSDT_PERP.A,RONINUSDT_PERP.A,STRKUSDT_PERP.A,PENDLEUSDT_PERP.A,CFXUSDT_PERP.A,CHZUSDT_PERP.A,1000XECUSDT_PERP.A,BEAMXUSDT_PERP.A,RUNEUSDT_PERP.A,PENGUUSDT_PERP.A,DYDXUSDT_PERP.A,RSRUSDT_PERP.A'],
    // ['AEROUSDT_PERP.A,APEUSDT_PERP.A,AXLUSDT_PERP.A,COMPUSDT_PERP.A,TWTUSDT_PERP.A,PLUMEUSDT_PERP.A,1MBABYDOGEUSDT_PERP.A,GRASSUSDT_PERP.A,BRETTUSDT_PERP.A,MELANIAUSDT_PERP.A,1000LUNCUSDT_PERP.A,AKTUSDT_PERP.A,MINAUSDT_PERP.A,MORPHOUSDT_PERP.A,KAITOUSDT_PERP.A,ZROUSDT_PERP.A,SNXUSDT_PERP.A,1INCHUSDT_PERP.A,KSMUSDT_PERP.A,WUSDT_PERP.A'],
    // ['ZKUSDT_PERP.A,DASHUSDT_PERP.A,GLMUSDT_PERP.A,LAYERUSDT_PERP.A,EIGENUSDT_PERP.A,NOTUSDT_PERP.A,BLURUSDT_PERP.A,SFPUSDT_PERP.A,ASTRUSDT_PERP.A,ZILUSDT_PERP.A,CKBUSDT_PERP.A,IDUSDT_PERP.A,ROSEUSDT_PERP.A,POPCATUSDT_PERP.A,SAFEUSDT_PERP.A,ZRXUSDT_PERP.A,ACHUSDT_PERP.A,BATUSDT_PERP.A,QTUMUSDT_PERP.A,LPTUSDT_PERP.A'],
    // ['AI16ZUSDT_PERP.A,VTHOUSDT_PERP.A,ZETAUSDT_PERP.A,CELOUSDT_PERP.A,MASKUSDT_PERP.A,1000000MOGUSDT_PERP.A,VANAUSDT_PERP.A,ORDIUSDT_PERP.A,PNUTUSDT_PERP.A,MOCAUSDT_PERP.A,HOTUSDT_PERP.A,MEWUSDT_PERP.A,ANKRUSDT_PERP.A,GASUSDT_PERP.A,RVNUSDT_PERP.A,FXSUSDT_PERP.A,SUSHIUSDT_PERP.A,WOOUSDT_PERP.A,ACTUSDT_PERP.A,ONEUSDT_PERP.A'],
    // ['DRIFTUSDT_PERP.A,YFIUSDT_PERP.A,ENJUSDT_PERP.A,REDUSDT_PERP.A,IOTXUSDT_PERP.A,TUSDT_PERP.A,TURBOUSDT_PERP.A,MEUSDT_PERP.A,ETHWUSDT_PERP.A,SKLUSDT_PERP.A,UXLINKUSDT_PERP.A,SUNUSDT_PERP.A,KDAUSDT_PERP.A,ETHFIUSDT_PERP.A,ZENUSDT_PERP.A,LRCUSDT_PERP.A,LUNA2USDT_PERP.A,GUSDT_PERP.A,GMTUSDT_PERP.A,COTIUSDT_PERP.A'],
    // ['ONTUSDT_PERP.A,MUBARAKUSDT_PERP.A,GMXUSDT_PERP.A,ARKMUSDT_PERP.A,POLYXUSDT_PERP.A,SXPUSDT_PERP.A,BANDUSDT_PERP.A,HMSTRUSDT_PERP.A,IOUSDT_PERP.A,BIOUSDT_PERP.A,ORCAUSDT_PERP.A,COWUSDT_PERP.A,B3USDT_PERP.A,HIVEUSDT_PERP.A,AUCTIONUSDT_PERP.A,BICOUSDT_PERP.A,STORJUSDT_PERP.A,NEIROUSDT_PERP.A,UMAUSDT_PERP.A,ACXUSDT_PERP.A'],
    // ['NILUSDT_PERP.A,AEVOUSDT_PERP.A,METISUSDT_PERP.A,MANTAUSDT_PERP.A,RPLUSDT_PERP.A,ANIMEUSDT_PERP.A,ICXUSDT_PERP.A,FLUXUSDT_PERP.A,BOMEUSDT_PERP.A,PIXELUSDT_PERP.A,PROMUSDT_PERP.A,USUALUSDT_PERP.A,MEMEUSDT_PERP.A,WAXPUSDT_PERP.A,AIXBTUSDT_PERP.A,SPELLUSDT_PERP.A,LSKUSDT_PERP.A,XVSUSDT_PERP.A,BIGTIMEUSDT_PERP.A'],
    // ['API3USDT_PERP.A,RLCUSDT_PERP.A,SONICUSDT_PERP.A,SSVUSDT_PERP.A,IOSTUSDT_PERP.A,POWRUSDT_PERP.A,PHAUSDT_PERP.A,PEOPLEUSDT_PERP.A,DYMUSDT_PERP.A,BALUSDT_PERP.A,CHRUSDT_PERP.A,YGGUSDT_PERP.A,ONGUSDT_PERP.A,CETUSUSDT_PERP.A,XVGUSDT_PERP.A,DOGSUSDT_PERP.A,ILVUSDT_PERP.A,BANANAUSDT_PERP.A,PARTIUSDT_PERP.A,VVVUSDT_PERP.A'],
    // ['CELRUSDT_PERP.A,TRBUSDT_PERP.A,CGPTUSDT_PERP.A,DENTUSDT_PERP.A,JOEUSDT_PERP.A,KMNOUSDT_PERP.A,AGLDUSDT_PERP.A,DFUSDT_PERP.A,ALCHUSDT_PERP.A,BBUSDT_PERP.A,XAIUSDT_PERP.A,LQTYUSDT_PERP.A,TNSRUSDT_PERP.A,SHELLUSDT_PERP.A,USTCUSDT_PERP.A,KNCUSDT_PERP.A,OXTUSDT_PERP.A,NMRUSDT_PERP.A,SCRUSDT_PERP.A,STEEMUSDT_PERP.A'],
    // ['C98USDT_PERP.A,SCRTUSDT_PERP.A,BANANAS31USDT_PERP.A,VANRYUSDT_PERP.A,MTLUSDT_PERP.A,ARKUSDT_PERP.A,HIFIUSDT_PERP.A,CTSIUSDT_PERP.A,GOATUSDT_PERP.A,PONKEUSDT_PERP.A,EDUUSDT_PERP.A,MOVRUSDT_PERP.A,COOKIEUSDT_PERP.A,BELUSDT_PERP.A,TSTUSDT_PERP.A,CYBERUSDT_PERP.A,BANUSDT_PERP.A,RAREUSDT_PERP.A,LUMIAUSDT_PERP.A,GPSUSDT_PERP.A'],
    // ['DODOXUSDT_PERP.A,AIUSDT_PERP.A,DUSKUSDT_PERP.A,OMNIUSDT_PERP.A,BNTUSDT_PERP.A,ALICEUSDT_PERP.A,ARCUSDT_PERP.A,SOLVUSDT_PERP.A,TRUUSDT_PERP.A,NTRNUSDT_PERP.A,PORTALUSDT_PERP.A,DIAUSDT_PERP.A,DEGENUSDT_PERP.A,HIGHUSDT_PERP.A,OGNUSDT_PERP.A,RIFUSDT_PERP.A,CATIUSDT_PERP.A,STGUSDT_PERP.A,GRIFFAINUSDT_PERP.A,SAGAUSDT_PERP.A'],
    // ['ARPAUSDT_PERP.A,BAKEUSDT_PERP.A,MOODENGUSDT_PERP.A,HIPPOUSDT_PERP.A,HFTUSDT_PERP.A,MAGICUSDT_PERP.A,MAVUSDT_PERP.A,ACEUSDT_PERP.A,SIRENUSDT_PERP.A,SYSUSDT_PERP.A,ATAUSDT_PERP.A,DEGOUSDT_PERP.A,DUSDT_PERP.A,BMTUSDT_PERP.A,NKNUSDT_PERP.A,AVAAIUSDT_PERP.A,SWARMSUSDT_PERP.A,NFPUSDT_PERP.A,ALPHAUSDT_PERP.A,THEUSDT_PERP.A'],
    // ['MBOXUSDT_PERP.A,LISTAUSDT_PERP.A,REZUSDT_PERP.A,ZEREBROUSDT_PERP.A,TLMUSDT_PERP.A,SYNUSDT_PERP.A,GTCUSDT_PERP.A,LEVERUSDT_PERP.A,FIDAUSDT_PERP.A,HOOKUSDT_PERP.A,BADGERUSDT_PERP.A,PHBUSDT_PERP.A,SLERFUSDT_PERP.A,SWELLUSDT_PERP.A,HEIUSDT_PERP.A,RDNTUSDT_PERP.A,CHILLGUYUSDT_PERP.A,BRUSDT_PERP.A,1000RATSUSDT_PERP.A,VICUSDT_PERP.A'],
    // ['EPICUSDT_PERP.A,GHSTUSDT_PERP.A,REIUSDT_PERP.A,SANTOSUSDT_PERP.A,VINEUSDT_PERP.A,NEIROETHUSDT_PERP.A,MAVIAUSDT_PERP.A,PERPUSDT_PERP.A,LOKAUSDT_PERP.A,FLMUSDT_PERP.A,AVAUSDT_PERP.A,KOMAUSDT_PERP.A,QUICKUSDT_PERP.A,COSUSDT_PERP.A,BSWUSDT_PERP.A,JELLYJELLYUSDT_PERP.A,CHESSUSDT_PERP.A,VOXELUSDT_PERP.A,MYROUSDT_PERP.A,PIPPINUSDT_PERP.A'],
    // ['TOKENUSDT_PERP.A,TUTUSDT_PERP.A,NULSUSDT_PERP.A,FIOUSDT_PERP.A,BIDUSDT_PERP.A,TROYUSDT_PERP.A,VIDTUSDT_PERP.A,ALPACAUSDT_PERP.A,RAYSOLUSDT_PERP.A,1000CHEEMSUSDT_PERP.A,BROCCOLIF3BUSDT_PERP.A,DEFIUSDT_PERP.A,VELODROMEUSDT_PERP.A,1000XUSDT_PERP.A,1000WHYUSDT_PERP.A,1000CATUSDT_PERP.A,BROCCOLI714USDT_PERP.A,BTCDOMUSDT_PERP.A'],
    // ['FUNUSDT_PERP.A,MLNUSDT_PERP.A,GUNUSDT_PERP.A,ATHUSDT_PERP.A'],
];

const fetchLongShortRatioData = async (symbol) => {
    const now = new Date(); // Lấy thời gian hiện tại
    const nowTimestamp = Math.floor(now.getTime() / 1000); // Unix timestamp hiện tại
    const from = Math.floor(nowTimestamp / 3600) * 3600; // Làm tròn về đầu giờ
    const to = nowTimestamp; // Thời gian hiện tại

    // console.log("📦 fetchLongShortRatioData → nowTimestamp:", nowTimestamp);
    // console.log("📦 fetchLongShortRatioData → roundedFrom:", from);

    try {
        const response = await axios.get("https://api.coinalyze.net/v1/long-short-ratio-history", {
            params: {
                symbols: symbol,
                interval: "1hour",
                from,
                to,
                api_key: API_KEY
            }
        });

        // Kiểm tra và lấy dữ liệu từ API trả về
        const item = response.data.find(entry => entry.symbol === symbol);
        if (!item || !item.history || item.history.length === 0) {
            console.warn(`⚠️ Dữ liệu Long-Short Ratio rỗng hoặc không tồn tại cho ${symbol}`);
            return null;
        }

        const latest = item.history.at(-1);  // Lấy entry mới nhất
        const { t, r, l, s } = latest;  // r: tỷ lệ, l: tỷ lệ long, s: tỷ lệ short
        return {
            timestamp: t,
            ratio: r,
            longRatio: l,
            shortRatio: s
        };
    } catch (error) {
        console.error(`❌ Lỗi lấy Long-Short Ratio cho ${symbol}:`, error.message);
        return null;
    }
};


const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

// Hàm gọi API liquidation
async function fetchLiquidation(symbol) {
    // const to = Math.floor(Date.now() / 1000); // thời điểm hiện tại
    // const from = to - 3600; // 1 giờ trước

    const url = `https://api.coinalyze.net/v1/liquidation-history?symbols=${symbol}_PERP.A&interval=1hour&from=${from}&to=${to}&api_key=44eddd64-d23f-4720-8337-17465126b6e1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const history = data?.[0]?.history?.[0];
        const long = history?.l ?? 0;
        const short = history?.s ?? 0;

        return { long, short };
    } catch (error) {
        console.error(`Error fetching liquidation for ${symbol}:`, error);
        return { long: 0, short: 0 };
    }
}










// ==== CREATE URL ====
function createApiUrl(symbols) {
    const symbolParam = symbols.join(',');
    return `https://api.coinalyze.net/v1/ohlcv-history?symbols=${symbolParam}&interval=1hour&from=${from}&to=${to}&api_key=${API_KEY}`;
}

// ==== ESCAPE HTML ====


// ==== SEND TO TELEGRAM ====
async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        console.log('✅ Đã gửi Telegram');
    } catch (error) {
        console.error('❌ Lỗi gửi Telegram:', error.response?.data || error.message);
    }
}

// ==== FILTER CANDLE TĂNG TRÊN 10% ====
function filterBullishAbove10Percent(data) {
    const filtered = {};
    for (const symbol in data) {
        const candles = data[symbol];
        const valid = candles.filter(c => {
            const percentChange = ((c.c - c.o) / c.o) * 100;
            const buyVolume = c.bv;
            const sellVolume = c.v - c.bv;
            const buyVsSellPercent = ((buyVolume - sellVolume) / sellVolume) * 100;

            return percentChange >= 0 && buyVsSellPercent >= 0;
        });
        if (valid.length > 0) {
            filtered[symbol] = valid;
        }
    }
    return filtered;
}




async function formatMessagesPerSymbol(data) {
    const messages = [];

    for (const symbol in data) {
        const candles = data[symbol];
        const latest = candles.at(-1);
        const prev = candles.length >= 2 ? candles.at(-2) : null;
        const displaySymbol = escapeHtml(symbol.replace('_PERP.A', ''));

        // ===== PHẦN 1: THÔNG TIN GIÁ VÀ VOLUME =====
        const trendEmoji = prev
            ? (latest.c > prev.c ? '📈' : latest.c < prev.c ? '📉' : '🔸')
            : '🕒';

        const percentChange1 = ((latest.c - latest.o) / latest.o) * 100;
        const buyVolume = latest.bv;
        const sellVolume = latest.v - latest.bv;
        const buyMorePercent = ((buyVolume - sellVolume) / sellVolume) * 100;
        const trend = buyMorePercent > 0 ? "🔺" : "🔻";

        const pricePart = `
${trendEmoji} <b>${displaySymbol}</b>

🔸 <b>Price:</b> ${latest.c}
🔸 <b>PriceChange:</b> ${percentChange1.toFixed(1)}%

📈 <b>Buy:</b> ${buyVolume.toLocaleString()} || 📉 <b>Sell:</b> ${sellVolume.toLocaleString()}
📊 <b>Volume:</b> ${latest.v.toLocaleString()} || ${trend} ${buyMorePercent.toFixed(1)}%
📊 <b>Trades:</b> ${latest.tx} | 🟢 <b>Buy Trades:</b> ${latest.btx}`.trim();

        // ===== PHẦN 2: LIQUIDATION =====
        const { long = 0, short = 0 } = await fetchLiquidation(displaySymbol);
        const liquidationPart = `
💥 <b>Liquidation</b>
🟩 Long: ${long.toLocaleString()} | 🟥 Short: ${short.toLocaleString()}`.trim();

        // ===== PHẦN 3: LONG SHORT RATIO =====
        const ratioData = await fetchLongShortRatioData(symbol);
        const ratio = ratioData?.ratio?.toFixed(2) || "N/A";
        const longRatio = ratioData?.longRatio?.toFixed(2) || "N/A";
        const shortRatio = ratioData?.shortRatio?.toFixed(2) || "N/A";

        const lsrPart = `
📊 <b>LS Ratio:</b> ${ratio}
🟩 Long: ${longRatio} | 🟥 Short: ${shortRatio}`.trim();

        // ===== GỘP TOÀN BỘ PHẦN LẠI =====
        const finalMessage = [pricePart, liquidationPart, lsrPart].join('\n\n');

        messages.push({
            symbol: displaySymbol,
            message: finalMessage
        });
    }

    return messages;
}



// ==== WAIT ====
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==== MAIN FUNCTION ====
async function fetchAllData() {
    const allData = {};
    console.log("Đang chạy cron lúc:", new Date().toLocaleString());

    for (let i = 0; i < symbolGroups.length; i += 2) {
        const group1 = symbolGroups[i];
        const group2 = symbolGroups[i + 1];

        const url1 = createApiUrl(group1);
        const url2 = group2 ? createApiUrl(group2) : null;

        console.log(`📡 Đang gọi nhóm ${i + 1}: ${url1}`);
        if (url2) console.log(`📡 Đang gọi nhóm ${i + 2}: ${url2}`);

        try {
            const promises = [axios.get(url1)];

            if (url2) promises.push(axios.get(url2));

            const responses = await Promise.all(promises);

            responses.forEach((res, idx) => {
                const data = res.data;
                data.forEach(entry => {
                    allData[entry.symbol] = entry.history;
                });
                console.log(`✅ Nhóm ${i + 1 + idx} lấy dữ liệu xong.`);
            });

        } catch (err) {
            console.error(`❌ Lỗi khi gọi nhóm ${i + 1} hoặc ${i + 2}:`, err.message);
        }

        if (i + 2 < symbolGroups.length) {
            console.log('⏳ Chờ 1 phút...\n');
            await delay(60 * 1000);
        }
    }


    const filtered = filterBullishAbove10Percent(allData);
    console.log("📦 Dữ liệu sau khi lọc:", filtered);
    console.log("📦 fromc:", from);
    console.log("📦 to:", to);

    const messages = await formatMessagesPerSymbol(filtered);

    for (const { symbol, message } of messages) {
        console.log(`📨 Gửi ${symbol} lên Telegram...`);
        await sendToTelegram(message);
        await delay(1000); // tránh spam
    }
}
fetchAllData();

// ==== CHẠY ====
// async function mainLoop() {
//     while (true) {
//         console.log("🚀 Bắt đầu fetch data...");
//         await fetchAllData();
//         console.log("🕒 Đợi 5 phút để chạy lại...\n");
//         await delay(5 * 60 * 1000); // đợi 5 phút
//     }
// }
//
// mainLoop()

// cron.schedule('11 * * * *', () => {
//     console.log('Đến phút 30 rồi, đang chạy công việc...');
//     // Gọi hàm bạn muốn chạy mỗi 30 phút ở đây, ví dụ:
//     fetchAllData();
// });


cron.schedule('30 * * * *', async () => {
    const messages = await formatMessagesPerSymbol(data);

    for (const { message } of messages) {
        await sendToTelegram(message);
    }
});



//
//
//
//
//
//
//
//
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=BTCUSDT_PERP.A,ETHUSDT_PERP.A,XRPUSDT_PERP.A,BNBUSDT_PERP.A,SOLUSDT_PERP.A,USDCUSDT_PERP.A,DOGEUSDT_PERP.A,ADAUSDT_PERP.A,TRXUSDT_PERP.A,LINKUSDT_PERP.A,AVAXUSDT_PERP.A,XLMUSDT_PERP.A,TONUSDT_PERP.A,HBARUSDT_PERP.A,1000SHIBUSDT_PERP.A,SUIUSDT_PERP.A,DOTUSDT_PERP.A,LTCUSDT_PERP.A,BCHUSDT_PERP.A,OMUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=UNIUSDT_PERP.A,XMRUSDT_PERP.A,NEARUSDT_PERP.A,APTUSDT_PERP.A,1000PEPEUSDT_PERP.A,FETUSDT_PERP.A,ICPUSDT_PERP.A,ONDOUSDT_PERP.A,AAVEUSDT_PERP.A,ETCUSDT_PERP.A,POLUSDT_PERP.A,TRUMPUSDT_PERP.A,VETUSDT_PERP.A,TAOUSDT_PERP.A,ENAUSDT_PERP.A,RENDERUSDT_PERP.A,TIAUSDT_PERP.A,FILUSDT_PERP.A,KASUSDT_PERP.A,ATOMUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=ARBUSDT_PERP.A,ALGOUSDT_PERP.A,SUSDT_PERP.A,IPUSDT_PERP.A,JUPUSDT_PERP.A,DEXEUSDT_PERP.A,OPUSDT_PERP.A,MOVEUSDT_PERP.A,IMXUSDT_PERP.A,WLDUSDT_PERP.A,1000BONKUSDT_PERP.A,MKRUSDT_PERP.A,INJUSDT_PERP.A,STXUSDT_PERP.A,GRTUSDT_PERP.A,SEIUSDT_PERP.A,THETAUSDT_PERP.A,QNTUSDT_PERP.A,LDOUSDT_PERP.A,FORMUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=EOSUSDT_PERP.A,BERAUSDT_PERP.A,GALAUSDT_PERP.A,CAKEUSDT_PERP.A,SANDUSDT_PERP.A,XTZUSDT_PERP.A,JTOUSDT_PERP.A,IOTAUSDT_PERP.A,BSVUSDT_PERP.A,FLOWUSDT_PERP.A,CRVUSDT_PERP.A,1000FLOKIUSDT_PERP.A,KAIAUSDT_PERP.A,SUPERUSDT_PERP.A,ENSUSDT_PERP.A,PYTHUSDT_PERP.A,JASMYUSDT_PERP.A,1000SATSUSDT_PERP.A,SPXUSDT_PERP.A,ZECUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=AXSUSDT_PERP.A,NEOUSDT_PERP.A,FARTCOINUSDT_PERP.A,EGLDUSDT_PERP.A,MANAUSDT_PERP.A,WIFUSDT_PERP.A,KAVAUSDT_PERP.A,VIRTUALUSDT_PERP.A,ARUSDT_PERP.A,RONINUSDT_PERP.A,STRKUSDT_PERP.A,PENDLEUSDT_PERP.A,CFXUSDT_PERP.A,CHZUSDT_PERP.A,1000XECUSDT_PERP.A,BEAMXUSDT_PERP.A,RUNEUSDT_PERP.A,PENGUUSDT_PERP.A,DYDXUSDT_PERP.A,RSRUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=AEROUSDT_PERP.A,APEUSDT_PERP.A,AXLUSDT_PERP.A,COMPUSDT_PERP.A,TWTUSDT_PERP.A,PLUMEUSDT_PERP.A,1MBABYDOGEUSDT_PERP.A,GRASSUSDT_PERP.A,BRETTUSDT_PERP.A,MELANIAUSDT_PERP.A,1000LUNCUSDT_PERP.A,AKTUSDT_PERP.A,MINAUSDT_PERP.A,MORPHOUSDT_PERP.A,KAITOUSDT_PERP.A,ZROUSDT_PERP.A,SNXUSDT_PERP.A,1INCHUSDT_PERP.A,KSMUSDT_PERP.A,WUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=ZKUSDT_PERP.A,DASHUSDT_PERP.A,GLMUSDT_PERP.A,LAYERUSDT_PERP.A,EIGENUSDT_PERP.A,NOTUSDT_PERP.A,BLURUSDT_PERP.A,SFPUSDT_PERP.A,ASTRUSDT_PERP.A,ZILUSDT_PERP.A,CKBUSDT_PERP.A,IDUSDT_PERP.A,ROSEUSDT_PERP.A,POPCATUSDT_PERP.A,SAFEUSDT_PERP.A,ZRXUSDT_PERP.A,ACHUSDT_PERP.A,BATUSDT_PERP.A,QTUMUSDT_PERP.A,LPTUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=AI16ZUSDT_PERP.A,VTHOUSDT_PERP.A,ZETAUSDT_PERP.A,CELOUSDT_PERP.A,MASKUSDT_PERP.A,1000000MOGUSDT_PERP.A,VANAUSDT_PERP.A,ORDIUSDT_PERP.A,PNUTUSDT_PERP.A,MOCAUSDT_PERP.A,HOTUSDT_PERP.A,MEWUSDT_PERP.A,ANKRUSDT_PERP.A,GASUSDT_PERP.A,RVNUSDT_PERP.A,FXSUSDT_PERP.A,SUSHIUSDT_PERP.A,WOOUSDT_PERP.A,ACTUSDT_PERP.A,ONEUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=DRIFTUSDT_PERP.A,YFIUSDT_PERP.A,ENJUSDT_PERP.A,REDUSDT_PERP.A,IOTXUSDT_PERP.A,TUSDT_PERP.A,TURBOUSDT_PERP.A,MEUSDT_PERP.A,ETHWUSDT_PERP.A,SKLUSDT_PERP.A,UXLINKUSDT_PERP.A,SUNUSDT_PERP.A,KDAUSDT_PERP.A,ETHFIUSDT_PERP.A,ZENUSDT_PERP.A,LRCUSDT_PERP.A,LUNA2USDT_PERP.A,GUSDT_PERP.A,GMTUSDT_PERP.A,COTIUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=ONTUSDT_PERP.A,MUBARAKUSDT_PERP.A,GMXUSDT_PERP.A,ARKMUSDT_PERP.A,POLYXUSDT_PERP.A,SXPUSDT_PERP.A,BANDUSDT_PERP.A,HMSTRUSDT_PERP.A,IOUSDT_PERP.A,BIOUSDT_PERP.A,ORCAUSDT_PERP.A,COWUSDT_PERP.A,B3USDT_PERP.A,HIVEUSDT_PERP.A,AUCTIONUSDT_PERP.A,BICOUSDT_PERP.A,STORJUSDT_PERP.A,NEIROUSDT_PERP.A,UMAUSDT_PERP.A,ACXUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=NILUSDT_PERP.A,AEVOUSDT_PERP.A,METISUSDT_PERP.A,MANTAUSDT_PERP.A,RPLUSDT_PERP.A,ANIMEUSDT_PERP.A,ICXUSDT_PERP.A,FLUXUSDT_PERP.A,BOMEUSDT_PERP.A,PIXELUSDT_PERP.A,PROMUSDT_PERP.A,USUALUSDT_PERP.A,MEMEUSDT_PERP.A,WAXPUSDT_PERP.A,AIXBTUSDT_PERP.A,SPELLUSDT_PERP.A,LSKUSDT_PERP.A,XVSUSDT_PERP.A,BIGTIMEUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=API3USDT_PERP.A,RLCUSDT_PERP.A,SONICUSDT_PERP.A,SSVUSDT_PERP.A,IOSTUSDT_PERP.A,POWRUSDT_PERP.A,PHAUSDT_PERP.A,PEOPLEUSDT_PERP.A,DYMUSDT_PERP.A,BALUSDT_PERP.A,CHRUSDT_PERP.A,YGGUSDT_PERP.A,ONGUSDT_PERP.A,CETUSUSDT_PERP.A,XVGUSDT_PERP.A,DOGSUSDT_PERP.A,ILVUSDT_PERP.A,BANANAUSDT_PERP.A,PARTIUSDT_PERP.A,VVVUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=CELRUSDT_PERP.A,TRBUSDT_PERP.A,CGPTUSDT_PERP.A,DENTUSDT_PERP.A,JOEUSDT_PERP.A,KMNOUSDT_PERP.A,AGLDUSDT_PERP.A,DFUSDT_PERP.A,ALCHUSDT_PERP.A,BBUSDT_PERP.A,XAIUSDT_PERP.A,LQTYUSDT_PERP.A,TNSRUSDT_PERP.A,SHELLUSDT_PERP.A,USTCUSDT_PERP.A,KNCUSDT_PERP.A,OXTUSDT_PERP.A,NMRUSDT_PERP.A,SCRUSDT_PERP.A,STEEMUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=C98USDT_PERP.A,SCRTUSDT_PERP.A,BANANAS31USDT_PERP.A,VANRYUSDT_PERP.A,MTLUSDT_PERP.A,ARKUSDT_PERP.A,HIFIUSDT_PERP.A,CTSIUSDT_PERP.A,GOATUSDT_PERP.A,PONKEUSDT_PERP.A,EDUUSDT_PERP.A,MOVRUSDT_PERP.A,COOKIEUSDT_PERP.A,BELUSDT_PERP.A,TSTUSDT_PERP.A,CYBERUSDT_PERP.A,BANUSDT_PERP.A,RAREUSDT_PERP.A,LUMIAUSDT_PERP.A,GPSUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=DODOXUSDT_PERP.A,AIUSDT_PERP.A,DUSKUSDT_PERP.A,OMNIUSDT_PERP.A,BNTUSDT_PERP.A,ALICEUSDT_PERP.A,ARCUSDT_PERP.A,SOLVUSDT_PERP.A,TRUUSDT_PERP.A,NTRNUSDT_PERP.A,PORTALUSDT_PERP.A,DIAUSDT_PERP.A,DEGENUSDT_PERP.A,HIGHUSDT_PERP.A,OGNUSDT_PERP.A,RIFUSDT_PERP.A,CATIUSDT_PERP.A,STGUSDT_PERP.A,GRIFFAINUSDT_PERP.A,SAGAUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=ARPAUSDT_PERP.A,BAKEUSDT_PERP.A,MOODENGUSDT_PERP.A,HIPPOUSDT_PERP.A,HFTUSDT_PERP.A,MAGICUSDT_PERP.A,MAVUSDT_PERP.A,ACEUSDT_PERP.A,SIRENUSDT_PERP.A,SYSUSDT_PERP.A,ATAUSDT_PERP.A,DEGOUSDT_PERP.A,DUSDT_PERP.A,BMTUSDT_PERP.A,NKNUSDT_PERP.A,AVAAIUSDT_PERP.A,SWARMSUSDT_PERP.A,NFPUSDT_PERP.A,ALPHAUSDT_PERP.A,THEUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=MBOXUSDT_PERP.A,LISTAUSDT_PERP.A,REZUSDT_PERP.A,ZEREBROUSDT_PERP.A,TLMUSDT_PERP.A,SYNUSDT_PERP.A,GTCUSDT_PERP.A,LEVERUSDT_PERP.A,FIDAUSDT_PERP.A,HOOKUSDT_PERP.A,BADGERUSDT_PERP.A,PHBUSDT_PERP.A,SLERFUSDT_PERP.A,SWELLUSDT_PERP.A,HEIUSDT_PERP.A,RDNTUSDT_PERP.A,CHILLGUYUSDT_PERP.A,BRUSDT_PERP.A,1000RATSUSDT_PERP.A,VICUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=EPICUSDT_PERP.A,GHSTUSDT_PERP.A,REIUSDT_PERP.A,SANTOSUSDT_PERP.A,VINEUSDT_PERP.A,NEIROETHUSDT_PERP.A,MAVIAUSDT_PERP.A,PERPUSDT_PERP.A,LOKAUSDT_PERP.A,FLMUSDT_PERP.A,AVAUSDT_PERP.A,KOMAUSDT_PERP.A,QUICKUSDT_PERP.A,COSUSDT_PERP.A,BSWUSDT_PERP.A,JELLYJELLYUSDT_PERP.A,CHESSUSDT_PERP.A,VOXELUSDT_PERP.A,MYROUSDT_PERP.A,PIPPINUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=TOKENUSDT_PERP.A,TUTUSDT_PERP.A,NULSUSDT_PERP.A,FIOUSDT_PERP.A,BIDUSDT_PERP.A,TROYUSDT_PERP.A,VIDTUSDT_PERP.A,ALPACAUSDT_PERP.A,RAYSOLUSDT_PERP.A,1000CHEEMSUSDT_PERP.A,BROCCOLIF3BUSDT_PERP.A,DEFIUSDT_PERP.A,VELODROMEUSDT_PERP.A,1000XUSDT_PERP.A,1000WHYUSDT_PERP.A,1000CATUSDT_PERP.A,BROCCOLI714USDT_PERP.A,BTCDOMUSDT_PERP.A',
//     // 'https://api.coinalyze.net/v1/ohlcv-history?symbols=FUNUSDT_PERP.A,MLNUSDT_PERP.A,GUNUSDT_PERP.A,ATHUSDT_PERP.A',