import { Telegraf } from "telegraf";
import { IBotContext } from "../context/IBotContext";

export abstract class Command{
    constructor(bot:Telegraf<IBotContext>){

    }
    abstract handle():void;
}