// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../components/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = db();
    const query = "SELECT * FROM \"User\";";
    let result = await client.query(query);
    res.status(200).json(result.rows[0])
}
