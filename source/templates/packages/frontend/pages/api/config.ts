import { NextApiRequest, NextApiResponse } from "next";
import getConfig from 'next/config';

const config = getConfig();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).send(`window.PUBLIC_CONFIG = ${JSON.stringify(config)}`);
}
