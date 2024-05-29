import { Telegraf, session } from "telegraf";
import { IConfigService } from "./config/IConfigService";
import { ConfigService } from "./config/configService";
import { RequestListener } from "http";
import { IBotContext } from "./context/IBotContext";

class Bot{
    bot: Telegraf<IBotContext>;
    constructor(private readonly configService:IConfigService){
        console.log(this.configService.get("TOKEN"));
        this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
        
        this.bot.use(session());
    }
    init() {
        try {
            console.log(process.env);
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
bot.init();