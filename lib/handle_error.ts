import type { NextApiResponse } from 'next'
import { OAuthException } from "@jmondi/oauth2-server";

export function handleError(e: any, res: NextApiResponse) {
  if (e instanceof OAuthException) {
    res.status(e.status);
    res.send({
      status: e.status,
      message: e.message,
    });
    return;
  }
  throw e;
}
