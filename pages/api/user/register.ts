import type { NextApiRequest, NextApiResponse } from "next";
import db from '../../../lib/functions/db';
import type { apiResponseMessage } from "../../../lib/types/api";
import { User } from '../../../lib/classes/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse<apiResponseMessage>){
    let apiRes: apiResponseMessage;
    if(req.method === "POST"){
        // Prepare DB
        const client = db();

        // Prepare Classes
        const user = new User(client);

        user.user = {
            usr_Nickname: req.body.usr_Nickname,
            usr_Email: req.body.usr_Email,
            usr_Password: req.body.usr_Password,
            usr_Admin: false
        };

        await user.register()
            .then((queryRes) => {
                apiRes = {
                    statusName: 'Ok',
                    statusCode: 200,
                    isError: false,
                    msg: (queryRes as object)
                }
                res.status(200).json(apiRes);
            })
            .catch((e) => {
                apiRes = {
                    statusName: 'Internal Server Error',
                    statusCode: 500,
                    isError: true,
                    msg: e
                }
                res.status(500).json(apiRes);
            })
        
    }else{
        apiRes = {
            statusName: 'Bad Request',
            statusCode: 405,
            isError: true,
            msg: {"error": "Invalid Method"}
        }
        res.status(405).json(apiRes);
    }
};
