import { Telegraf, session } from "telegraf";
import { IConfigService } from "./config/IConfigService";
import { ConfigService } from "./config/configService";
import { RequestListener } from "http";
import { IBotContext } from "./context/IBotContext";
import { Command } from "./commands/command";
import { StartCommand } from "./commands/startCommand";

class Bot{
    bot: Telegraf<IBotContext>;
    commands:Command[]=[];
    constructor(private readonly configService:IConfigService){
        console.log(this.configService.get("TOKEN"));
        console.log("before bor create");
        this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
        console.log("before use session");
        this.bot.use(session());
    }
    init() {
        try {
            console.log(process.env);
            this.commands= [new StartCommand(this.bot)];
            for(const command of this.commands){
                command.handle();
            }
            if (process.env.PROD) {
                const cb: RequestListener = (req, res) => {
                    res.end(`OK`);
                }
                this.bot.launch({
                    webhook: {
                        domain: `${process.env.URL}`,
                        port: parseInt(`${process.env.PORT}`),
                        cb
                    }
                })
            } else {
                this.bot.launch();
            }
        } catch (ex) {
            console.error(ex);
        }

    }
}
const bot = new Bot(new ConfigService());
console.log("before init");
bot.init();