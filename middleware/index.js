import authMiddleware from "./auth.js";
import commandsMiddleware from "./commands.js";

export default function setupBot(bot) {
    bot.use(authMiddleware).use(commandsMiddleware);
}
