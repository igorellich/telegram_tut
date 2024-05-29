import { Context } from "telegraf";
export interface ISessionData{
    promoLike?: boolean;
}
export interface IBotContext extends Context{
    session:ISessionData;
}