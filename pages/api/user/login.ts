import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/functions/db';
import type { apiResponseMessage } from "../../../lib/types/api";
import { User } from '../../../lib/classes/user';
import { Token } from '../../../lib/classes/token';
import { sign } from '../../../lib/functions/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse<apiResponseMessage>){
    let apiRes: apiResponseMessage;
    // Check HTTP-Method
    if(req.method === "POST"){
        // Prepare DB
        const client = db();
        // Prepare Classes
        const user = new User(client);
        const token = new Token(client);

        user.user = {
            usr_Nickname: !req.body.usr_Nickname ? undefined : req.body.usr_Nickname,
            usr_Email: !req.body.usr_Email ? undefined : req.body.usr_Email,
            usr_Password: !req.body.usr_Password ? undefined : req.body.usr_Password,
        }

        const keepLogin = req.body.keepLogin ? req.body.keepLogin : false;

        await user.login(keepLogin)
            .then((queryRes) => {
                // @ts-ignore 
                if(queryRes.rows && queryRes.rowCount != 0){
                    // Create JWT
                    // @ts-ignore
                    const jwt  = sign(queryRes.rows[0]);
                    apiRes = {
                        statusName: 'Ok',
                        statusCode: 200,
                        isError: false,
                        // @ts-ignore
                        msg: {"jwt": jwt}
                    };
                    res.status(200).json(apiRes);
                    token.deleteExpired();
                }else{
                    apiRes = {
                        statusName: 'Failed',
                        statusCode: 401,
                        isError: true,
                        // @ts-ignore
                        msg: {"error": "Email or password false!"}
                    };
                    res.status(200).json(apiRes);
                }
            })
            .catch((e) => {
                apiRes = {
                    statusName: 'Internal Server Error',
                    statusCode: 500,
                    isError: true,
                    msg: e
               };
               res.status(500).json(apiRes);
            });
    } else {
        apiRes = {
            statusName: 'Bad Request',
            statusCode: 405,
            isError: true,
            msg: {"error": "Invalid Method"}
        }
        res.status(405).json(apiRes);
    }
};
