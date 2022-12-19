import type {Client} from 'pg';

export type userType = {
    usr_ID_PK?: number | undefined | null,
    usr_Nickname?: string | undefined | null,
    usr_Email?: string | undefined | null,
    usr_Password?: string | undefined | null,
    usr_Discord?: string | undefined | null,
    usr_Admin?:boolean | undefined | null
}

export class User{
    // Table Attributes
    user: userType | undefined; 

    // SQL-Client
    private client: Client;

    constructor(client: Client, user?: userType | undefined){
        if(user != undefined){
            this.user = user;
        }else{
            this.user = {
                usr_ID_PK: undefined,
                usr_Nickname: undefined,
                usr_Email: undefined,
                usr_Password: undefined,
                usr_Discord: undefined,
                usr_Admin: false
            };
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
                .then((res: object) => {
                    resolve(res);
                })
                .catch((e) => {
                   reject(e); 
                });
        });
    };
}


