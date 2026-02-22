// ===============================
// MarketGod Academy Bot - Free + Paid VIP (Redirect Buttons)
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

We help traders master the Forex market with actionable signals, mentorship, and a strong community.  https://www.marketgodacademy.com/plans

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
            bot.sendMessage(chatId, `
📊 FREE VIP MEMBERSHIP - LIVE TRADING WITH MARKETGOD

Trade Like MarketGod

Real-time, high-probability signals delivered straight to your phone. Perfect for beginners.

✅ 87% Win Rate Signals  
✅ Instant Telegram Alerts  
✅ Entry/Exit Breakdowns  
✅ 24/7 Support
`, {
                reply_markup: backKeyboard()
            });

            // Add redirect button
            bot.sendMessage(chatId, "Click below to join Free VIP:", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🤖 Join Free VIP Bot", url: "https://t.me/OtherFreeVIPBot" }]
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

        // Paid VIP subscription options → show details + redirect button
    // Paid VIP subscription options → show details + redirect button in ONE message
case "💲 $80 / 1 month":
case "💲 $240 / 3 months":
case "💲 $960 / 1 year":
    bot.sendMessage(chatId, `
✅ You selected ${text}  

Click below to complete your Paid VIP subscription:
`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🤖 Complete Subscription", url: "https://t.me/YourPaidVIPBot" }],
                [{ text: "🔙 Back", callback_data: "back" }]
            ]
        }
    });
    break;

        // ---------------- Mentorship ----------------
        case "🎓 Mentorship":
    bot.sendMessage(chatId, `
🎓 <b>MARKETGOD MENTORSHIP</b>

💰 Prices: $547  

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
                [{ text: "🤖 Join MarketGod Mentorship", url: "https://t.me/YourMentorshipBot" }],
                [{ text: "🔙 Back", callback_data: "back" }]
            ]
        }
    });
    break;
    

        // ---------------- Tour Dates ----------------
       // ---------------- Tour Dates ----------------
case "📅 Tour Dates":
    bot.sendMessage(chatId, "Select tour type:", {
        reply_markup: {
            keyboard: [
                ["✅ Completed"], 
                ["📅 Upcoming"],
                ["🔙 Back"]
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
    break;

// Completed Tour
// Completed Tour
// ---------------- Completed Tour ----------------
case "✅ Completed":
    // Send appreciative image with caption
    bot.sendPhoto(chatId,
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
// ---------------- Handle the Upcoming Tour CTA from Completed ----------------
case "upcoming_tour": // callback query handler
    // This assumes you have a callback_query listener
    bot.sendMessage(chatId, "Redirecting to Upcoming Tour...");
    // Trigger the same logic as the Upcoming Tour case
    bot.emit("message", { chat: { id: chatId }, text: "📅 Upcoming" });
    break;
// Upcoming Tour
// Upcoming Tour
case "📅 Upcoming":
    // 1️⃣ Send image first
    bot.sendPhoto(chatId, "https://res.cloudinary.com/dzqdfaghg/image/upload/v1763522352/SnapInsta.to_511469271_18512807728003421_2788928110292631837_n_shzro3.jpg", {
        caption: "📢 MarketGod Academy - Upcoming Forex Tour",
    });

    // 2️⃣ Send tour text with CTA
    bot.sendMessage(chatId, `
🔥 <b>The Journey Continues</b> 🔥

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
If you’ll be attending the tour, make sure you join @livetradewithmarketgodbot 🔥 Lock in with MARKETGOD and stand a chance to win amazing prizes. Don’t miss out 🚀
`, {
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [{ text: "🔥 Secure Your Spot", url: "https://t.me/livetradewithmarketgodbot" }]
            ]
        }
    });

    // 3️⃣ Navigation keyboard below
    bot.sendMessage(chatId, "Navigation:", {
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
// Back to Tours menu
case "🔙 Back to Tours":
    bot.sendMessage(chatId, "Select tour type:", {
        reply_markup: {
            keyboard: [
                ["✅ Completed"], 
                ["📅 Upcoming"],
                ["🔙 Back"]
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
    break;
        // ---------------- Join Free Community ----------------
        case "🌐 Join Free Community":
            bot.sendMessage(chatId, "Click below to join our Free Community:", {
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
🛠 MarketGod Academy Support

Need help or want to reach out? Connect with us through any of the following channels:

• Telegram Support: [Click Here](https://t.me/yourSupportHandle)  
• WhatsApp Support: [Click Here](https://wa.me/yourWhatsAppNumber)  
• Email: [support@marketgodacademy.com](mailto:support@marketgodacademy.com)  
• Instagram: [@marketgodacademy](https://www.instagram.com/marketgodacademy)  
• Facebook: [MarketGod Academy](https://www.facebook.com/marketgodacademy)  

We are here to assist you 24/7. Your success is our priority! 🚀
`;

    bot.sendMessage(chatId, supportText, {
        parse_mode: "Markdown",
        reply_markup: backKeyboard()
    });
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