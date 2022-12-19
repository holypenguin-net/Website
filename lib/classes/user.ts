import type {Client} from 'pg';
import { Token } from './token';

export type userType = {
    usr_ID_PK?: number | undefined,
    usr_Nickname?: string | undefined,
    usr_Email?: string | undefined,
    usr_Password?: string | undefined,
    usr_Discord?: string | undefined,
    usr_Admin?:boolean | undefined
}

export class User{
    // Table Attributes
    user: userType | undefined; 

    // SQL-Client
    private client: Client;

    constructor(client: Client, user?: userType | undefined){
        if(user){
            this.user = user;
        }

        this.client = client;
    };

    public async getAll(){
        return new Promise(async (resolve, reject) =>{
            const stmt = 'SELECT * FROM "User";';
            await this.client.query(stmt)
                .then((res: object) => {
                    resolve(res);
                })
                .catch((e) => {
                    reject(e); 
                });
        });
    };

    public async login(){
        return new Promise(async (resolve, reject) =>{
            const stmt = 'SELECT * FROM "User" WHERE (usr_Nickname = $1 OR usr_Email = $2) AND usr_Password = $3;';
            const values = [this.user?.usr_Nickname, this.user?.usr_Email, this.user?.usr_Password];
            await this.client.query(stmt, values)
                .then(async (res) => {
                    if(res.rowCount != 0){
                        const info = {
                            usr_ID_FK: res.rows[0].usr_id_pk
                        };
                        const token = new Token(this.client, info);
                        await token.generateToken()
                            .then((res) => {
                                resolve(res);
                            })
                            .catch((e) => {
                                reject(e);
                            })
                    }else{
                        resolve(res);
                    }
                })
                .catch((e) => {
                   reject(e); 
                });
        });
    };
}


