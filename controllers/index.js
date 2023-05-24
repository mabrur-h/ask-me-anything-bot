import { PrismaClient } from "@prisma/client";

class Controllers {
    user = new PrismaClient().user;
    constructor(bot) {
        this.bot = bot;
        this.anyMessage();
    }

    anyMessage() {
        this.bot.on('text', async (ctx) => {
            const { message } = await ctx.update;
            const user = await this.user.findUnique({ where: { tgId: `${ message.from.id }` } });
            if (user?.step === 2) {
                await ctx.telegram.sendMessage(user?.sendTo, `<b>You have received a new message:</b>\n\n${ message.text }\n<a href="http://t.me/amafree_bot?start=${ user.id }">[Answer]</a>`, { parse_mode: 'HTML', disable_web_page_preview: true });
                await ctx.reply('Your question is sent to the user.\n\nPress /start to use the bot.');
                await this.user.update({ where: { tgId: `${ message.from.id }` }, data: { step: 1, sendTo: '0' } });
            } else {
                await ctx.reply('Press /start to use the bot.');
            }
        });
    }
}

export default function createControllers(bot) {
    return new Controllers(bot);
}