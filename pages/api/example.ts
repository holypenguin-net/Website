import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../lib/functions/db';
import type { APIResponse, APIStatus } from '../../lib/types/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
    const client = db();
    const query = "SELECT * FROM \"User\";";
    let out = await client.query(query);
    client.end();
    let resp = {
        status: (0 as APIStatus),
        msg: out.rows[0]
    };

    res.status(200).json(resp)
}
