import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../components/db';
import type { APIResponse, APIStatus } from '../../components/api';

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
