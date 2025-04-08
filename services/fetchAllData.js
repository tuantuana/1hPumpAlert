//
// const { createApiUrl } = require("../api/createApiUrl");
// const axios = require("axios");
// const filterBullishAbove10Percent = require("../utils/filterBullishAbove10Percent");
// const sendToTelegram = require("../telegram/sendMessage");
// const { from, to, API_KEY } = require('../config');
// const formatMessagesPerSymbol = require('../services/formatMessages');
// const symbolGroups = require('../utils/groupSymbols');
//
// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
//
// async function fetchAllData() {
//     const allData = {};
//     console.log("⏰ Đang chạy cron lúc:", new Date().toLocaleString());
//     console.log("📦 from:", from, "| to:", to);
//
//     for (let i = 0; i < symbolGroups.length; i += 2) {
//         const group1 = symbolGroups[i];
//         const group2 = symbolGroups[i + 1];
//
//         const url1 = createApiUrl(group1);
//         const url2 = group2 ? createApiUrl(group2) : null;
//
//         console.log(`📡 Đang gọi nhóm ${i + 1}: ${url1}`);
//         if (url2) console.log(`📡 Đang gọi nhóm ${i + 2}: ${url2}`);
//
//         // Retry loop nếu có lỗi
//         while (true) {
//             try {
//                 const promises = [axios.get(url1)];
//                 if (url2) promises.push(axios.get(url2));
//
//                 const responses = await Promise.all(promises);
//
//                 responses.forEach((res, idx) => {
//                     const data = res.data;
//                     console.log(`✅ Nhóm ${i + 1 + idx} trả về ${data.length} symbols`);
//                     data.forEach(entry => {
//                         allData[entry.symbol] = entry.history;
//                         console.log(`📍 ${entry.symbol} - candles: ${entry.history?.length}`);
//                     });
//                 });
//
//                 break; // Thoát retry nếu thành công
//
//             } catch (err) {
//                 console.error(`❌ Lỗi khi gọi nhóm ${i + 1} hoặc ${i + 2}:`, err.message);
//                 console.log("⏳ Đợi 1 phút trước khi thử lại...\n");
//                 await delay(60 * 1000);
//             }
//         }
//
//         if (i + 2 < symbolGroups.length) {
//             console.log('⏳ Chờ 1 phút trước khi tiếp tục nhóm kế tiếp...\n');
//             await delay(60 * 1000);
//         }
//     }
//
//     const keys = Object.keys(allData);
//     console.log("📥 Raw data keys:", keys);
//
//     if (keys.length > 0) {
//         const exampleKey = keys[0];
//     } else {
//         console.warn("⚠️ Không có symbol nào được fetch!");
//     }
//
//     const filtered = filterBullishAbove10Percent(allData);
//     console.log("⏳ Chờ 1 phút sau khi lọc dữ liệu tăng mạnh...\n");
//     // await delay(60 * 1000); // Delay 1 phút
//
//     const messages = await formatMessagesPerSymbol(filtered);
//
//     for (const { symbol, message } of messages) {
//         console.log(`📨 Gửi ${symbol} lên Telegram...`);
//         await sendToTelegram(message);
//         await delay(1000);
//     }
// }
// module.exports = fetchAllData;



const { createApiUrl } = require("../api/createApiUrl");
const axios = require("axios");
const filterBullishAbove10Percent = require("../utils/filterBullishAbove10Percent");
const sendToTelegram = require("../telegram/sendMessage");
const { from, to, API_KEY } = require('../config');
const formatMessagesPerSymbol = require('../services/formatMessages');
const symbolGroups = require('../utils/groupSymbols');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAllData() {
    const allData = {};
    console.log("⏰ Đang chạy cron lúc:", new Date().toLocaleString());
    console.log("📦 from:", from, "| to:", to);

    for (let i = 0; i < symbolGroups.length; i += 2) {
        const group1 = symbolGroups[i];
        const group2 = symbolGroups[i + 1];

        const url1 = createApiUrl(group1);
        const url2 = group2 ? createApiUrl(group2) : null;

        console.log(`📡 Đang gọi nhóm ${i + 1}: ${url1}`);
        if (url2) console.log(`📡 Đang gọi nhóm ${i + 2}: ${url2}`);

        while (true) {
            try {
                const promises = [axios.get(url1)];
                if (url2) promises.push(axios.get(url2));

                const responses = await Promise.all(promises);

                responses.forEach((res, idx) => {
                    const data = res.data;

                    // Tạm lưu dữ liệu nhóm hiện tại
                    const tempGroupData = {};
                    data.forEach(entry => {
                        tempGroupData[entry.symbol] = entry.history;
                    });

                    // Lọc dữ liệu bullish > 10%
                    const filteredGroup = filterBullishAbove10Percent(tempGroupData);
                    const filteredSymbols = Object.keys(filteredGroup);

                    // In kết quả đã lọc
                    console.log(`✅ Nhóm ${i + 1 + idx} có ${filteredSymbols.length} symbols tăng mạnh >10%:`);
                    console.log("➡", filteredSymbols.join(", ") || "(không có)");

                    // Gộp vào allData để dùng sau (gửi telegram cuối cùng)
                    Object.entries(tempGroupData).forEach(([symbol, history]) => {
                        allData[symbol] = history;
                    });
                });

                break; // thành công thì thoát retry loop

            } catch (err) {
                console.error(`❌ Lỗi khi gọi nhóm ${i + 1} hoặc ${i + 2}:`, err.message);
                console.log("⏳ Đợi 1 phút trước khi thử lại...\n");
                await delay(60 * 1000);
            }
        }

        if (i + 2 < symbolGroups.length) {
            console.log('⏳ Chờ 1 phút trước khi tiếp tục nhóm kế tiếp...\n');
            await delay(60 * 1000);
        }
    }

    const keys = Object.keys(allData);
    console.log("📥 Tổng số symbol fetch được:", keys.length);

    if (keys.length === 0) {
        console.warn("⚠️ Không có symbol nào được fetch!");
        return;
    }

    const filtered = filterBullishAbove10Percent(allData);
    console.log("⏳ Đợi thêm data và gửi...\n");
    const messages = await formatMessagesPerSymbol(filtered);

    for (const { symbol, message } of messages) {
        console.log(`📨 Gửi ${symbol} lên Telegram...`);
        await sendToTelegram(message);
        await delay(1000);
    }
}

module.exports = fetchAllData;
