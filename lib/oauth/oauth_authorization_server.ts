import { AuthorizationServer, DateInterval, JwtService } from "@jmondi/oauth2-server";

import {
  inMemoryAccessTokenRepository,
  inMemoryAuthCodeRepository,
  inMemoryClientRepository,
  inMemoryScopeRepository,
  inMemoryUserRepository,
} from "./repository";

const clientRepository = inMemoryClientRepository;
const authCodeRepository = inMemoryAuthCodeRepository;
const tokenRepository = inMemoryAccessTokenRepository;
const scopeRepository = inMemoryScopeRepository;
const userRepository = inMemoryUserRepository;

const jwtService = new JwtService("secret secret secret");

const authorizationServer = new AuthorizationServer(
  authCodeRepository,
  clientRepository,
  tokenRepository,
  scopeRepository,
  userRepository,
  jwtService,
);

authorizationServer.enableGrantType("authorization_code", new DateInterval("15m"));
authorizationServer.enableGrantType("client_credentials", new DateInterval("15m"));
authorizationServer.enableGrantType("refresh_token", new DateInterval("15m"));

export { authorizationServer as inMemoryAuthorizationServer };

export enum SERVER_COOKIES {
  user = "authorization_server__user",
  authorized = "authorization_server__is_authorized",
}
