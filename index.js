// ===============================
// MarketGod Academy Bot - Free + Paid VIP with Redirects
// ===============================

require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("MarketGod Academy Bot Running 🚀");

// ===============================
// Keyboards
// ===============================

// Main menu (stacked buttons at bottom)
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

// Back button keyboard
function backKeyboard() {
    return {
        keyboard: [
            ["🔙 Back"]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
    };
}

// ===============================
// /start Command
// ===============================

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const introText = `
🔥 Welcome to MarketGod Academy 🔥

We help traders master the Forex market with actionable signals, mentorship, and a strong community.

Get started by choosing an option below:
`;

    bot.sendMessage(chatId, introText, { reply_markup: mainKeyboard() });
});

// ===============================
// Listen for Button Presses (Reply Keyboard)
// ===============================

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {

        // ---------------- Free VIP ----------------
        case "📊 Free VIP":
            bot.sendMessage(chatId, `
📊 FREE VIP MEMBERSHIP - LIVE TRADING WITH MARKETGOD

Trade Like MarketGod

Real-time, high-probability signals delivered straight to your phone. Perfect for beginners.

✅ 87% Win Rate Signals  
✅ Instant Telegram Alerts  
✅ Entry/Exit Breakdowns  
✅ 24/7 Support

Click the button below to join Free VIP:
`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "🤖 Join Free VIP Bot", url: "https://t.me/OtherFreeVIPBot" }
                        ],
                        [
                            { text: "🔙 Back", callback_data: "back_to_main" }
                        ]
                    ]
                }
            });
            break;

        // ---------------- Paid VIP ----------------
        case "💎 Paid VIP":
            bot.sendMessage(chatId, `
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

        // Paid VIP subscription options → redirect immediately
        case "💲 $80 / 1 month":
        case "💲 $240 / 3 months":
        case "💲 $960 / 1 year":
            bot.sendMessage(chatId, `
✅ You selected ${text}  
Click below to complete your subscription:
`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "🤖 Complete Subscription", url: "https://t.me/YourPaidVIPBot" }
                        ],
                        [
                            { text: "🔙 Back", callback_data: "back_to_main" }
                        ]
                    ]
                }
            });
            break;

        // ---------------- Mentorship ----------------
        case "🎓 Mentorship":
            bot.sendMessage(chatId, `
🎓 MENTORSHIP PROGRAM

• 1-Year Access  
• Strategy Breakdown  
• Psychology Training  
• Live Trading Sessions

Apply here:
https://www.marketgodacademy.com/
`, { reply_markup: backKeyboard() });
            break;

        // ---------------- Tour Dates ----------------
        case "📅 Tour Dates":
            bot.sendMessage(chatId, `
📍 UPCOMING FOREX TOUR

Takoradi – Feb 21  
Kumasi – Mar 21  
Tamale – Mar 26  
Koforidua – Apr 11  
Techiman – Apr 25
`, { reply_markup: backKeyboard() });
            break;

        // ---------------- Join Free Community ----------------
        case "🌐 Join Free Community":
            bot.sendMessage(chatId, "Join our Free Community here: https://t.me/yourfreechannel");
            break;

        // ---------------- Get Support ----------------
        case "🛠 Get Support":
            bot.sendMessage(chatId, "Get support here: https://t.me/yourSupportHandle");
            break;

        // ---------------- Back ----------------
        case "🔙 Back":
            bot.sendMessage(chatId, "Main menu:", { reply_markup: mainKeyboard() });
            break;

        // ---------------- Default ----------------
        default:
            bot.sendMessage(chatId, "Please choose an option from the buttons below.", { reply_markup: mainKeyboard() });
            break;
    }
});

// ===============================
// Handle Inline Keyboard Callbacks
// -------------------------------

bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;

    if (query.data === "back_to_main") {
        await bot.answerCallbackQuery(query.id); // hide loading
        bot.sendMessage(chatId, "Main menu:", { reply_markup: mainKeyboard() });
    }
});