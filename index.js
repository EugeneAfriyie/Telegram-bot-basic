// ===============================
// MarketGod Academy Bot - Complete & Stable
// ===============================

require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const http = require("http");

// Initialize a dummy server to keep the platform happy (binds to PORT)
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("MarketGod Bot is running!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });
// ===============================
// Set Telegram Menu Commands (Left Popup Menu)
// ===============================

bot.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "freevip", description: "View Free VIP" },
    { command: "paidvip", description: "View Paid VIP" },
    { command: "mentorship", description: "View Mentorship Program" },
    { command: "tours", description: "View Tour Dates" },
    { command: "support", description: "Get Support" }
]);

console.log("Menu commands set ✅");

console.log("MarketGod Academy Bot Running 🚀");

// ===============================
// Keyboards
// ===============================

function mainKeyboard() {
    return {
        keyboard: [
            ["🌐 Join Free Community"],
            ["🛠 Get Support"],
            ["📊 Free VIP", "💎 Paid VIP"],
            ["🎓 Mentorship", "📅 Tour Dates"]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
    };
}

function backKeyboard() {
    return {
        keyboard: [["🔙 Back"]],
        resize_keyboard: true,
        one_time_keyboard: false
    };
}

function backToursKeyboard() {
    return {
        keyboard: [["✅ Completed"], ["📅 Upcoming"], ["🔙 Back"]],
        resize_keyboard: true,
        one_time_keyboard: false
    };
}

// ===============================
// /start Command
// ===============================

// ===============================
// Command Shortcuts (Popup Menu Commands)
// ===============================
bot.onText(/\/freevip/, (msg) => {
    bot.emit("message", { chat: msg.chat, text: "📊 Free VIP" });
});

bot.onText(/\/paidvip/, (msg) => {
    bot.emit("message", { chat: msg.chat, text: "💎 Paid VIP" });
});

bot.onText(/\/mentorship/, (msg) => {
    bot.emit("message", { chat: msg.chat, text: "🎓 Mentorship" });
});

bot.onText(/\/tours/, (msg) => {
    bot.emit("message", { chat: msg.chat, text: "📅 Tour Dates" });
});

bot.onText(/\/support/, (msg) => {
    bot.emit("message", { chat: msg.chat, text: "🛠 Get Support" });
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const introText = `
🔥 Welcome to MarketGod Academy 🔥

We help traders master the Forex market with actionable signals, mentorship, and a strong community.

Learn more: https://www.marketgodacademy.com/

Get started by choosing an option below:
`;
    bot.sendMessage(chatId, introText, { reply_markup: mainKeyboard() });
});

// ===============================
// Listen for Button Presses
// ===============================

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
        // ---------------- Free VIP ----------------
        case "📊 Free VIP":
            await bot.sendMessage(chatId, `
📊 FREE VIP MEMBERSHIP - LIVE TRADING WITH MARKETGOD

Trade Like MarketGod

Real-time, high-probability signals delivered straight to your phone. Perfect for beginners.

✅ 87% Win Rate Signals  
✅ Instant Telegram Alerts  
✅ Entry/Exit Breakdowns  
✅ 24/7 Support
`, { reply_markup: backKeyboard() });

            await bot.sendMessage(chatId, "Click below to join Free VIP:", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🤖 Join Free VIP Bot", url: "https://t.me/Livetradewithmarketgodbot" }]
                    ]
                }
            });
            break;

        // ---------------- Paid VIP ----------------
        case "💎 Paid VIP":
            await bot.sendMessage(chatId, `
💎 PAID VIP MEMBERSHIP - VIP SIGNALS (Most Purchased)

⚡ Accelerated Growth Edition

For serious traders who want faster results, deeper insights, and priority alerts.

✅ 87% Win Rate Signals  
✅ Instant Telegram Alerts  
✅ Entry/Exit Breakdowns  
✅ Daily Market Breakdowns  
✅ Priority Support  

Choose your subscription plan:
`, {
                reply_markup: {
                    keyboard: [
                        ["💲 $80 / 1 month"],
                        ["💲 $240 / 3 months"],
                        ["💲 $960 / 1 year"],
                        ["🔙 Back"]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
            break;

        case "💲 $80 / 1 month":
        case "💲 $240 / 3 months":
        case "💲 $960 / 1 year":
            await bot.sendMessage(chatId, `
✅ You selected ${text}  

Click below to complete your Paid VIP subscription:
`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🤖 Complete Subscription", url: "https://t.me/paymarketgodbot" }]
                    ]
                }
            });
            break;

        // ---------------- Mentorship ----------------
        case "🎓 Mentorship":
            await bot.sendMessage(chatId, `
🎓 <b>MARKETGOD MENTORSHIP</b>

💰 Prices: $547  ~\$1247~

A complete roadmap to trading mastery. Covers everything from foundational concepts to advanced institutional strategies.

What you will get:
✅ Gold Strategy
✅ All Currency Strategy
✅ Market Structure
✅ Risk Management & Psychology
✅ 1 Year Access to Mentorship
✅ Free Access to VIP Signals
`, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🤖 Join MarketGod Mentorship", url: "https://t.me/paymarketgodbot" }]
                    ]
                }
            });
            break;

        // ---------------- Tour Dates ----------------
        case "📅 Tour Dates":
            await bot.sendMessage(chatId, "Select tour type:", { reply_markup: backToursKeyboard() });
            break;

        case "✅ Completed":
            await bot.sendPhoto(chatId,
                "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771783834/d45de409-00cf-4b60-8f90-4d84964836aa.png",
                {
                    caption: `
🙏 Thank you to all traders who attended our previous Forex Tour seminars! Your dedication inspires us.

📍 COMPLETED FOREX TOURS

We have successfully toured these cities and appreciate everyone who showed up:

• Ho – 21 Feb  
• Takoradi – 7 Mar  
• Kumasi – 21 Mar  
• Tamale – 28 Mar  
• Koforidua – 11 Apr  

Your participation makes the journey meaningful. We couldn’t do this without you! 🚀
                    `,
                    parse_mode: "HTML"
                }
            );
            break;

        case "📅 Upcoming":
            await bot.sendPhoto(chatId, "https://res.cloudinary.com/dzqdfaghg/image/upload/v1771486217/kumasi_ocr0pl.webp", {
                caption: `🔥 <b>The Journey Continues</b> 🔥

Every year, he shows up. Every year, traders level up.

From city to city. From confusion to clarity. From inconsistency to discipline.

This year again, <b>Market God</b> returns — touring six cities across Ghana.

Not just to teach charts. But to build serious, profitable traders.

📍 <b>Tour Dates:</b>
Ho — 21 Feb  
Takoradi — 7 Mar  
Kumasi — 21 Mar  
Tamale — 28 Mar  
Koforidua — 11 Apr  
Techiman — 25 Apr

The serious ones will show up.
If you’ll be attending the tour, make sure you join @livetradewithmarketgodbot 🔥 Lock in with MARKETGOD and stand a chance to win amazing prizes. Don’t miss out 🚀`,
                parse_mode: "HTML"
            });

            await bot.sendMessage(chatId, "Secure your spot for the upcoming tour:", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🔥 Secure Your Spot", url: "https://mainstack.com/s/marketgod" }]
                    ]
                }
            });

            await bot.sendMessage(chatId, "Navigation:", {
                reply_markup: {
                    keyboard: [
                        ["🔙 Back to Tours"],
                        ["🔙 Main Menu"]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
            break;

        case "🔙 Back to Tours":
            await bot.sendMessage(chatId, "Select tour type:", { reply_markup: backToursKeyboard() });
            break;

        // ---------------- Join Free Community ----------------
        case "🌐 Join Free Community":
            await bot.sendMessage(chatId, "Click below to join our Free Community:", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🌐 Join Free Community", url: "https://t.me/marketgodcommunity" }]
                    ]
                }
            });
            break;

        // ---------------- Get Support ----------------
        case "🛠 Get Support":
            const supportText = `
🛠 <b>MarketGod Academy Support</b>

Need help or want to reach out? Connect with us through any of the following channels:

• Telegram Support: [Click Here](https://t.me/delatrades)  
• WhatsApp Support: [Click Here](https://wa.me/+233599002863)  
• Email: [Click Here](mailto:support@marketgodacademy.com)  
• Instagram: [Click Here](https://www.instagram.com/eyram_dela/)  
• Facebook: [Click Here](https://www.facebook.com/eyram.akpey?_rdc=1&_rdr#)  

We are here to assist you 24/7. Your success is our priority! 🚀
`;
            await bot.sendMessage(chatId, supportText, { parse_mode: "Markdown", reply_markup: backKeyboard() });
            break;

        // ---------------- Back ----------------
        case "🔙 Back":
            await bot.sendMessage(chatId, "Main menu:", { reply_markup: mainKeyboard() });
            break;

        // ---------------- Default ----------------
        default:
            await bot.sendMessage(chatId, "Please choose an option from the buttons below.", { reply_markup: mainKeyboard() });
            break;
    }
});