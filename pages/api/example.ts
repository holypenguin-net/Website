import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../lib/functions/db';
import type {apiResponseMessage} from '../../lib/types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse<apiResponseMessage>) {
    const client = db();
    const query = "SELECT * FROM \"User\";";
    let out = await client.query(query);
    client.end();
    let resp:apiResponseMessage = {
        statusName: 'Ok',
        statusCode: 200,
        isError: false,
        msg: out.rows[0]
    };

    res.status(200).json(resp)
}
