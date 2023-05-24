export default function commandsMiddleware(ctx, next) {
    const { message } = ctx.update;
    const { text } = message;
    const commands = text?.split(' ');
    Object.assign(ctx.state, { text, commands });
    next();
}
