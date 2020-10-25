import { inMemoryUserRepository } from "../../../lib/oauth/repository";
import * as querystring from "querystring";
import Cookies from "cookies";

export default async function Login(req, res) {
  if (req.method.toLowerCase() !== "post") {
    res.status(400);
    res.send("unsupported method");
    return;
  }

  const { email, password } = req.body;

  // this method should be validating the user & password
  const user = await inMemoryUserRepository.getUserByCredentials(email, password)

  console.log(req.body, user);

  const cookies = new Cookies(req, res);

  cookies.set("user", JSON.stringify(user), {
    httpOnly: true,
  })

  res.redirect("/api/oauth/authorize?" + querystring.stringify(req.query));
}
