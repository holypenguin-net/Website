import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/functions/db';
import type { apiResponseMessage } from "../../../lib/types/api";
import { User } from '../../../lib/classes/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse<apiResponseMessage>){
    let apiRes: apiResponseMessage;
    const client = db();
    const user = new User(client);

    user.user = {
        usr_Nickname: !req.body.usr_Nickname ? undefined : req.body.usr_Nickname,
        usr_Email: !req.body.usr_Email ? undefined : req.body.usr_Email,
        usr_Password: !req.body.usr_Password ? undefined : req.body.usr_Password
    };

    console.log(user.user);

    user.login()
        .then((queryRes) => {
            // @ts-ignore
            if(queryRes.rowCount != 0){
                apiRes = {
                    statusName: 'Ok',
                    statusCode: 200,
                    isError: false,
                    // @ts-ignore
                    msg: queryRes.rows[0]
                };
                res.status(200).json(apiRes);
            }else{
                apiRes = {
                    statusName: 'Bad Request',
                    statusCode: 404,
                    isError: true,
                    // @ts-ignore
                    msg: {"error": "No user found!"}
                };
                res.status(200).json(apiRes);
            }
        })
        .catch((e) => {
            apiRes = {
                statusName: 'Internal Server Error',
                statusCode: 500,
                isError: true,
                msg: apiRes
           };
        });
};
