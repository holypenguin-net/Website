import type { NextApiRequest, NextApiResponse } from "next";
import type { apiResponseMessage } from "../../lib/types/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse<apiResponseMessage>){
    console.log(req.method)
    const apiRes = {
        statusName: 'Ok',
        statusCode: 200,
        isError: false,
        msg: {"method": req.method, "body": JSON.stringify(req.body)}
    };
    res.status(200).json(apiRes);
}
