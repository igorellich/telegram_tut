import { Markup, Telegraf } from "telegraf";
import { Command } from "./command";
import { IBotContext } from "../context/IBotContext";

export class StartCommand extends Command{
    constructor(bot:Telegraf<IBotContext>){
        super(bot);

    }
    handle(): void {
        console.log("StartCommand handle")
        this._bot.start((ctx)=>{
            console.log(ctx.session);
            ctx.reply("Вам понравилось промо?", Markup.inlineKeyboard([
                Markup.button.callback("👍", "promo_like"),
                Markup.button.callback("👎", "promo_dislike"),
            ]))
        });
        this._bot.action("promo_like", (ctx)=>{
            if(!ctx.session){
                ctx.session = {promoLike:undefined};
            }
            ctx.session.promoLike = true;
            ctx.editMessageText("🎉 Круто!");            
        });
        this._bot.action("promo_dislike", (ctx)=>{
            if(!ctx.session){
                ctx.session = {promoLike:undefined};
            }
            ctx.session.promoLike = false;
            ctx.editMessageText("😭 Как же так?");            
        });
    }

}