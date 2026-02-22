// ===============================
// MarketGod Academy Bot - Complete & Stable
// ===============================

require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

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

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const introText = `
🔥 Welcome to MarketGod Academy 🔥

We help traders master the Forex market with actionable signals, mentorship, and a strong community.

Learn more: https://www.marketgodacademy.com/plans

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
                        [{ text: "🤖 Join Free VIP Bot", url: "https://t.me/OtherFreeVIPBot" }]
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
                        [{ text: "🤖 Complete Subscription", url: "https://t.me/YourPaidVIPBot" }]
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
                        [{ text: "🤖 Join MarketGod Mentorship", url: "https://t.me/YourMentorshipBot" }]
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
                "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_511469271_18512807728003421_2788928110292631837_n_shzro3.jpg",
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
            await bot.sendPhoto(chatId, "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_511469271_18512807728003421_2788928110292631837_n_shzro3.jpg", {
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
                        [{ text: "🔥 Secure Your Spot", url: "https://t.me/livetradewithmarketgodbot" }]
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
                        [{ text: "🌐 Join Free Community", url: "https://t.me/yourfreechannel" }]
                    ]
                }
            });
            break;

        // ---------------- Get Support ----------------
        case "🛠 Get Support":
            const supportText = `
🛠 <b>MarketGod Academy Support</b>

Need help or want to reach out? Connect with us through any of the following channels:

• Telegram Support: [Click Here](https://t.me/yourSupportHandle)  
• WhatsApp Support: [Click Here](https://wa.me/yourWhatsAppNumber)  
• Email: [support@marketgodacademy.com](mailto:support@marketgodacademy.com)  
• Instagram: [@marketgodacademy](https://www.instagram.com/marketgodacademy)  
• Facebook: [MarketGod Academy](https://www.facebook.com/marketgodacademy)  

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