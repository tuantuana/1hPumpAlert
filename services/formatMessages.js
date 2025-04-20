

const escapeHtml = require("../utils/escapeHtml");
const fetchLiquidation = require("../api/fetchLiquidation");
const fetchLongShortRatioData = require("../api/fetchLongShortRatioData");
const fetchPredictedFundingRate = require('../api/fetchPredictedFundingRate');
const fetchOpenInterestChange = require('../api/fetchOpenInterestChange');



async function formatMessagesPerSymbol(data) {
    const messages = [];

    for (const symbol in data) {
        const candles = data[symbol];
        const latest = candles.at(-1);
        const prev = candles.length >= 2 ? candles.at(-2) : null;
        const displaySymbol = escapeHtml(symbol.replace('_PERP.A', ''));

        // time
        const now = new Date();  // Lấy thời gian hiện tại
        const options = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "Asia/Ho_Chi_Minh"  // Chỉ định múi giờ Hồ Chí Minh
        };
        const formattedTime = now.toLocaleString("vi-VN", options);

        // ===== PHẦN 1: THÔNG TIN GIÁ VÀ VOLUME =====
        const percentChange1 = ((latest.c - latest.o) / latest.o) * 100;
        const buyVolume = latest.bv;
        const sellVolume = latest.v - latest.bv;
        const buyMorePercent = ((buyVolume - sellVolume) / sellVolume) * 100;
        const trend = buyMorePercent > 0 ? "⬆️" : "⬇️";

        const sellTx = latest.tx - latest.btx;
        const buyMorePercentTx = ((latest.btx - sellTx) / sellTx) * 100;
        const trendTX = buyMorePercentTx > 0 ? "⬆️" : "⬇️";

        const pricePart = `⭐⭐⭐ <code><b><i>${displaySymbol}</i></b></code> ⭐⭐⭐
🔸 <b>Price:</b> ${(latest.c)}
🚀 <b>PriceChange:</b> ${percentChange1.toFixed(1)}%
╰┈➤<a href="https://www.coinglass.com/tv/vi/Binance_${displaySymbol}"> Coinglass </a>
📊 <b>Volume:</b> ${latest.v.toLocaleString()} || ${trend} ${buyMorePercent.toFixed(1)}%
📈 <b>Buy:</b> ${buyVolume.toLocaleString()} || 📉 <b>Sell:</b> ${sellVolume.toLocaleString()}
⛓️ <b>TxBuy:</b> ${latest.btx} || <b>TXSell:</b> ${sellTx} || ${trendTX} ${buyMorePercentTx.toFixed(1)}%
`.trim();

        // ===== PHẦN 2: LIQUIDATION =====
        const { long = 0, short = 0 } = await fetchLiquidation(displaySymbol);
        const liquidationPart = `💥 <b>Liquidation</b> 
🟢<b> Long:</b> $ ${long.toLocaleString()} || 🔴 <b>Short:</b> $ ${short.toLocaleString()}`.trim();

        // ===== PHẦN 3: LONG SHORT RATIO =====
        const ratioData = await fetchLongShortRatioData(symbol);
        const ratio = ratioData?.ratio?.toFixed(2) || "N/A";
        const longRatio = ratioData?.longRatio?.toFixed(1) || "N/A";
        const shortRatio = ratioData?.shortRatio?.toFixed(1) || "N/A";

        const lsrPart = `⚠️ <b>LS Ratio:</b> ${ratio}
🟢 <b>Long:</b> ${longRatio} % | 🔴 Short: ${shortRatio} %
⏱️ <b>Time:</b> ${formattedTime}
`.trim();

        // ===== PHẦN 4: PREDICTED FUNDING RATE =====
        const fundingData = await fetchPredictedFundingRate(symbol);
        const predictedRate = fundingData?.value?.toFixed(6) || "N/A";

        // // Kiểm tra nếu predictedRate nằm trong khoảng từ -1 đến -10 và bỏ qua symbol đó nếu điều kiện này thỏa mãn
        // if (predictedRate !== "N/A" && (parseFloat(predictedRate) >= -10 && parseFloat(predictedRate) <= -1)) {
        //     continue; // Bỏ qua symbol này nếu predictedFundingRate trong khoảng từ -1 đến -10
        // }

        const fundingTime = fundingData?.update
            ? new Date(fundingData.update).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
            : "N/A";

        const fundingRatePart = `💰 <b>Predicted Funding:</b> ${predictedRate}
⏱️ <b>Update:</b> ${fundingTime}
`.trim();

        // ===== PHẦN 5: OPEN INTEREST CHANGE =====
        const oiData = await fetchOpenInterestChange(symbol);
        const oiChange = oiData
            ? ((oiData.close - oiData.open) / oiData.open * 100).toFixed(2) + '%'
            : "N/A";

        // Làm tròn trước khi format
        const openFormatted = oiData?.open ? Math.round(oiData.open).toLocaleString() : "N/A";
        const closeFormatted = oiData?.close ? Math.round(oiData.close).toLocaleString() : "N/A";

        const openInterestPart = `📊 <b>OI Change:</b> ${oiChange}
🔓 Open: ${openFormatted}
🔒 Close: ${closeFormatted}
<b>  「 ✔ ᵛᵉʳᶦᶦᵉᵈ」      </b>
`.trim();

        // ===== PHẦN 6: TỔNG KẾT =====
let summary = "";

const parsedPredicted = parseFloat(predictedRate);
const parsedRatio = parseFloat(ratio);
const parsedOiChange = parseFloat(oiChange.replace('%', ''));

if (buyMorePercent > 10 && parsedRatio > 1 && parsedPredicted > 0 && parsedOiChange > 10) {
    summary = "🔥 <b>LONG mạnh</b>";
} else if (buyMorePercent > 0 && parsedRatio > 1 && parsedPredicted > 0 && parsedOiChange > 0) {
    summary = "🟢 <b>LONG full xanh</b>";
} else if (buyMorePercent > 0 && parsedRatio > 1 && parsedPredicted > -1 && parsedOiChange > 0) {
    summary = "🟡 <b>LONG funding âm nhẹ</b>";
} else if (buyMorePercent > 0 && parsedRatio < 1 && parsedPredicted > 0 && parsedOiChange > 0) {
    summary = "🟡 <b>LONG Radio âm</b>";
} else if (buyMorePercent > 0 && parsedRatio < 1 && parsedPredicted < 0 && parsedPredicted > -1 ) {
    summary = "🔁 <b>LONG ngược</b>";
}

const summaryPart = summary ? `\n\n📌 <b>Tín hiệu:</b> ${summary}` : "";


        // ===== GỘP TOÀN BỘ PHẦN LẠI =====
        const finalMessage = [pricePart, liquidationPart, lsrPart, fundingRatePart, openInterestPart].join('\n\n') + summaryPart;

        messages.push({
            symbol: displaySymbol,
            message: finalMessage
        });
    }

    return messages;
}



module.exports = formatMessagesPerSymbol;

