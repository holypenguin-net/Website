import type { NextApiRequest, NextApiResponse } from "next";
import db from '../../../lib/functions/db';
import type { apiResponseMessage } from '../../../lib/types/api';
import { User } from '../../../lib/classes/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse<apiResponseMessage>){
    let apiRes: apiResponseMessage;
    const client = db();
    const user = new User(client);
    user.getAll()
        .then((queryRes) => {
            apiRes = {
                statusName: 'Ok',
                statusCode: 200,
                isError: false,
                // @ts-ignore
                msg: queryRes.rows[0]
            };
            res.status(200).json(apiRes);
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

}







