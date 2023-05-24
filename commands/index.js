import { PrismaClient } from "@prisma/client";

// step 1 - start
// step 2 - send question

class Commands {
    user = new PrismaClient().user;
    constructor(bot) {
        this.bot = bot;
        this.help();
        this.start();
    }

    help() {
        this.bot.help((ctx) => ctx.reply('Press /start to use the bot.'));
    }

    start() {
        this.bot.start(async (ctx) => {
            const { message } = ctx.update;
            const user = await this.user.upsert({
                where: { tgId: `${ message.from.id }` },
                update: { step: 1, sendTo: '0' },
                create: { name: message.from.first_name, username: message.from.username, tgId: `${ message.from.id }` },
            })

            if (ctx.state.commands[1] && ctx.state.commands[1] !== user.id) {
                const receiverId = ctx.state.commands[1];
                const findUser = await this.user.findUnique({ where: { id: receiverId } });

                if (findUser) {
                    await this.user.update({ where: { id: user.id }, data: { step: 2, sendTo: findUser?.tgId } });
                }

                ctx.reply(`Write your question:`);
            } else {
                ctx.reply(`Here is your personal link:\n\nt.me/amafree_bot?start=${user.id}\n\nPost it on your channel and get anonymous questions from your followers`);
            }
        });
    }
}

export default function createCommands(bot) {
    return new Commands(bot);
}