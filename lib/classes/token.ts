import type { Client } from 'pg';
import { randomBytes } from 'crypto';

export type tokenType = {
    usr_ID_FK?: number | undefined,
    tk_Token?: string | undefined,
    tk_ExpiryDate?: Date | undefined
};

export class Token{
    token: tokenType | undefined;
    keepLogin: boolean;

    // SQL-Client
    private client: Client;

    constructor(client: Client, token?: tokenType | undefined, keepLogin?: boolean) {
        if(token){
            this.token = token; 
        }
        this.keepLogin = keepLogin ? keepLogin : false;
        this.client = client;
    };

    // generate a new token
    public async generate(){
        return new Promise(async (resolve, reject) => {
            if(this.token){
                // generate new Token
                this.token.tk_Token = randomBytes(16).toString("hex");                   
                this.token.tk_ExpiryDate = new Date();

                // Check if Keep Login = True
                if(!this.keepLogin){
                    this.token.tk_ExpiryDate.setDate(this.token.tk_ExpiryDate.getDate() + 1);
                }else{
                    this.token.tk_ExpiryDate.setDate(this.token.tk_ExpiryDate.getDate() + 30);
                }

                // prepare statement and values
                const stmt = 'INSERT INTO "Token" (usr_ID_FK, tk_Token, tk_ExpiryDate) VALUES ($1, $2, $3);';
                const values = [this.token.usr_ID_FK, this.token.tk_Token, this.token.tk_ExpiryDate];
                
                // create Token in db
                await this.client.query(stmt, values)
                    .then(() => {
                        resolve({"rows": [{
                            "tk_token": this.token?.tk_Token,
                            "tk_expirydate": this.token?.tk_ExpiryDate,
                            "usr_id_pk": this.token?.usr_ID_FK
                        }]});
                    })
                    .catch((e) => {
                       reject(e); 
                    });
            }
        });
    };

    // delete expired token
    public async deleteExpired(){
        return new Promise(async (resolve, reject) => {
            const stmt = 'DELETE FROM "Token" WHERE tk_ExpiryDate < CURRENT_DATE;';

            await this.client.query(stmt)
                .then(() => {
                    resolve({"msg": "Success"});
                })
                .catch((e) => {
                    reject(e);
                })
        });
        
    }
};
