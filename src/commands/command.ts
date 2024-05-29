import { Telegraf } from "telegraf";
import { IBotContext } from "../context/IBotContext";

export abstract class Command{
    protected _bot: Telegraf<IBotContext>;
    constructor(bot:Telegraf<IBotContext>){
        this._bot = bot;
    }
    abstract handle():void;
}