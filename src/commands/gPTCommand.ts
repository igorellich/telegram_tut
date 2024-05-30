import { Telegraf } from "telegraf";
import { IBotContext } from "../context/IBotContext";
import {getChatGPTResponse} from "../api/gpt/baseRequest";
import { Command } from "./command";
export class GPTCommand extends Command{
    constructor(bot:Telegraf<IBotContext>){
        super(bot);

    }
    handle(): void {
        this._bot.on("text", async (ctx) => {
            console.log(ctx.message.text);
            let response = "";
            try {
                response = await getChatGPTResponse(ctx.message.text);
            } catch (ex) {
                response = "Error sending gpt request";
                console.error(ex);
            }
            ctx.reply(response);
        });
    }
}