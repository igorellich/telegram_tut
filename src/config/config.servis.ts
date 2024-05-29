import { DotenvParseOutput, config } from "dotenv";
import { IConfigService } from "./config.interface";

export class ConfigService implements IConfigService{
    
    private readonly config:DotenvParseOutput;
    constructor(){
        const {error, parsed} = config();
        if(error){
            throw new Error(error.message);
        }
        if(!parsed){
            throw new Error("Empty dotenv!");
        }
        this.config = parsed;
    }
    
    get(key: string): string {
        const res = this.config[key];
        if(!res){
            throw new Error(`env doesn contains key ${key}`);
        }
        return res;
    }
    
}