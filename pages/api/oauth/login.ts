import * as querystring from "querystring";
import { setCookie } from "nookies";

import { inMemoryUserRepository } from "../../../lib/oauth/repository";
import { SERVER_COOKIES } from "../../../lib/oauth/oauth_authorization_server";

export default async function Login(req, res) {
  if (req.method.toLowerCase() !== "post") {
    res.status(400);
    res.send("unsupported method");
    return;
  }

  const { email, password } = req.body;

  const user = await inMemoryUserRepository.getUserByCredentials(email, password)

  setCookie({ res }, SERVER_COOKIES.user, JSON.stringify(user), {
    path: "/",
    httpOnly: true,
  });

  res.redirect("/api/oauth/authorize?" + querystring.stringify(req.query));
}
