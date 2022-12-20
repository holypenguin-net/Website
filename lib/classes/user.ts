import type {Client} from 'pg';
import { Token } from './token';
import { compare } from 'bcrypt';

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

    // get All User
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

    // Log a user in
    public async login(keepLogin: boolean){
        return new Promise(async (resolve, reject) =>{
            // prepare Statment + Values
            const stmt = 'SELECT * FROM "User" WHERE usr_Nickname = $1 OR usr_Email = $2;';
            const values = [this.user?.usr_Nickname, this.user?.usr_Email];
            let info: object;
            let mail: string;
            let nickname: string;

            // Query user by Nickname or Email
            await this.client.query(stmt, values)
                .then(async (res) => {
                    if(res.rowCount != 0 && this.user?.usr_Password){
                        
                        // Compare given password with hash in db
                        compare(this.user.usr_Password, res.rows[0].usr_password)
                            .then(async (result)=> {
                                // If password is correct
                                if(result){
                                    info = {
                                        usr_ID_FK: res.rows[0].usr_id_pk
                                    };
                                    mail = res.rows[0].usr_email;
                                    nickname = res.rows[0].usr_nickname;

                                    // gnenerate a new session-token
                                    const token = new Token(this.client, info, keepLogin);
                                    await token.generate()
                                        .then((res) => {
                                            // Build the Response
                                            // @ts-ignore
                                            res.rows[0].usr_email = mail;
                                            // @ts-ignore
                                            res.rows[0].usr_nickname = nickname;
                                            resolve(res);
                                        })
                                        .catch((e) => {
                                            reject(e);
                                        })
                                }else{
                                    resolve({});
                                }
                            })
                            .catch((e) => {
                                reject(e);
                            });
                    
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

